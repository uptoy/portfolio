variable "project" {
  description = "A name of a GCP project"
  type        = string
  default     = "portfolio"
}
variable "repo_name" {
  description = "github repository name"
  type        = string
  default     = "user/repository"
}

variable "location" {
  description = "A location of a cloud run instance"
  type        = string
  default     = "asia-northeast1"
}

variable "container_image_frontend" {
  description = "docker container image"
  type        = string
  default     = "gcr.io/p06111806/frontend"
}

variable "container_image_backend" {
  description = "docker container image"
  type        = string
  default     = "gcr.io/p06111806/backend"
}


variable "db_instance" {
  type    = string
  default = "i06111806"
}

variable "db_instance" {
  type    = string
  default = "db-f1-micro"
}

variable "db_type" {
  type    = string
  default = "POSTGRES_13"
}

variable "db_user" {
  type    = string
  default = "portfolio-user"
}

variable "db_name" {
  type    = string
  default = "portfolio-db"
}

variable "db_password" {
  type    = string
  default = "password"
}

variable "db_password" {
  type    = string
  default = "password"
}

variable "cloud_run_service_name_be" {
  type    = string
  default = "portfolio-backend"
}
variable "cloud_run_service_name_fe" {
  type    = string
  default = "portfolio-frontend"
}

variable "service_account_name" {
  description = "Email address of the IAM service account"
  type        = string
  default     = ""
}
