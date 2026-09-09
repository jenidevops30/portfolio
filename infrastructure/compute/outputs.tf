output "security_group_id" {
  value = aws_security_group.ec2.id
}

output "ec2_instance_ids" {
  value = aws_instance.portfolio[*].id
}

output "ec2_public_ips" {
  value = aws_instance.portfolio[*].public_ip
}

output "ec2_private_ips" {
  value = aws_instance.portfolio[*].private_ip
}