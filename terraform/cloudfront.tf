# CloudFront Origin Access Identity (OAI) for secure S3 access
resource "aws_cloudfront_origin_access_identity" "portfolio" {
  comment = "OAI for jeni-portfolio S3 bucket"
}

# CloudFront Distribution for global CDN
resource "aws_cloudfront_distribution" "portfolio" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "jenidevops.in portfolio CDN"
  default_root_object = "index.html"
  price_class         = var.cloudfront_price_class

  # Origin: S3 bucket
  origin {
    domain_name = aws_s3_bucket.portfolio.bucket_regional_domain_name
    origin_id   = "S3-${var.bucket_name}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.portfolio.cloudfront_access_identity_path
    }
  }

  # Default cache behavior
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.bucket_name}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600      # 1 hour
    max_ttl                = 86400     # 1 day
    compress               = true
  }

  # Cache behavior for index.html (never cache - always fresh)
  ordered_cache_behavior {
    path_pattern     = "index.html"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.bucket_name}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0         # No cache for index.html
    max_ttl                = 0
    compress               = true
  }

  # Cache behavior for static assets (cache aggressively)
  ordered_cache_behavior {
    path_pattern     = "/assets/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.bucket_name}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 31536000  # 1 year (assets are versioned by Vite)
    max_ttl                = 31536000
    compress               = true
  }

  # Restrictions
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # HTTPS/TLS
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  # Logging (optional)
  dynamic "logging_config" {
    for_each = var.enable_logging ? [1] : []
    content {
      include_cookies = false
      bucket          = aws_s3_bucket.logs[0].bucket_regional_domain_name
      prefix          = "cloudfront-logs/"
    }
  }

  depends_on = [
    aws_s3_bucket_public_access_block.portfolio,
    aws_s3_bucket_policy.portfolio_cloudfront
  ]
}

# Output CloudFront domain for verification
output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.portfolio.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation)"
  value       = aws_cloudfront_distribution.portfolio.id
}
