const writingTopics = [
  {
    title: "AWS & Cloud Operations",
    description: "Practical notes on EC2, networking, storage, databases, scaling and day-to-day cloud operations.",
  },
  {
    title: "CI/CD & Automation",
    description: "Build pipelines, deployment workflows, infrastructure automation and lessons from delivery work.",
  },
  {
    title: "Linux & Troubleshooting",
    description: "Command-line investigations, server administration, debugging approaches and operational runbooks.",
  },
  {
    title: "Kubernetes & Reliability",
    description: "Hands-on cluster learning, observability, incident analysis and reliability engineering concepts.",
  },
];

const Blog = () => (
  <section id="blog">
    <div className="container">
      <div className="section-label">Notes &amp; Knowledge Sharing</div>
      <h2 className="section-title">Technical Writing</h2>
      <p className="section-intro">
        Practical engineering notes, troubleshooting walkthroughs and lessons from cloud
        infrastructure and DevOps work.
      </p>

      <div className="writing-topic-grid">
        {writingTopics.map((topic) => (
          <article className="writing-topic-card" key={topic.title}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </article>
        ))}
      </div>

      <div className="blog-empty-state">
        <span className="blog-status">Articles in preparation</span>
        <p>
          Published articles will appear here as they are ready. This section will use
          locally managed Markdown/MDX content, keeping the initial blog lightweight
          without requiring a database or admin dashboard.
        </p>
      </div>
    </div>
  </section>
);

export default Blog;
