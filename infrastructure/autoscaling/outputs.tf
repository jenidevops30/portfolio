output "launch_template_id" {
  value = aws_launch_template.portfolio.id
}

output "autoscaling_group_name" {
  value = aws_autoscaling_group.portfolio.name
}

output "desired_capacity" {
  value = aws_autoscaling_group.portfolio.desired_capacity
}

output "min_size" {
  value = aws_autoscaling_group.portfolio.min_size
}

output "max_size" {
  value = aws_autoscaling_group.portfolio.max_size
}