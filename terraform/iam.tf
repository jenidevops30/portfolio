# GitHub Actions assumes this role through GitHub's OIDC provider.
resource "aws_iam_role" "github_actions" {
  name = "github-actions-portfolio-deployer"

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
            "token.actions.githubusercontent.com:sub" = "repo:jenidevops30/portfolio:ref:refs/heads/main"
          }
        }
      }
    ]
  })

  description = "OIDC role for GitHub Actions to deploy the portfolio to S3 and invalidate CloudFront"
}

# Separate read-only role for Terraform plans. Trust is limited to same-repository
# pull requests and the two explicitly permitted branch refs for push/dispatch runs.
# It cannot modify AWS resources and does not weaken the deployer's main-branch trust.
resource "aws_iam_role" "github_actions_terraform_plan" {
  name = "github-actions-portfolio-terraform-plan"

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
            "token.actions.githubusercontent.com:sub" = [
              "repo:jenidevops30/portfolio:pull_request",
              "repo:jenidevops30/portfolio:ref:refs/heads/main",
              "repo:jenidevops30/portfolio:ref:refs/heads/feature/phase-1-portfolio-foundation"
            ]
          }
        }
      }
    ]
  })

  description = "Read-only OIDC role for Terraform plans on approved repository events"
}

resource "aws_iam_role_policy_attachment" "terraform_plan_read_only" {
  role       = aws_iam_role.github_actions_terraform_plan.name
  policy_arn = "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

# Bucket-level permissions are scoped to the portfolio bucket.
resource "aws_iam_role_policy" "s3_deploy" {
  name = "github-actions-s3-deploy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "ListPortfolioBucket"
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = aws_s3_bucket.portfolio.arn
      },
      {
        Sid    = "ManagePortfolioObjects"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.portfolio.arn}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy" "cloudfront_invalidate" {
  name = "github-actions-cloudfront-invalidate"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "InvalidatePortfolioDistribution"
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation"
        ]
        Resource = aws_cloudfront_distribution.portfolio.arn
      }
    ]
  })
}
