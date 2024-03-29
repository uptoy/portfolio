resource "google_cloud_run_service" "frontend" {
  name                       = var.cloud_run_service_name_fe
  location                   = var.location
  autogenerate_revision_name = true
  template {
    spec {
      containers {
        image = var.container_image_frontend
      }
      service_account_name = var.service_account_name
    }
  }
}

output "frontend_url" {
  value = google_cloud_run_service.frontend.status[0].url
}

resource "google_cloud_run_service" "backend" {
  name                       = var.cloud_run_service_name_be
  location                   = var.location
  autogenerate_revision_name = true
  template {
    spec {
      containers {
        image = var.container_image_backend
      }
      service_account_name = var.service_account_name
    }
  }
}

output "backend_url" {
  value = google_cloud_run_service.backend.status[0].url
}
