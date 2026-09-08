output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "vpc_cidr" {
  description = "VPC CIDR"
  value       = aws_vpc.main.cidr_block
}

output "subnet_ids" {
  description = "List of all subnet IDs"
  value = [
    aws_subnet.app_az1.id,
    aws_subnet.app_az2.id,
    aws_subnet.db_az1.id,
    aws_subnet.db_az2.id
  ]
}

output "app_subnet_az1_id" {
  value = aws_subnet.app_az1.id
}

output "app_subnet_az2_id" {
  value = aws_subnet.app_az2.id
}

output "db_subnet_az1_id" {
  value = aws_subnet.db_az1.id
}

output "db_subnet_az2_id" {
  value = aws_subnet.db_az2.id
}

output "availability_zones" {
  value = [
    aws_subnet.app_az1.availability_zone,
    aws_subnet.app_az2.availability_zone
  ]
}