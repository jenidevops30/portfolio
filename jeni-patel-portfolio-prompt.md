# SYSTEM INSTRUCTIONS FOR PORTFOLIO GENERATION
You are an expert front-end developer and UI/UX engineer [378, 407]. Your task is to generate a fully responsive, pixel-perfect, accessible, and high-performance single-page portfolio website for **Jeni Patel**, an AWS Cloud & DevOps Engineer with 6+ years of experience.

The entire layout, component hierarchy, typographic scale, color system, and code architecture must be strictly grounded in professional design manuals, atomic design principles, and modern web development best practices [27, 31, 32, 287].

---

## SECTION 1: ARCHITECTURAL & SYSTEM SPECIFICATIONS

### 1.1 Atomic Component Architecture
Organize the entire front-end codebase using the **Atomic Design methodology** [3, 287]:
- **Atoms (Base Styles)**: Native elements like buttons, inputs, icons, labels, and text links with specific border-radius, font-weights, and transition states [29, 95].
- **Molecules (Simple Groups)**: Form fields (inputs + labels + error text), skill tags, and horizontal category pills [30, 95, 111].
- **Organisms (Complex Components)**: Navigation Header, bento metrics grid, experience timeline, and project card grids [30, 31].
- **Templates (Structural Grid)**: A 12-column grid layout with fixed max-width container (1200px to 1920px) and consistent spacing margins [108, 120, 301, 333].
- **Pages**: The consolidated, fully functional, responsive single-page portfolio application [31, 262].

### 1.2 Spacing, Margins, & Alignment (The 8-Pt Spacing Scale)
- **Base Grid**: Align all layouts and dimensions to a strict **8-point grid system** (multiples of 8px: 8px, 16px, 24px, 32px, 48px, 64px, 80px) [119, 161, 165].
- **Margins & Gutters**: Minimum side margin of 20px (mobile) and 64px (desktop) [118, 126, 451]. Use 16px horizontal and 24px vertical gaps between elements in grids [239, 248].
- **Touch Targets**: All interactive elements (buttons, links, form inputs) must have a minimum clickable area of **48x48px on mobile** (desktop height 48px, width 164px+) [96, 143, 244].
- **Container Paddings**: Add 12-20px+ padding around cards and boxes to ensure ultimate legibility [124].

### 1.3 Color System & Visual Style (Dark Mode / Futuristic / Glassmorphism)
Follow a structured **60-30-10 color distribution** to ensure harmony and contrast [131, 228, 460]:
- **60% Dominant Background (Dark Gray/Zinc)**: Ditch true black for natural dark tones. Use deep zinc backgrounds: `#09090b` (`bg-zinc-950`) or `#111827` (`bg-gray-900`) [107, 230, 267].
- **30% Secondary Card Containers**: Neutral dark containers with subtle border separation to create a structured look. Card backgrounds: `#1f2937` (`bg-gray-800`). Card borders: `1px solid #374151` [230, 235, 236].
- **10% Accent Colors & Highlights**: Use a vibrant, high-contrast palette to communicate creativity and technology [79]:
  - **Primary Accent**: Neon Purple `#8B5CF6` (`text-violet-500`) to highlight primary CTAs and focused states [227, 236].
  - **Secondary Accent**: Electric Teal `#14B8A6` (`text-teal-500`) for secondary highlights, positive statuses, and hover interactions [81, 228].
- **Status & Semantic Colors**:
  - **Success State**: Emerald Green `#10B981` / `hsl(142, 70%, 45%)` [227, 228].
  - **Warning State**: Amber Yellow `#F59E0B` / `hsl(38, 92%, 50%)` [227, 228].
  - **Error/Destructive State**: Bright Red `#EF4444` / `hsl(0, 84%, 60%)` [227, 228].
- **Glassmorphism Effects**: Apply CSS backdrop blur (`backdrop-blur-md`), dark border lines with 10% opacity, and subtle drop shadows (`shadow-sm` and `shadow-md`) to elevate aesthetic depth [97, 223].
- **Accent Borders**: Add thin, colorful top/side borders to standout bento cells or active states to drive polish [270].

