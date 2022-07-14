terraform {
  required_version = "~> 1.2.1"
  required_providers {
    google = ">= 4.20.0"
  }
  backend "gcs" {
    prefix = "terraform/state"
  }
}


data "google_iam_policy" "cloud_run_public" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "policy_frontend" {
  location = google_cloud_run_service.frontend.location
  project  = google_cloud_run_service.frontend.project
  service  = google_cloud_run_service.frontend.name

  policy_data = data.google_iam_policy.cloud_run_public.policy_data
}

resource "google_cloud_run_service_iam_policy" "policy_backend" {
  location = google_cloud_run_service.backend.location
  project  = google_cloud_run_service.backend.project
  service  = google_cloud_run_service.backend.name

  policy_data = data.google_iam_policy.cloud_run_public.policy_data
}


locals {
  cloudrun_roles = [
    "roles/run.developer",
    "roles/iam.serviceAccountUser"
  ]
}

resource "google_project_service" "default" {
  project = var.project
  service = "iamcredentials.googleapis.com"
}

resource "google_service_account" "default" {
  project      = var.project
  account_id   = "cloudsql-compute-engine"
  display_name = "Service Account"
}

resource "google_service_account" "github_actions" {
  project      = var.project
  account_id   = "github-actions"
  display_name = "A service account for GitHub Actions"
  description  = "link to Workload Identity Pool used by github actions"
}

resource "google_iam_workload_identity_pool" "github" {
  provider                  = google-beta
  project                   = var.project
  workload_identity_pool_id = "github"
  display_name              = "github"
  description               = "Workload Identity Pool for GitHub Actions"
}

resource "google_iam_workload_identity_pool_provider" "github" {
  provider                           = google-beta
  project                            = var.project
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "github actions provider"
  description                        = "OIDC identity pool provider for execute github actions"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
    "attribute.owner"      = "assertion.repository_owner"
    "attribute.refs"       = "assertion.ref"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_member" "github-account-iam" {
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/${var.repo_name}"
}

resource "google_project_iam_member" "service_account" {
  count   = length(local.cloudrun_roles)
  project = var.project
  role    = element(local.cloudrun_roles, count.index)
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

output "service_account_github_actions_email" {
  description = "github account for github actions"
  value       = google_service_account.github_actions.email
}

output "google_iam_workload_identity_pool_provider_github_name" {
  description = "Workload Identity Pood Provider ID"
  value       = google_iam_workload_identity_pool_provider.github.name
}
