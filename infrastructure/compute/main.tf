resource "aws_security_group" "ec2" {
  name        = "${var.project_name}-${var.environment}-ec2-sg"
  description = "Security group for portfolio EC2 instance"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH from administrator"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_cidr]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-ec2-sg"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "Jeni"
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
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

resource "aws_instance" "portfolio" {
  count         = length(var.app_subnet_ids)
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  
  key_name = var.key_name

  subnet_id = var.app_subnet_ids[count.index]

  vpc_security_group_ids = [
    aws_security_group.ec2.id
  ]

  associate_public_ip_address = true

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y nginx

              systemctl enable nginx
              systemctl start nginx

              echo "<h1>AWS Production Platform</h1>" > /var/www/html/index.html
              echo "<p>EC2 deployment successful on node ${count.index + 1}.</p>" >> /var/www/html/index.html
              EOF

  root_block_device {
    volume_type = "gp3"
    volume_size = 8
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-ec2-${count.index + 1}"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "Jeni"
  }
}