### 1.4 Typographic System
Ensure consistent scale and perfect contrast ratios exceeding **WCAG AA standard (4.5:1 for body, 3:1 for large display text)** [71, 85, 316]:
- **Primary Typeface**: **Inter** (sans-serif) for callouts, tables, metrics, and body text due to high screen readability [160, 257, 261].
- **Display Typeface**: **Geist Sans** or **Satoshi** (sans-serif) for headings and titles to represent cutting-edge technical expertise [160, 257].
- **Type Scale**:
  - **Page Main Headings (H1)**: 60px to 80px (font-weight: 700 / Bold, letter-spacing: `-0.02em`, line-height: 1.1) [261].
  - **Section Headings (H2)**: 28px to 36px (font-weight: 600, letter-spacing: `-0.01em`, line-height: 1.25) [261].
  - **Card/Widget Titles (H3)**: 18px to 22px (font-weight: 600, line-height: 1.3) [261].
  - **Body Text**: 16px (font-weight: 400 / Regular, letter-spacing: `0.00em`, line-height: 1.5) [72, 261].
  - **Subtext/Metadata**: 13px to 14px (font-weight: 400, line-height: 1.4, colored in dark gray `#9ca3af`) [230, 261].

---

## SECTION 2: PAGE STRUCTURE & USER FLOWS

The portfolio must be built as an **efficient, single-page, conversion-focused layout** [106, 464]. Apply the **F and Z scanning patterns** to arrange elements in order of cognitive hierarchy [150, 154].

### 2.1 Sticky Top Navigation Bar (Header)
- **Layout**: Left-aligned bold display logo ("Jeni Patel | Cloud & DevOps") [242, 252]. Centered links (Expertise | Projects | Experience | Articles | Contact) [10, 15]. Right-aligned prominent filled button "Hire Jeni" utilizing the high-contrast purple `#8B5CF6` [10, 109, 252].
- **Responsiveness**: Stays fixed at the top of the viewport on scroll with a glass background blur [242, 252]. Collapses cleanly to a standard mobile hamburger menu on devices below 768px [242, 252].

### 2.2 Hero Section (Above the Fold)
- **Visual Grid**: A modern 2-column split-screen layout on desktop, collapsing to a vertically stacked 1-column layout on mobile [109, 246].
- **Left Column**:
  - Centered value proposition: "AWS Cloud & DevOps Engineer specializing in designing scalable, secure, highly available, and cost-efficient cloud infrastructures" [109].
  - Secondary headline highlighting Jeni's massive proof metrics: **"100+ deployments | up to 99.95% uptime | up to 59% infrastructure cost optimization achieved"** [105, 153].
  - Centered Action Group: Primary CTA filled button "View Projects" (Purple `#8B5CF6`) positioned next to a secondary outlined button "Read Articles" (Teal `#14B8A6`) [153, 154, 424].
- **Right Column**:
  - A responsive 3D-styled, glowing vector cloud architecture visualization or an interactive high-fidelity floating mockup indicating AWS/IaC workflows [151, 246, 252].
- **Lower Strip (Social Proof & Scrolling Marquee)**:
  - Add a **scrolling marquee of tools/skills** moving horizontally: `AWS | GCP | Azure | Terraform | Kubernetes | Docker | Jenkins | GitHub Actions | ArgoCD | Prometheus | Grafana` [107].
  - Include an interactive metrics block: "6+ Years Experience" | "100+ Deployments" | "59% Max Cost Savings" | "99.95% Availability" [92, 153].

### 2.3 Interactive Bento Grid (Expertise & Tech Stack)
Design a **Bento Box Grid layout** with uneven cell sizes, comfortable spacing (16px gap), rounded corners (12px), and a subtle glowing hover outline [108, 240, 248]. Use **clarifying SVG icons** placed inside equal-size bounding boxes preceding the text [144, 427, 439].
- **Cell 1 (2x2 Featured)**: **AWS Cloud Ecosystem**
  - Highlight: AWS Solutions Architect – Associate (SAA-C03) Candidate [104].
  - Services: ALB, ASG, Launch Templates, Multi-AZ RDS, Graviton/ARM64 migration, AWS DMS, CloudFront, CloudWatch [105, 287].
