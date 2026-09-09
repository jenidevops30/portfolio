variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "devops-portfolio"
}

variable "environment" {
  type    = string
  default = "lab"
}

variable "vpc_id" {
  type = string
}

variable "app_subnet_az1_id" {
  type = string
}

variable "app_subnet_az2_id" {
  type = string
}

variable "ec2_security_group_id" {
  type = string
}

variable "target_group_arn" {
  type = string
}

variable "key_name" {
  type = string
}