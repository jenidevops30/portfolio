variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "domain_name" {
  description = "Domain name for the portfolio"
  type        = string
  default     = "jenidevops.in"
}

variable "site_name" {
  description = "Name of the portfolio site"
  type        = string
  default     = "jeni-portfolio"
}

variable "bucket_name" {
  description = "S3 bucket name for static site"
  type        = string
  default     = "jeni-portfolio"
}

variable "cloudfront_price_class" {
  description = "CloudFront price class (100 = USA/EU, 200 = includes Asia, All = worldwide)"
  type        = string
  default     = "PriceClass_100"
}

variable "enable_logging" {
  description = "Enable CloudFront and S3 access logging"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Additional tags for all resources"
  type        = map(string)
  default = {
    Owner       = "Jeni Patel"
    Description = "DevOps Portfolio Site - Infrastructure as Code"
  }
}
