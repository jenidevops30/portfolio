document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio app loaded');
  
  const projectsList = document.getElementById('projects-list');
  
  const projects = [
    { name: 'AWS Infrastructure', description: 'Terraform-managed multi-AZ VPC' },
    { name: 'CI/CD Pipeline', description: 'GitHub Actions with AWS deployment' },
    { name: 'Monitoring Stack', description: 'CloudWatch, X-Ray, and Grafana' }
  ];
  
  projects.forEach(project => {
    const card = document.createElement('div');
    card.style.cssText = 'padding: 1rem; border: 1px solid #ddd; border-radius: 4px;';
    card.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
    `;
    projectsList.appendChild(card);
  });
});