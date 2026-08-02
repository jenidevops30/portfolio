import { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: 'JeniDevOps Shell v1.0.0', type: 'system' },
    { text: 'Type "help" to view available commands.', type: 'system' },
    { text: '', type: 'spacer' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDeploying, setIsDeploying] = useState(false);
  const terminalBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `jeni@devops-node:~# ${cmd}`, type: 'prompt' }];

    if (trimmedCmd === '') {
      setHistory(newHistory);
      return;
    }

    // Add to command history
    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);

    switch (trimmedCmd) {
      case 'clear':
        setHistory([]);
        break;

      case 'help':
        setHistory([
          ...newHistory,
          { text: 'Available commands:', type: 'header' },
          { text: '  neofetch  - Display system and DevOps environment specifications', type: 'info' },
          { text: '  skills    - List core competencies and technologies', type: 'info' },
          { text: '  projects  - Show featured infrastructure projects', type: 'info' },
          { text: '  deploy    - Simulate a live multi-stage CI/CD pipeline deployment', type: 'info' },
          { text: '  contact   - Show quick contact coordinates', type: 'info' },
          { text: '  clear     - Clear the terminal screen', type: 'info' }
        ]);
        break;

      case 'neofetch':
        setHistory([
          ...newHistory,
          {
            text: `
    .---.      HOST: jeni-k8s-control-plane
   /     \\     OS: Alpine Linux v3.19 (Cloud Optimized)
   \\  o  /     KERNEL: 6.6.15-aws-eks
    |   |      SHELL: devops-sh
   /     \\     UPTIME: 345 days, 12 hours
  |  |_|  |    ACTIVE CLUSTERS: AWS EKS (Mumbai / Hyderabad), Azure AKS
  |_______|    GITOPS CONTROLLER: ArgoCD v2.10.4 (Healthy)
               FINOPS STATUS: 35% Cost Optimization Achieved
               METRICS: Uptime 99.99% | 0.00% Packet Loss
            `,
            type: 'ascii'
          }
        ]);
        break;

      case 'skills':
        setHistory([
          ...newHistory,
          { text: '--- CORE CAPABILITIES & STACK ---', type: 'header' },
          { text: '  [Cloud Platforms]   AWS (Architect & SysOps), GCP, Azure, VMware vSphere', type: 'info' },
          { text: '  [IaC & Config]      Terraform, Ansible, Packer', type: 'info' },
          { text: '  [Orchestration]     Kubernetes (EKS/AKS), Docker, AWS ECS', type: 'info' },
          { text: '  [CI/CD Pipelines]   Jenkins, GitHub Actions, GitLab CI', type: 'info' },
          { text: '  [Observability]     Prometheus, Grafana, CloudWatch, Datadog', type: 'info' },
          { text: '  [Networking/Sec]    Sophos Firewall, FortiGate VPN, IAM Least Privilege', type: 'info' },
          { text: '  [Languages]         Python, Bash scripting', type: 'info' }
        ]);
        break;

      case 'projects':
        setHistory([
          ...newHistory,
          { text: '--- FEATURED INFRASTRUCTURE WORK ---', type: 'header' },
          { text: '1. Quickhunt AWS Migration:', type: 'success' },
          { text: '   DigitalOcean to AWS Multi-AZ High Availability migration. 99.95% uptime.', type: 'info' },
          { text: '2. Face Swap Pro AI Infrastructure:', type: 'success' },
          { text: '   On-prem GPU virtualization and containerized scheduling cluster. 60% savings.', type: 'info' },
          { text: '3. Cost Optimization (FinOps):', type: 'success' },
          { text: '   Multi-account AWS Organizations governance & automated rightsizing.', type: 'info' },
          { text: '4. Edu-Platform Pipeline SecOps:', type: 'success' },
          { text: '   Passwordless GitHub Actions deployment via Azure OIDC authentication.', type: 'info' }
        ]);
        break;

      case 'contact':
        setHistory([
          ...newHistory,
          { text: '📧 Email:    pjeni3095@gmail.com', type: 'info' },
          { text: '💼 LinkedIn: https://www.linkedin.com/in/jeni-patel-devops-engg/', type: 'info' },
          { text: '🐙 GitHub:   https://github.com/jenidevops30', type: 'info' },
          { text: '💬 WhatsApp: +91 8849742011', type: 'info' }
        ]);
        break;

      case 'deploy':
        if (isDeploying) return;
        setIsDeploying(true);
        setHistory(newHistory);
        await runDeploymentSimulation();
        break;

      default:
        setHistory([
          ...newHistory,
          { text: `sh: command not found: ${cmd}. Type "help" for a list of commands.`, type: 'error' }
        ]);
        break;
    }
  };

  const runDeploymentSimulation = async () => {
    const steps = [
      { text: '[INFO] Initializing CI/CD deployment pipeline...', delay: 600, type: 'info' },
      { text: '[INFO] Fetching latest commits from git repository: main...', delay: 800, type: 'info' },
      { text: '[OK] Git checkout finished.', delay: 500, type: 'success' },
      { text: '[INFO] Running security static analysis (tfsec & SonarQube)...', delay: 1000, type: 'info' },
      { text: '[SUCCESS] Code Quality Gates passed. No vulnerabilities detected.', delay: 600, type: 'success' },
      { text: '[INFO] Initializing Terraform configuration...', delay: 700, type: 'info' },
      { text: '[INFO] Executing: terraform apply --auto-approve', delay: 1200, type: 'info' },
      { text: '   AWS VPC: Modifying network routes...', delay: 400, type: 'info' },
      { text: '   AWS EKS: Updating Kubernetes deployment pods...', delay: 600, type: 'info' },
      { text: '   Terraform Apply Complete! Resources: 3 added, 1 modified, 0 destroyed.', delay: 500, type: 'success' },
      { text: '[INFO] Triggering rolling update on Kubernetes cluster...', delay: 900, type: 'info' },
      { text: '   kubectl rollout status deployment/portfolio-app -n production', delay: 1000, type: 'info' },
      { text: '   ✔ Pod: app-v2-d85f7f9-abc12 (Running)', delay: 400, type: 'info' },
      { text: '   ✔ Pod: app-v2-d85f7f9-xyz34 (Running)', delay: 400, type: 'info' },
      { text: '[SUCCESS] Deployment complete! Edge CDN CloudFront cache invalidated.', delay: 600, type: 'success' },
      { text: '🚀 PRODUCTION ENVIRONMENT ONLINE: https://jenidevops.portfolio/', delay: 200, type: 'header' }
    ];

    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setHistory(prev => [...prev, { text: step.text, type: step.type }]);
    }
    setIsDeploying(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="terminal-section">
      <div className="container">
        <div className="section-label">Interactive Sandbox</div>
        <h2 className="section-title">DevOps Console</h2>
        <p className="terminal-subtitle">
          Interact with a live simulated environment. Run terminal commands directly from your browser.
        </p>

        <div className="terminal-container glass">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-title">jeni@devops-node:~ (zsh)</div>
            <div className="terminal-status-badge">
              <span className="status-dot-green"></span>
              Connected
            </div>
          </div>
          
          <div className="terminal-body" ref={terminalBodyRef}>
            {history.map((log, idx) => {
              if (log.type === 'spacer') return <div key={idx} className="terminal-spacer" />;
              return (
                <div key={idx} className={`terminal-line terminal-${log.type}`}>
                  {log.type === 'ascii' ? (
                    <pre className="terminal-ascii-pre">{log.text}</pre>
                  ) : (
                    <span>{log.text}</span>
                  )}
                </div>
              );
            })}
            
            {!isDeploying && (
              <div className="terminal-prompt-line">
                <span className="terminal-prompt">jeni@devops-node:~#</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  placeholder='Try "help" or "neofetch"...'
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Terminal Input"
                />
              </div>
            )}
            {isDeploying && (
              <div className="terminal-deploying-loader">
                <span className="loader-indicator">⚡</span> Pipeline in progress...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
