# AWS Cost Monitoring & FinOps Dashboard

Track infrastructure costs in real-time with CloudWatch dashboards and AWS Cost Explorer.

## 📊 Cost Overview

### Monthly Breakdown (Estimated)
| Component | Estimated Cost |
|-----------|-----------------|
| **S3 Storage** (10 GB) | $0.20 |
| **CloudFront** (1 TB/month) | $85.00 |
| **CloudFront Requests** (10M/month) | $0.65 |
| **Logs Storage** (optional) | $0.50 |
| **Total** | **~$86/month** |

*Note: Costs vary by region and actual usage. Check AWS Cost Explorer for accurate figures.*

---

## 💻 View Your Costs

### AWS Cost Explorer (Official)
1. Go to **AWS Console → Cost Explorer**
2. Select **Service** → Filter by:
   - S3
   - CloudFront
3. View trends over time
4. Set budget alerts

### CloudWatch Dashboard (Real-time Metrics)
```bash
# View via AWS Console
AWS Console → CloudWatch → Dashboards → jeni-portfolio
```

**Metrics tracked**:
- CloudFront requests per hour
- S3 PUT/GET operations
- Data transfer out (GB)
- Cache hit ratio
- Origin latency

### AWS Budgets (Cost Alerts)
1. Go to **AWS Console → Budgets**
2. Create budget: **$100/month**
3. Alert when usage exceeds 80%
4. Receive email notifications

---

## 🎯 Cost Optimization Strategies

### Current Optimizations ✅
- ✅ **S3 Versioning Lifecycle**: Auto-delete old versions after 30 days
- ✅ **CloudFront Caching**: Smart TTLs reduce origin requests
- ✅ **Gzip Compression**: Smaller downloads = less data transfer
- ✅ **HTTP/2**: Multiplexing reduces connection overhead
- ✅ **Log Retention**: Automatically delete logs after 90 days

### Further Optimization Ideas
- 🔍 **Reserved Capacity**: Pre-commit to CloudFront egress (discount ~10%)
- 🔍 **S3 Intelligent-Tiering**: Auto-move rarely accessed objects to cheaper storage
- 🔍 **CloudFront Price Class**: Switch from All → 100 (USA/EU only, ~33% savings)
- 🔍 **Request Batching**: Combine S3 operations where possible

---

## 🏗️ Infrastructure Costs vs. Savings

### FinOps Wins on This Portfolio
| Initiative | Monthly Savings |
|-----------|-----------------|
| S3 versioning lifecycle | $2-5 |
| CloudFront caching optimization | $15-20 |
| Log retention policies | $0.50-1.00 |
| Gzip compression | $5-10 |
| **Total monthly savings** | **$22-36** |

**Annual savings**: ~$264-432

---

## 📈 Build Your FinOps Culture

### Track These Metrics
1. **Cost per deployment** (how much does each release cost?)
2. **Cost per user** (CAC for marketing)
3. **Cost per TB served** (CDN efficiency)
4. **YoY cost change** (is it trending up or down?)

### Monthly Cost Review Checklist
- [ ] Check AWS Cost Explorer for anomalies
- [ ] Review CloudFront cache hit ratio (target: >80%)
- [ ] Verify S3 lifecycle policy deleted old versions
- [ ] Monitor budget alerts (any near-limits?)
- [ ] Document cost trends in project wiki

---

## 🔗 Links

- **AWS Cost Explorer**: https://console.aws.amazon.com/cost-management/
- **CloudWatch Dashboards**: https://console.aws.amazon.com/cloudwatch/
- **AWS Budgets**: https://console.aws.amazon.com/billing/home#/budgets
- **S3 Pricing**: https://aws.amazon.com/s3/pricing/
- **CloudFront Pricing**: https://aws.amazon.com/cloudfront/pricing/

---

## 💡 What This Demonstrates

| Practice | Evidence |
|----------|----------|
| **FinOps Mindset** | Tracking costs as first-class metric |
| **Cost Optimization** | Implemented lifecycle policies, caching strategy |
| **Infrastructure Knowledge** | Understanding CloudFront pricing tiers, S3 storage classes |
| **Operational Excellence** | Monthly cost reviews, trend analysis |
| **Business Acumen** | Cost per user, ROI on infrastructure |

---

**Maintained by**: Jeni Patel  
**Last updated**: September 2026  
**Status**: Production Ready ✅
