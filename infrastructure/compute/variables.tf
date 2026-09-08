variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "devops-portfolio"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "lab"
}

variable "vpc_id" {
  description = "Existing VPC ID"
  type        = string
}

variable "app_subnet_id" {
  description = "Application subnet ID"
  type        = string
}

variable "admin_cidr" {
  description = "Administrator public IP in CIDR notation"
  type        = string
}

variable "key_name" {
  description = "EC2 SSH key pair"
  type        = string
}