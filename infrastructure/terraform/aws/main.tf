# Sunny Payment Gateway - AWS Infrastructure
# Terraform configuration for production deployment

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }

  backend "s3" {
    bucket         = "sunny-payments-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "sunny-payments-terraform-locks"
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "sunny-payments"
      Environment = var.environment
      ManagedBy   = "terraform"
      Owner       = "sunny-platform-team"
    }
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

# Local values
locals {
  cluster_name = "sunny-payments-${var.environment}"
  common_tags = {
    Project     = "sunny-payments"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# ======================
# VPC AND NETWORKING
# ======================

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${local.cluster_name}-vpc"
  cidr = var.vpc_cidr

  azs             = slice(data.aws_availability_zones.available.names, 0, 3)
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets
  database_subnets = var.database_subnets

  enable_nat_gateway = true
  enable_vpn_gateway = false
  enable_dns_hostnames = true
  enable_dns_support = true

  # Enable flow logs
  enable_flow_log                      = true
  create_flow_log_cloudwatch_iam_role  = true
  create_flow_log_cloudwatch_log_group = true

  # Database subnet group
  create_database_subnet_group = true
  create_database_subnet_route_table = true

  # Tags
  tags = local.common_tags

  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/${local.cluster_name}" = "owned"
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/${local.cluster_name}" = "owned"
  }
}

# ======================
# EKS CLUSTER
# ======================

module "eks" {
  source = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = local.cluster_name
  cluster_version = var.kubernetes_version

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true
  cluster_endpoint_private_access = true

  # Cluster access entry
  enable_cluster_creator_admin_permissions = true

  # EKS Managed Node Groups
  eks_managed_node_groups = {
    # General compute nodes
    general = {
      name = "general"
      
      instance_types = ["t3.large"]
      capacity_type  = "ON_DEMAND"
      
      min_size     = 2
      max_size     = 10
      desired_size = 3

      disk_size = 50
      disk_type = "gp3"

      labels = {
        node-type = "compute"
      }

      taints = []

      update_config = {
        max_unavailable_percentage = 25
      }
    }

    # High-memory nodes for AI/ML workloads
    ai_workloads = {
      name = "ai-workloads"
      
      instance_types = ["r5.xlarge"]
      capacity_type  = "ON_DEMAND"
      
      min_size     = 1
      max_size     = 5
      desired_size = 2

      disk_size = 100
      disk_type = "gp3"

      labels = {
        node-type = "ai-compute"
        workload = "ai-ml"
      }

      taints = [
        {
          key    = "ai-workload"
          value  = "true"
          effect = "NO_SCHEDULE"
        }
      ]
    }

    # Database nodes
    database = {
      name = "database"
      
      instance_types = ["r5.large"]
      capacity_type  = "ON_DEMAND"
      
      min_size     = 2
      max_size     = 6
      desired_size = 3

      disk_size = 100
      disk_type = "gp3"

      labels = {
        node-type = "database"
      }

      taints = [
        {
          key    = "database-workload"
          value  = "true"
          effect = "NO_SCHEDULE"
        }
      ]
    }
  }

  # Cluster add-ons
  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
    aws-ebs-csi-driver = {
      most_recent = true
    }
  }

  tags = local.common_tags
}

# ======================
# RDS DATABASE
# ======================

module "rds" {
  source = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  identifier = "${local.cluster_name}-postgres"

  engine            = "postgres"
  engine_version    = "15.4"
  instance_class    = var.db_instance_class
  allocated_storage = var.db_allocated_storage
  storage_encrypted = true

  # Database configuration
  db_name  = "sunny_payments"
  username = "sunny"
  password = var.db_password

  # Network configuration
  db_subnet_group_name   = module.vpc.database_subnet_group
  vpc_security_group_ids = [aws_security_group.rds.id]

  # Backup configuration
  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "Sun:04:00-Sun:05:00"

  # Monitoring
  monitoring_interval = 60
  monitoring_role_name = "${local.cluster_name}-rds-monitoring-role"
  create_monitoring_role = true

  # Performance Insights
  performance_insights_enabled = true
  performance_insights_retention_period = 7

  # Multi-AZ for high availability
  multi_az = var.environment == "production"

  # Deletion protection
  deletion_protection = var.environment == "production"

  tags = local.common_tags
}

# ======================
# ELASTICACHE REDIS
# ======================

module "redis" {
  source = "terraform-aws-modules/elasticache/aws"
  version = "~> 1.0"

  cluster_id           = "${local.cluster_name}-redis"
  description          = "Redis cluster for Sunny Payments"

