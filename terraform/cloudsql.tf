locals {
  onprem = ["192.168.1.2", "192.168.2.3"]
}

resource "google_compute_network" "private_network" {
  provider = google-beta
  name     = "private-network"
}

resource "google_compute_global_address" "private_ip_address" {
  provider = google-beta

  name          = "private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.private_network.id
}

resource "google_service_networking_connection" "private_vpc_connection" {
  provider = google-beta

  network                 = google_compute_network.private_network.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
}

resource "random_id" "db_name_suffix" {
  byte_length = 4
}

resource "google_sql_database_instance" "instance" {
  name             = "private-instance-${random_id.db_name_suffix.hex}"
  region           = var.location
  database_version = var.db_type
  depends_on       = [google_service_networking_connection.private_vpc_connection]
  settings {
    tier = var.db_size
    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.private_network.id
      dynamic "authorized_networks" {
        for_each = google_compute_instance.apps
        iterator = apps
        content {
          name  = apps.value.name
          value = apps.value.network_interface.0.access_config.0.nat_ip
        }
      }
      dynamic "authorized_networks" {
        for_each = local.onprem
        iterator = onprem

        content {
          name  = "onprem-${onprem.key}"
          value = onprem.value
        }
      }
    }
  }
  deletion_protection = "false"
}

resource "google_sql_database" "database" {
  name     = var.db_user
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "users" {
  name     = var.db_user
  instance = google_sql_database_instance.instance.name
  password = var.db_user
}

provider "google-beta" {
  region = "asia-northeast1"
  zone   = "asia-northeast1-a"
}


resource "google_compute_instance" "apps" {
  name         = "portfolio-vm"
  machine_type = "e2-small"
  zone         = "asia-northeast1-a"


  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-1804-lts"
    }
  }

  // Local SSD disk
  scratch_disk {
    interface = "SCSI"
  }

  network_interface {
    network = "default"

    access_config {
      // Ephemeral IP
    }
  }
  service_account {
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    email  = google_service_account.default.email
    scopes = ["cloud-platform"]
  }
}

