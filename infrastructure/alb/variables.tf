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
  description = "VPC ID"
  type        = string
}

variable "public_subnet_ids" {
  description = "Public subnet IDs across multiple Availability Zones"
  type        = list(string)
}

variable "target_instance_id" {
  description = "EC2 instance ID for target group registration"
  type        = string
}

variable "ec2_security_group_id" {
  description = "EC2 security group ID to attach ingress from ALB"
  type        = string
}
