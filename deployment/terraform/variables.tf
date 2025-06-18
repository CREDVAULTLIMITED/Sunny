# General variables
variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "cloud_providers" {
  description = "List of cloud providers to use (aws, gcp, azure)"
  type        = list(string)
  default     = ["aws", "gcp", "azure"]
}

variable "multi_region" {
  description = "Whether to deploy to multiple regions"
  type        = bool
  default     = false
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "sunnypayments.com"
}

# AWS variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "aws_regions" {
  description = "List of AWS regions to deploy to"
  type        = list(string)
  default     = ["us-west-2", "us-east-1", "eu-west-1", "ap-southeast-1"]
}

variable "aws_vpc_cidr" {
  description = "CIDR block for AWS VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# GCP variables
variable "gcp_project" {
  description = "GCP project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "gcp_regions" {
  description = "List of GCP regions to deploy to"
  type        = list(string)
  default     = ["us-central1", "us-east1", "europe-west1", "asia-southeast1"]
}

variable "gcp_network_name" {
  description = "Name of the GCP VPC network"
  type        = string
  default     = "sunny-network"
}

# Azure variables
variable "azure_region" {
  description = "Azure region"
  type        = string
  default     = "eastus"
}

variable "azure_regions" {
  description = "List of Azure regions to deploy to"
  type        = list(string)
  default     = ["eastus", "westus2", "westeurope", "southeastasia"]
}

variable "azure_vnet_cidr" {
  description = "CIDR block for Azure VNet"
  type        = string
  default     = "10.1.0.0/16"
}

# Database variables
variable "db_instance_class" {
  description = "Database instance class"
  type        = string
  default     = "db.r5.large"
}

variable "db_engine" {
  description = "Database engine"
  type        = string
  default     = "postgres"
}

variable "db_engine_version" {
  description = "Database engine version"
  type        = string
  default     = "13.7"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "sunny"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "sunny_admin"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "db_backup_retention_period" {
  description = "Database backup retention period in days"
  type        = number
  default     = 7
}

variable "db_multi_az" {
  description = "Whether to enable multi-AZ for the database"
  type        = bool
  default     = true
}

variable "db_storage_encrypted" {
  description = "Whether to encrypt database storage"
  type        = bool
  default     = true
}

# Kubernetes variables
variable "k8s_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.24"
}

variable "k8s_node_instance_type" {
  description = "Kubernetes node instance type"
  type        = string
  default     = "m5.large"
}

variable "k8s_node_count" {
  description = "Number of Kubernetes nodes per region"
  type        = number
  default     = 3
}

variable "k8s_node_disk_size" {
  description = "Disk size for Kubernetes nodes in GB"
  type        = number
  default     = 100
}

# Monitoring variables
variable "enable_prometheus" {
  description = "Whether to enable Prometheus"
  type        = bool
  default     = true
}

variable "enable_grafana" {
  description = "Whether to enable Grafana"
  type        = bool
  default     = true
}

variable "enable_alertmanager" {
  description = "Whether to enable Alertmanager"
  type        = bool
  default     = true
}

variable "enable_jaeger" {
  description = "Whether to enable Jaeger"
  type        = bool
  default     = true
}

# HSM variables
variable "hsm_backup_retention_days" {
  description = "HSM backup retention period in days"
  type        = number
  default     = 90
}

# CDN variables
variable "cdn_domain_name" {
  description = "Domain name for the CDN"
  type        = string
  default     = "cdn.sunnypayments.com"
}

variable "cdn_ssl_certificate_arn" {
  description = "ARN of the SSL certificate for the CDN"
  type        = string
  default     = ""
}

# WAF variables
variable "waf_rules" {
  description = "WAF rules to apply"
  type        = list(object({
    name        = string
    priority    = number
    action      = string
    statement   = any
    visibility_config = object({
      cloudwatch_metrics_enabled = bool
      metric_name                = string
      sampled_requests_enabled   = bool
    })
  }))
  default     = []
}