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
        <div className="blog-empty-copy">
          <span className="blog-status">The first articles are in progress</span>
          <h3>Useful field notes take time to get right.</h3>
          <p>
            I’m preparing practical walkthroughs on AWS operations, delivery automation,
            Linux troubleshooting and Kubernetes. Until the first article is published,
            explore the projects and infrastructure work behind these topics.
          </p>
        </div>
        <a className="btn-outline blog-empty-action" href="#projects">
          Explore engineering projects
        </a>
      </div>
    </div>
  </section>
);

export default Blog;
