# S3 Bucket for static portfolio site
resource "aws_s3_bucket" "portfolio" {
  bucket = var.bucket_name
}

# Block public access at bucket level (CloudFront handles distribution)
resource "aws_s3_bucket_public_access_block" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable versioning for safety (easy rollback)
resource "aws_s3_bucket_versioning" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Server-side encryption by default
resource "aws_s3_bucket_server_side_encryption_configuration" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Block unencrypted uploads
resource "aws_s3_bucket_public_access_block" "deny_unencrypted" {
  bucket = aws_s3_bucket.portfolio.id

  depends_on = [aws_s3_bucket_server_side_encryption_configuration.portfolio]
}

# Bucket policy: Allow CloudFront to read objects
resource "aws_s3_bucket_policy" "portfolio_cloudfront" {
  bucket = aws_s3_bucket.portfolio.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontAccess"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.portfolio.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${aws_cloudfront_distribution.portfolio.id}"
          }
        }
      }
    ]
  })
}

# Enable request logging to CloudWatch
resource "aws_s3_bucket_logging" "portfolio" {
  count = var.enable_logging ? 1 : 0

  bucket = aws_s3_bucket.portfolio.id

  target_bucket = aws_s3_bucket.logs[0].id
  target_prefix = "s3-access-logs/"
}

# Lifecycle policy: delete old versions after 30 days (cost optimization)
resource "aws_s3_bucket_lifecycle_configuration" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  rule {
    id     = "delete-old-versions"
    status = "Enabled"

    noncurrent_version_expiration {
      noncurrent_days = 30
    }
  }
}

# Data source for current AWS account
data "aws_caller_identity" "current" {}