  node_type            = var.redis_node_type
  num_cache_nodes      = var.redis_num_nodes
  parameter_group_name = "default.redis7"
  port                 = 6379
  engine_version       = "7.0"

  subnet_group_name = aws_elasticache_subnet_group.redis.name
  security_group_ids = [aws_security_group.redis.id]

  # Auth token for security
  auth_token = var.redis_auth_token
  transit_encryption_enabled = true
  at_rest_encryption_enabled = true

  # Backup configuration
  snapshot_retention_limit = 7
  snapshot_window         = "03:00-05:00"

  tags = local.common_tags
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "${local.cluster_name}-redis-subnet-group"
  subnet_ids = module.vpc.private_subnets

  tags = local.common_tags
}

# ======================
# SECURITY GROUPS
# ======================

resource "aws_security_group" "rds" {
  name_prefix = "${local.cluster_name}-rds-"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-rds-sg"
  })
}

resource "aws_security_group" "redis" {
  name_prefix = "${local.cluster_name}-redis-"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-redis-sg"
  })
}

# ======================
# S3 BUCKETS
# ======================

# Application data bucket
resource "aws_s3_bucket" "app_data" {
  bucket = "${local.cluster_name}-app-data"

  tags = local.common_tags
}

resource "aws_s3_bucket_versioning" "app_data" {
  bucket = aws_s3_bucket.app_data.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_encryption" "app_data" {
  bucket = aws_s3_bucket.app_data.id

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource "aws_s3_bucket_public_access_block" "app_data" {
  bucket = aws_s3_bucket.app_data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Backup bucket
resource "aws_s3_bucket" "backups" {
  bucket = "${local.cluster_name}-backups"

  tags = local.common_tags
}

resource "aws_s3_bucket_versioning" "backups" {
  bucket = aws_s3_bucket.backups.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_encryption" "backups" {
  bucket = aws_s3_bucket.backups.id

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  rule {
    id     = "backup_lifecycle"
    status = "Enabled"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 90
      storage_class = "GLACIER"
    }

    transition {
      days          = 365
      storage_class = "DEEP_ARCHIVE"
    }

    expiration {
      days = 2555  # 7 years for compliance
    }
  }
}

# ======================
# IAM ROLES AND POLICIES
# ======================

# EKS cluster service role
data "aws_iam_policy_document" "cluster_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }
  }
}

# Application-specific IAM roles
resource "aws_iam_role" "sunny_app_role" {
  name = "${local.cluster_name}-app-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = module.eks.oidc_provider_arn
        }
        Condition = {
          StringEquals = {
            "${replace(module.eks.cluster_oidc_issuer_url, "https://", "")}:sub": "system:serviceaccount:sunny-payments:sunny-app"
            "${replace(module.eks.cluster_oidc_issuer_url, "https://", "")}:aud": "sts.amazonaws.com"
          }
        }
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy" "sunny_app_policy" {
  name = "${local.cluster_name}-app-policy"
  role = aws_iam_role.sunny_app_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = [
          "${aws_s3_bucket.app_data.arn}/*",
          "${aws_s3_bucket.backups.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.app_data.arn,
          aws_s3_bucket.backups.arn
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = "arn:aws:secretsmanager:${var.aws_region}:${data.aws_caller_identity.current.account_id}:secret:sunny-payments/*"
      }
    ]
  })
}

# ======================
# SECRETS MANAGER
# ======================

resource "aws_secretsmanager_secret" "app_secrets" {
  name = "sunny-payments/${var.environment}/app-secrets"
  description = "Application secrets for Sunny Payments"

  tags = local.common_tags
}

resource "aws_secretsmanager_secret_version" "app_secrets" {
  secret_id = aws_secretsmanager_secret.app_secrets.id
  secret_string = jsonencode({
    jwt_secret = var.jwt_secret
    encryption_key = var.encryption_key
    redis_auth_token = var.redis_auth_token
    db_password = var.db_password
  })
}

# ======================
# CLOUDWATCH
# ======================

resource "aws_cloudwatch_log_group" "eks_cluster" {
  name              = "/aws/eks/${local.cluster_name}/cluster"
  retention_in_days = 30

  tags = local.common_tags
}

# ======================
# APPLICATION LOAD BALANCER
# ======================

resource "aws_lb" "main" {
  name               = "${local.cluster_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = module.vpc.public_subnets

  enable_deletion_protection = var.environment == "production"

  tags = local.common_tags
}

resource "aws_security_group" "alb" {
  name_prefix = "${local.cluster_name}-alb-"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${local.cluster_name}-alb-sg"
  })
}