- **Cell 2 (1x1)**: **Multi-Cloud Platforms**
  - Providers: Google Cloud Platform (GCP), Microsoft Azure [288].
- **Cell 3 (1x2 Vertical)**: **Infrastructure as Code & Containers**
  - Core: Terraform IaC, Docker standardization, Kubernetes cluster management, Amazon ECS, VMware [287].
- **Cell 4 (1x1)**: **Continuous Integration & Delivery (CI/CD)**
  - Engines: Jenkins, GitHub Actions, GitLab CI, ArgoCD, Ansible, SonarQube quality gates [287].
- **Cell 5 (1x1)**: **Monitoring & Observability**
  - Tools: Prometheus, Grafana, AWS CloudWatch [287].
- **Cell 6 (1x1)**: **Operating Systems & Scripting**
  - Core: Advanced Linux administration, Python scripting, Network engineering, Firewall administration [287].

### 2.4 Featured Projects Grid
A highly structured 3-column responsive project grid (collapsing to 1 column on mobile) showing real production work [108, 111]. Every project card must scale by **1.05x on hover** and feature a subtle drop shadow [97, 251].
- **Project 1 Card**: "Quickhunt Migration"
  - Description: Migrated Quickhunt workload from DigitalOcean to AWS, achieving 99.95% high availability.
  - Tech tags: `AWS`, `Migration`, `High Availability`.
- **Project 2 Card**: "GPU Infrastructure - Face Swap Pro"
  - Description: Architected scalable, highly available GPU server infrastructure for Face Swap Pro.
  - Tech tags: `GPU Compute`, `Infrastructure Design`, `Scalability`.
- **Project 3 Card**: "Wishlist Storefront Deployment"
  - Description: Deployed wishlist.webcontrive.com using automated Terraform, ALB, ASG, and AWS Database Migration Service (DMS).
  - Tech tags: `Terraform`, `AWS DMS`, `ALB/ASG`.
- **Project 4 Card**: "Secure Azure CI/CD Platform"
  - Description: Engineered a highly secure CI/CD platform using GitHub Actions with OpenID Connect (OIDC) authentication.
  - Tech tags: `Azure`, `OIDC`, `GitHub Actions`.
- **Project 5 Card**: "AWS Graviton Migration & Cost Optimization"
  - Description: Migrated Webcontrive workloads to AWS Graviton/ARM64 architectures and managed ALB, ASG, Launch Templates, and Multi-AZ RDS. Successfully reduced monthly AWS bills from $800 to $327 (59% cost savings).
  - Tech tags: `Graviton/ARM64`, `AWS Optimization`, `RDS`.
- **Card Internals**: Place category tag at the top left, project title, quantified metrics (e.g., "59% cost reduction", "99.95% uptime"), brief explanation, and an action link "Read Case Study ->" which underlines on hover [10, 111, 287].

### 2.5 Chronological Experience Timeline
A clean, vertical timeline showing Jeni's progressive career milestones [240]. Ensure it is simple, readable, and structured [13, 260]:
1. **AWS Cloud & DevOps Engineer | Webcontrive** (Current Role)
   - *Key Actions*: Managed ALB, ASG, Launch Templates, and Multi-AZ RDS; automated Laravel deployments; migrated workloads to AWS Graviton/ARM64; resolved HTTP 429 production rate-limiting issues; implemented AWS security controls and reduced overall hosting costs by 59% [104, 106].
2. **AWS Engineer | OptimumBrew Technology LLP**
   - *Key Actions*: Improved Jenkins build performance by 30% and implemented automated SonarQube quality gates to safeguard code [287].
3. **Senior Server & Cloud Engineer | LOGIX BUILT SOLUTIONS PVT. LTD.**
   - *Key Actions*: Architected robust AWS/GCP cloud environments, managed ECS and enterprise VMware infrastructures, standardized Docker containerization, and implemented Terraform-based IaC [287].
4. **Earlier Technical Foundation**
   - *Milestones*: Network engineering, firewall administration, Linux systems administration, and deploying collaboration suites (GitLab, NextCloud, Zulip, Redmine) [287].

