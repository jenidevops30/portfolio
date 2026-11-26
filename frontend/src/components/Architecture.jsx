const productionLayers = [
  {
    title: "Traffic & DNS",
    items: ["Route 53", "Cloudflare"],
    detail: "DNS, edge traffic handling, and application entry points.",
  },
  {
    title: "Load balancing",
    items: ["Application Load Balancer"],
    detail: "Distributes incoming application traffic across the EC2 fleet.",
  },
  {
    title: "Application compute",
    items: ["Amazon EC2", "Auto Scaling Groups", "Apache · PHP-FPM"],
    detail: "Linux-based application servers with managed capacity and PHP runtime services.",
  },
  {
    title: "Data & operations",
    items: ["Amazon RDS", "Amazon VPC", "Amazon CloudWatch"],
    detail: "Managed relational database, network boundaries, metrics, and operational visibility.",
  },
];

const deliveryExamples = [
  {
    title: "Android application builds",
    tools: ["Git", "Jenkins", "Build & tests", "SonarQube", "JFrog Artifactory"],
    detail: "A professional CI workflow for building Android artifacts, running quality analysis, and publishing build outputs.",
  },
  {
    title: "Web application delivery",
    tools: ["GitLab CI/CD", "Next.js", "Build", "Deployment"],
    detail: "A separate delivery workflow used for a Next.js company website. Exact environments and deployment targets are intentionally not inferred here.",
  },
];

const Architecture = () => (
  <section id="architecture">
    <div className="container">
      <div className="section-label">Infrastructure &amp; Delivery</div>
      <h2 className="section-title">How Production Systems Are Operated</h2>
      <p className="section-intro">
        My current production infrastructure experience is centred on AWS virtual machines,
        managed networking and databases, and Linux application services. CI/CD examples below
        are shown separately because they come from different professional projects.
      </p>

      <div className="arch-card architecture-real">
        <div className="arch-subtitle">AWS production infrastructure — simplified view</div>
        <div className="production-layers">
          {productionLayers.map((layer, index) => (
            <div className="production-layer-wrap" key={layer.title}>
              <div className="production-layer">
                <div className="production-layer-heading">
                  <span className="production-layer-index">0{index + 1}</span>
                  <h3>{layer.title}</h3>
                </div>
                <div className="production-layer-items">
                  {layer.items.map((item) => <span className="production-layer-item" key={item}>{item}</span>)}
                </div>
                <p>{layer.detail}</p>
              </div>
              {index < productionLayers.length - 1 && <div className="production-layer-connector" aria-hidden="true">↓</div>}
            </div>
          ))}
        </div>
        <p className="architecture-note">
          Conceptual overview of technologies used in production work; it is not a customer-specific
          network diagram or a claim that every component is deployed in one identical stack.
        </p>
      </div>

      <div className="arch-card delivery-examples">
        <div className="arch-subtitle">CI/CD experience — separate project workflows</div>
        <div className="delivery-example-grid">
          {deliveryExamples.map((flow) => (
            <article className="delivery-example" key={flow.title}>
              <h3>{flow.title}</h3>
              <div className="delivery-tool-list">
                {flow.tools.map((tool, index) => (
                  <span className="delivery-tool" key={tool}>
                    {tool}{index < flow.tools.length - 1 && <span aria-hidden="true"> → </span>}
                  </span>
                ))}
              </div>
              <p>{flow.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="architecture-boundary">
        <strong>Production vs. hands-on learning:</strong> Docker and Kubernetes are part of my
        hands-on learning and project experience. They are not presented here as the runtime
        platform for my current production workloads.
      </div>
    </div>
  </section>
);

export default Architecture;
