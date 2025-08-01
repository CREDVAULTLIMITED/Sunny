terraform {
  required_version = ">= 1.0.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  
  backend "s3" {
    bucket         = "sunny-terraform-state"
    key            = "global/s3/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "sunny-terraform-locks"
  }
}

# Provider configuration
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "Sunny"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

provider "azurerm" {
  features {}
}

# Local variables
locals {
  common_tags = {
    Project     = "Sunny"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
  
  # Determine which cloud provider to use for each component
  use_aws   = contains(var.cloud_providers, "aws")
  use_gcp   = contains(var.cloud_providers, "gcp")
  use_azure = contains(var.cloud_providers, "azure")
  
  # Determine which regions to deploy to
  aws_regions   = var.multi_region ? var.aws_regions : [var.aws_region]
  gcp_regions   = var.multi_region ? var.gcp_regions : [var.gcp_region]
  azure_regions = var.multi_region ? var.azure_regions : [var.azure_region]
}

# Import modules
module "networking" {
  source = "./modules/networking"
  
  environment = var.environment
  
  # AWS networking
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  aws_vpc_cidr = var.aws_vpc_cidr
  
  # GCP networking
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  gcp_network_name = var.gcp_network_name
  
  # Azure networking
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  azure_vnet_cidr = var.azure_vnet_cidr
}

module "security" {
  source = "./modules/security"
  
  environment = var.environment
  
  # AWS security
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  aws_vpc_ids = module.networking.aws_vpc_ids
  
  # GCP security
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  gcp_network_name = module.networking.gcp_network_name
  
  # Azure security
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  azure_resource_group_names = module.networking.azure_resource_group_names
}

module "database" {
  source = "./modules/database"
  
  environment = var.environment
  
  # AWS database
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  aws_vpc_ids = module.networking.aws_vpc_ids
  aws_subnet_ids = module.networking.aws_private_subnet_ids
  aws_security_group_ids = module.security.aws_db_security_group_ids
  
  # GCP database
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  gcp_network_name = module.networking.gcp_network_name
  
  # Azure database
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  azure_resource_group_names = module.networking.azure_resource_group_names
  azure_subnet_ids = module.networking.azure_private_subnet_ids
  
  # Database configuration
  db_instance_class = var.db_instance_class
  db_engine = var.db_engine
  db_engine_version = var.db_engine_version
  db_name = var.db_name
  db_username = var.db_username
  db_password = var.db_password
  db_backup_retention_period = var.db_backup_retention_period
  db_multi_az = var.db_multi_az
  db_storage_encrypted = var.db_storage_encrypted
}

module "kubernetes" {
  source = "./modules/kubernetes"
  
  environment = var.environment
  
  # AWS EKS
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  aws_vpc_ids = module.networking.aws_vpc_ids
  aws_subnet_ids = module.networking.aws_private_subnet_ids
  aws_security_group_ids = module.security.aws_eks_security_group_ids
  
  # GCP GKE
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  gcp_network_name = module.networking.gcp_network_name
  gcp_subnetwork_names = module.networking.gcp_subnetwork_names
  
  # Azure AKS
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  azure_resource_group_names = module.networking.azure_resource_group_names
  azure_subnet_ids = module.networking.azure_private_subnet_ids
  
  # Kubernetes configuration
  k8s_version = var.k8s_version
  k8s_node_instance_type = var.k8s_node_instance_type
  k8s_node_count = var.k8s_node_count
  k8s_node_disk_size = var.k8s_node_disk_size
}

module "monitoring" {
  source = "./modules/monitoring"
  
  environment = var.environment
  
  # AWS monitoring
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  
  # GCP monitoring
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  
  # Azure monitoring
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  
  # Monitoring configuration
  enable_prometheus = var.enable_prometheus
  enable_grafana = var.enable_grafana
  enable_alertmanager = var.enable_alertmanager
  enable_jaeger = var.enable_jaeger
  
  # Kubernetes clusters
  k8s_cluster_ids = module.kubernetes.k8s_cluster_ids
}

module "hsm" {
  source = "./modules/hsm"
  
  environment = var.environment
  
  # AWS CloudHSM
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  aws_vpc_ids = module.networking.aws_vpc_ids
  aws_subnet_ids = module.networking.aws_private_subnet_ids
  aws_security_group_ids = module.security.aws_hsm_security_group_ids
  
  # GCP Cloud HSM
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  gcp_network_name = module.networking.gcp_network_name
  
  # Azure Key Vault HSM
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  azure_resource_group_names = module.networking.azure_resource_group_names
  
  # HSM configuration
  hsm_backup_retention_days = var.hsm_backup_retention_days
}

module "cdn" {
  source = "./modules/cdn"
  
  environment = var.environment
  
  # AWS CloudFront
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  
  # GCP Cloud CDN
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  
  # Azure CDN
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  
  # CDN configuration
  cdn_domain_name = var.cdn_domain_name
  cdn_ssl_certificate_arn = var.cdn_ssl_certificate_arn
}

module "waf" {
  source = "./modules/waf"
  
  environment = var.environment
  
  # AWS WAF
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  aws_cloudfront_distribution_ids = module.cdn.aws_cloudfront_distribution_ids
  
  # GCP Cloud Armor
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  
  # Azure Front Door WAF
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  
  # WAF configuration
  waf_rules = var.waf_rules
}

module "dns" {
  source = "./modules/dns"
  
  environment = var.environment
  
  # AWS Route53
  aws_enabled = local.use_aws
  aws_regions = local.aws_regions
  
  # GCP Cloud DNS
  gcp_enabled = local.use_gcp
  gcp_regions = local.gcp_regions
  
  # Azure DNS
  azure_enabled = local.use_azure
  azure_regions = local.azure_regions
  
  # DNS configuration
  domain_name = var.domain_name
  cdn_domain_names = module.cdn.cdn_domain_names
}

# Output important information
output "kubernetes_cluster_endpoints" {
  description = "Kubernetes cluster endpoints"
  value       = module.kubernetes.k8s_cluster_endpoints
}

output "database_endpoints" {
  description = "Database endpoints"
  value       = module.database.db_endpoints
  sensitive   = true
}

output "cdn_endpoints" {
  description = "CDN endpoints"
  value       = module.cdn.cdn_endpoints
}

output "hsm_endpoints" {
  description = "HSM endpoints"
  value       = module.hsm.hsm_endpoints
  sensitive   = true
}