output "security_group_id" {
  value = aws_security_group.ec2.id
}

output "ec2_instance_id" {
  value = aws_instance.portfolio.id
}

output "ec2_public_ip" {
  value = aws_instance.portfolio.public_ip
}

output "ec2_private_ip" {
  value = aws_instance.portfolio.private_ip
}