### 2.6 Awards & Knowledge Sharing (Grid)
- **Cell Left (Awards Showcase)**: Grid list of professional titles won:
  - *Server / Cloud Support Dynamo*
  - *Technical Support Dynamo*
  - *Best Server Support Engineer*
- **Cell Right (Articles & Publications)**: Group of tags indicating shared expert topics with hover transitions [229]:
  - `AWS Migrations` | `GitHub Actions` | `CloudFront Caching` | `Terraform IaC` | `AWS CloudWatch` | `DevOps Practices`

### 2.7 High-Converting Contact Section
- **Form Layout**: Symmetrical, simple, and clean container block [418].
- **Inputs Structure**: Text fields must be easily tappable, **exactly 48px tall**, featuring a 1px solid border (`#374151`), rounded corners (`8px`), inner padding (`12px 16px`), and Inter font (`16px` to prevent automatic zoom on iOS devices) [95].
- **Fields**: Name, Corporate Email Address, Project Type dropdown, Budget/Urgency, and Message box [10, 18].
- **Interactive Feedback**: When field validation fails, use a warning icon + descriptive red text (`#EF4444`) underneath the input—never rely on color alone to convey error states [71, 72, 133].
- **CTA**: Highlighted primary filled button "Send Message" (Purple `#8B5CF6`), 48px tall with 10-20% hover color variations [143, 233].

### 2.8 Clean Web Footer
- **Layout**: Center-aligned copyright information ("© 2026 Jeni Patel. All rights reserved.") [10, 301].
- **Links**: Outbound SVG links to Jeni's GitHub, LinkedIn, and Technical Blog platform [10, 108].
- **Accessibility Check**: Include a small, subtle indicator validating "WCAG 2.1 AA Compliant & accessible" [71, 316].

---

## SECTION 3: SYSTEM STABILITY & CODE QUALITY

### 3.1 Performance & Core Web Vitals Optimization
- **LCP (Largest Contentful Paint)**: Keep under 2.5 seconds. Use native system/modern sans-serif fonts to prevent slow font-download blocking, lazy load the bento visualizations, and optimize responsive images [96, 472].
- **CLS (Cumulative Layout Shift)**: Keep under 0.1. Reserve exact height/width parameters on all images and containers [472].
- **Code Execution**: Avoid parser-blocking scripts. Use `defer` or `async` on script tags [292]. Set all SVG elements to render inline or use optimized bundles [292].

### 3.2 HTML/CSS Utility Patterns (Tailwind CSS Blueprint)
Implement clean, responsive Tailwind classes following this exact card blueprint [97]:
```html
<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md hover:shadow-lg hover:border-violet-500 hover:scale-[1.05] transition-all duration-300 ease-in-out">
  <div class="flex items-center gap-4 mb-4">
    <!-- Inline SVG Icon Inside 44x44px Bounding Box -->
    <div class="w-11 h-11 flex items-center justify-center bg-violet-950/50 rounded-lg text-violet-400">
      <svg class="w-6 h-6" ...></svg>
    </div>
    <span class="text-xs font-semibold text-teal-400 bg-teal-950/40 px-2.5 py-1 rounded-full">AWS Stack</span>
  </div>
  <h3 class="text-lg font-bold text-white mb-2">Project/Expertise Title</h3>
  <p class="text-zinc-400 text-sm mb-4">Quantifiable professional description...</p>
  <a href="#" class="inline-flex items-center text-sm font-semibold text-teal-400 hover:underline">
    Explore Details <span class="ml-1">-></span>
  </a>
</div>
```

---

## SECTION 4: INSTRUCTION TO GENERATOR
Analyze this blueprint, the Jeni Patel profile, and the system design rules. Output a complete, single-file HTML landing page utilizing inline Tailwind CSS, modern responsive design, Inter font, and polished vector SVG icons [97, 245, 252]. Ensure every professional metric, tool, and role mentioned in Jeni's bio is clearly placed into its proper hierarchical page section [88, 150]. Do not write placeholder copy—all detailed bio descriptions must be included in full [4, 183]. Ensure 100% WCAG AA compliance [71, 316]. Keep layout grids turned on for structural rendering and off for clean presentation [123].
