output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.portfolio.id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.portfolio.arn
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.portfolio.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation in CI/CD)"
  value       = aws_cloudfront_distribution.portfolio.id
}

output "github_actions_role_arn" {
  description = "ARN of IAM role for GitHub Actions (for OIDC authentication)"
  value       = aws_iam_role.github_actions.arn
}

output "infrastructure_summary" {
  description = "Summary of infrastructure"
  value = {
    s3_bucket           = aws_s3_bucket.portfolio.id
    cloudfront_domain   = aws_cloudfront_distribution.portfolio.domain_name
    cloudfront_dist_id  = aws_cloudfront_distribution.portfolio.id
    github_actions_role = aws_iam_role.github_actions.arn
  }
}
