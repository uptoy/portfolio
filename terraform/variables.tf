variable "project" {
  description = "A name of a GCP project"
  type        = string
  default     = null
}
variable "repo_name" {
  description = "github repository name"
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
  default     = ""
}

variable "container_image_backend" {
  description = "docker container image"
  type        = string
  default     = ""
}

variable "service_account_name" {
  description = "Email address of the IAM service account"
  type        = string
  default     = ""
}
