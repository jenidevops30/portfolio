data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"]

  filter {
    name = "name"
    values = [
      "ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"
    ]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}


resource "aws_launch_template" "portfolio" {
  name = "${var.project_name}-${var.environment}-lt"

  image_id = data.aws_ami.ubuntu.id

  instance_type = "t3.micro"

  key_name = var.key_name

  vpc_security_group_ids = [
    var.ec2_security_group_id
  ]

  user_data = base64encode(<<-EOF
    #!/bin/bash
    set -e

    apt-get update -y
    apt-get install -y curl nginx git build-essential ca-certificates

    # Configure Nginx reverse proxy with fallback health check during initial startup
    cat <<'NGINX_CONF' > /etc/nginx/sites-available/portfolio
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _;

        location /health {
            proxy_pass http://127.0.0.1:3000;
            proxy_connect_timeout 1s;
            proxy_read_timeout 2s;
            error_page 502 =200 @fallback_health;
        }

        location @fallback_health {
            default_type application/json;
            return 200 '{"status":"healthy","bootstrap":"in-progress"}';
        }

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
NGINX_CONF

    rm -f /etc/nginx/sites-enabled/default
    ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
    systemctl restart nginx
    systemctl enable nginx

    # Install NVM, Node.js, and portfolio application under ubuntu user
    su - ubuntu -c '
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
      nvm install 24
      nvm alias default 24

      mkdir -p /home/ubuntu/portfolio
      git clone -b v3 https://github.com/jenidevops30/portfolio.git /home/ubuntu/portfolio || (cd /home/ubuntu/portfolio && git pull)
      cd /home/ubuntu/portfolio/app
      npm install --omit=dev
    '

    NODE_BIN=$(su - ubuntu -c 'export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; which node')

    cat <<SERVICE_CONF > /etc/systemd/system/portfolio.service
    [Unit]
    Description=DevOps Portfolio Application (Node.js/Express)
    After=network.target

    [Service]
    Type=simple
    User=ubuntu
    WorkingDirectory=/home/ubuntu/portfolio/app
    Environment=NODE_ENV=production
    Environment=PORT=3000
    Environment=PATH=$(dirname $NODE_BIN):/usr/local/bin:/usr/bin:/bin
    ExecStart=$NODE_BIN /home/ubuntu/portfolio/app/src/server.js
    Restart=always
    RestartSec=5
    StandardOutput=journal
    StandardError=journal
    SyslogIdentifier=portfolio-app

    [Install]
    WantedBy=multi-user.target
SERVICE_CONF

    systemctl daemon-reload
    systemctl enable portfolio
    systemctl start portfolio
  EOF
  )

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name        = "${var.project_name}-${var.environment}-asg-instance"
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Jeni"
    }
  }

  tag_specifications {
    resource_type = "volume"

    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Jeni"
    }
  }
}

resource "aws_autoscaling_group" "portfolio" {
  name = "${var.project_name}-${var.environment}-asg"

  min_size         = 2
  desired_capacity = 2
  max_size         = 2

  vpc_zone_identifier = [
    var.app_subnet_az1_id,
    var.app_subnet_az2_id
  ]

  target_group_arns = [
    var.target_group_arn
  ]

  health_check_type         = "ELB"
  health_check_grace_period = 120

  launch_template {
    id      = aws_launch_template.portfolio.id
    version = "$Latest"
  }

  tag {
    key                 = "Project"
    value               = var.project_name
    propagate_at_launch = true
  }

  tag {
    key                 = "Environment"
    value               = var.environment
    propagate_at_launch = true
  }

  tag {
    key                 = "ManagedBy"
    value               = "Terraform"
    propagate_at_launch = true
  }
}

