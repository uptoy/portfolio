resource "google_cloud_run_service" "front" {
  name                       = "portfolio-front"
  location                   = var.location
  autogenerate_revision_name = true
  template {
    spec {
      containers {
        image = var.container_image_front
      }
      service_account_name = var.service_account_name
    }
  }
}

output "front_url" {
  value = google_cloud_run_service.front.status[0].url
}

resource "google_cloud_run_service" "back" {
  name                       = "portfolio-back"
  location                   = var.location
  autogenerate_revision_name = true
  template {
    spec {
      containers {
        image = var.container_image_back
      }
      service_account_name = var.service_account_name
    }
  }
}

output "back_url" {
  value = google_cloud_run_service.back.status[0].url
}
