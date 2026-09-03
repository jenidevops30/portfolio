# IAM Role for GitHub Actions deployment
resource "aws_iam_role" "github_actions" {
  name               = "github-actions-portfolio-deployer"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:jenidevops30/portfolio:ref:refs/heads/main"
          }
        }
      }
    ]
  })

  description = "Role for GitHub Actions to deploy portfolio to S3 and invalidate CloudFront"
}

# Policy: S3 access (upload + delete)
resource "aws_iam_role_policy" "s3_deploy" {
  name   = "github-actions-s3-deploy"
  role   = aws_iam_role.github_actions.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3DeployPermissions"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.portfolio.arn,
          "${aws_s3_bucket.portfolio.arn}/*"
        ]
      }
    ]
  })
}

# Policy: CloudFront cache invalidation
resource "aws_iam_role_policy" "cloudfront_invalidate" {
  name   = "github-actions-cloudfront-invalidate"
  role   = aws_iam_role.github_actions.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "CloudFrontInvalidationPermissions"
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation"
        ]
        Resource = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${aws_cloudfront_distribution.portfolio.id}"
      }
    ]
  })
}

# Output: Role ARN for GitHub Actions configuration
output "github_actions_role_arn" {
  description = "ARN of IAM role for GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}

# Legacy: Access keys for GitHub Actions (if using env-based auth instead of OIDC)
# Uncomment below if you prefer AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY approach
#
# resource "aws_iam_user" "github_actions" {
#   name = "github-actions-portfolio"
# }
#
# resource "aws_iam_access_key" "github_actions" {
#   user = aws_iam_user.github_actions.name
# }
#
# Output the credentials to GitHub Secrets
