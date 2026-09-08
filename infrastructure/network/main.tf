locals {
  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = "Jeni"
  }
}


# -------------------------
# VPC
# -------------------------

resource "aws_vpc" "main" {

  cidr_block = var.vpc_cidr

  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-vpc"
    }
  )
}


# -------------------------
# Internet Gateway
# -------------------------

resource "aws_internet_gateway" "main" {

  vpc_id = aws_vpc.main.id

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-igw"
    }
  )
}


# -------------------------
# Availability Zones
# -------------------------

data "aws_availability_zones" "available" {
  state = "available"
}


# -------------------------
# Application Subnets
# -------------------------

resource "aws_subnet" "app_az1" {

  vpc_id = aws_vpc.main.id

  cidr_block = "10.0.1.0/24"

  availability_zone = data.aws_availability_zones.available.names[0]

  map_public_ip_on_launch = true

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-app-az1"
      Tier = "application"
    }
  )
}


resource "aws_subnet" "app_az2" {

  vpc_id = aws_vpc.main.id

  cidr_block = "10.0.2.0/24"

  availability_zone = data.aws_availability_zones.available.names[1]

  map_public_ip_on_launch = true

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-app-az2"
      Tier = "application"
    }
  )
}


# -------------------------
# Database Subnets
# -------------------------

resource "aws_subnet" "db_az1" {

  vpc_id = aws_vpc.main.id

  cidr_block = "10.0.11.0/24"

  availability_zone = data.aws_availability_zones.available.names[0]

  map_public_ip_on_launch = false

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-db-az1"
      Tier = "database"
    }
  )
}


resource "aws_subnet" "db_az2" {

  vpc_id = aws_vpc.main.id

  cidr_block = "10.0.12.0/24"

  availability_zone = data.aws_availability_zones.available.names[1]

  map_public_ip_on_launch = false

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-db-az2"
      Tier = "database"
    }
  )
}


# -------------------------
# Public Route Table
# -------------------------

resource "aws_route_table" "public" {

  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-public-rt"
    }
  )
}


# -------------------------
# Public Route Associations
# -------------------------

resource "aws_route_table_association" "app_az1" {

  subnet_id = aws_subnet.app_az1.id

  route_table_id = aws_route_table.public.id
}


resource "aws_route_table_association" "app_az2" {

  subnet_id = aws_subnet.app_az2.id

  route_table_id = aws_route_table.public.id
}


# -------------------------
# Private DB Route Table
# -------------------------

resource "aws_route_table" "database" {

  vpc_id = aws_vpc.main.id

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-database-rt"
    }
  )
}


resource "aws_route_table_association" "db_az1" {

  subnet_id = aws_subnet.db_az1.id

  route_table_id = aws_route_table.database.id
}


resource "aws_route_table_association" "db_az2" {

  subnet_id = aws_subnet.db_az2.id

  route_table_id = aws_route_table.database.id
}