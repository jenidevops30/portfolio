<div align="center">

# 🚀 jenidevops.in — DevOps Portfolio

**Cloud & DevOps Architect · AWS · Kubernetes · CI/CD Automation**

[![Build Status](https://github.com/jenidevops30/portfolio/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/jenidevops30/portfolio/actions/workflows/deploy.yml)
[![Security](https://img.shields.io/badge/security-scanning-blue)](https://github.com/jenidevops30/portfolio/security/dependabot)
[![Performance](https://img.shields.io/badge/lighthouse-monitored-brightgreen)](https://github.com/jenidevops30/portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[**🌐 View Live Portfolio**](https://jenidevops.in) · [📖 CI/CD Documentation](./CICD.md) · [📝 GitHub Actions](https://github.com/jenidevops30/portfolio/actions)

</div>

---

## 📌 About This Project

This is **jenidevops.in** — my production portfolio site showcasing:
- **Cloud Infrastructure**: AWS (EC2, RDS, ALB, CloudFront, S3)
- **DevOps Automation**: GitHub Actions CI/CD, Infrastructure as Code
- **Web Development**: React 19, Vite, modern design system
- **Security & Quality**: Automated dependency scanning, performance monitoring

The site itself is a **meta-project demonstrating DevOps in action**:
- ✅ **Zero-touch deployment** (push → GitHub Actions → S3 → live)
- ✅ **Security scanning** (Snyk dependency check)
- ✅ **Performance monitoring** (Lighthouse CI on every build)
- ✅ **Fully automated** (~60 seconds from commit to production)

---

## 🏗️ Architecture

### Frontend (React/Vite)
```
src/
├── App.jsx                    # Main app component
├── App.css                    # Design system (enterprise cloud console theme)
├── data/portfolioData.js      # Centralized portfolio content
└── components/
    ├── Navbar.jsx             # Mobile-responsive navigation
    ├── Hero.jsx               # Hero section + production status panel
    ├── About.jsx              # About me section
    ├── Architecture.jsx       # CI/CD pipeline + infrastructure diagram
    ├── SkillCard.jsx          # Skill cards grid
    ├── ProjectCard.jsx        # Project showcase cards (with CI/CD badge)
    ├── TimelineItem.jsx       # Experience timeline with company logos
    ├── Contact.jsx            # Contact methods
    └── Footer.jsx             # Social links
```

### Deployment Pipeline
```
GitHub Push (main)
    ↓
GitHub Actions Workflow
    ├─ Checkout code
    ├─ Node.js 20 setup
    ├─ npm install & lint
    ├─ npm run build (Vite)
    ├─ Security scan (Snyk)
    ├─ Performance audit (Lighthouse)
    ├─ Deploy to S3
    └─ Invalidate CloudFront
    ↓
🚀 Live at jenidevops.in (CDN cached, ~50-60 sec)
```

---

## 🎨 Design System

**Enterprise Cloud Console Aesthetic** (inspired by Datadog/Vercel/AWS Console)

- **Color Palette**: Dark mode with teal accent (`#3ec9a8`)
- **Typography**: Inter font family (web-optimized)
- **Spacing**: 4-point scale for consistency
- **Responsive**: Mobile-first, works on all devices
- **Accessibility**: WCAG 2.1 AA compliant

---

## ⚡ Features

### Core
- ✅ **5+ years experience** displayed with real projects and outcomes
- ✅ **10 featured projects** with tech stacks and results
- ✅ **6 professional experiences** with company logos
- ✅ **16 core skills** (AWS, Kubernetes, Terraform, etc.)
- ✅ **Live downloadable resume**

### DevOps Showcase
- ✅ **CI/CD pipeline diagram** showing automation flow
- ✅ **Infrastructure architecture** (Route 53 → ALB → EC2 → RDS)
- ✅ **Production status panel** (mock infrastructure monitoring)
- ✅ **GitHub Actions badge** showing live build status
- ✅ **Security scanning** integration (Snyk)
- ✅ **Performance monitoring** (Lighthouse CI)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm
- AWS account (for deployment)
- GitHub account

### Local Development

```bash
# Clone repository
git clone https://github.com/jenidevops30/portfolio.git
cd portfolio/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
# Open http://localhost:5173

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment (Automatic)

```bash
# Push to main branch
git push origin main

# GitHub Actions runs automatically:
# 1. Builds React app (Vite)
# 2. Scans security (Snyk)
# 3. Tests performance (Lighthouse)
# 4. Deploys to S3
# 5. Invalidates CloudFront cache

# Monitor: https://github.com/jenidevops30/portfolio/actions
```

---

## 🔐 Security

This project demonstrates security-first DevOps practices:

- ✅ **Dependency scanning** (Snyk on every build)
- ✅ **No hardcoded secrets** (GitHub Secrets for AWS credentials)
- ✅ **HTTPS/TLS** (CloudFront enforced)
- ✅ **IAM least privilege** (S3-only access key, no root)
- ✅ **Automated updates** (Dependabot for dependencies)

---

## 📊 Performance

Built for speed and efficiency:

| Metric | Value |
|--------|-------|
| **Build Time** | ~30 sec |
| **Deploy Time** | ~20 sec |
| **Total Pipeline** | ~60 sec |
| **JS Bundle** | 70 KB (gzipped) |
| **CSS Bundle** | 3.4 KB (gzipped) |
| **Lighthouse Score** | 95+ |
| **Core Web Vitals** | Passing |

---

## 📚 Documentation

- **[CICD.md](./CICD.md)** — Complete CI/CD pipeline guide
  - Workflow breakdown (8 steps)
  - GitHub Secrets setup
  - Troubleshooting guide
  - Performance metrics

- **[PROJECT.md](./PROJECT.md)** — Production infrastructure case study (original)
  - Real-world AWS architecture
  - Cost optimization outcomes
  - Incident responses

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: CSS3 (no dependencies)
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

### DevOps/Infrastructure
- **CI/CD**: GitHub Actions
- **Cloud**: AWS (S3, CloudFront, Route 53)
- **CDN**: CloudFront (global edge caching)
- **Monitoring**: GitHub Actions badges, Lighthouse CI
- **Security**: Snyk dependency scanning

### Development
- **Node.js**: 20 LTS
- **Package Manager**: npm
- **Linting**: ESLint
- **Version Control**: Git

---

## 📈 What You Can Learn

This repo is a **learning resource** for DevOps practices:

1. **Automated CI/CD**: Zero-touch deployment from commit to production
2. **Security as Code**: Dependency scanning, IAM practices
3. **Performance Monitoring**: Lighthouse integration, metrics tracking
4. **Infrastructure Automation**: GitHub Actions orchestration
5. **React Best Practices**: Component architecture, data centralization
6. **Design Systems**: Professional CSS without frameworks

---

## 🤝 Contributing

This is a personal portfolio, but I welcome:
- 🐛 **Bug reports**: [GitHub Issues](https://github.com/jenidevops30/portfolio/issues)
- 💡 **Suggestions**: Open an issue with ideas
- ⭐ **Stars**: Appreciated!

---

## 📞 Contact

- **Portfolio**: [jenidevops.in](https://jenidevops.in)
- **Email**: [pateljeni007.jp@gmail.com](mailto:pateljeni007.jp@gmail.com)
- **LinkedIn**: [Jeni Patel](https://www.linkedin.com/in/jeni-patel-devops-engg)
- **GitHub**: [@jenidevops30](https://github.com/jenidevops30)
- **WhatsApp**: [+91 8849742011](https://wa.me/918849742011)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

**Built with ☁️ & ⚙️ by Jeni Patel**

[View Portfolio](https://jenidevops.in) · [Read CI/CD Docs](./CICD.md) · [GitHub Actions](https://github.com/jenidevops30/portfolio/actions)

</div>
