resource "google_container_cluster" "primary" {
  provider   = "google-beta"

  name       = "coffee-io"
  depends_on = [google_project_service.project]
  min_master_version = "1.14.8-gke.17"
  #location = "southamerica-east-1"

  initial_node_count       = 1

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }

  cluster_autoscaling {
    enabled = true
    resource_limits {
      resource_type = "cpu"
      minimum       = 1
      maximum       = 4
    }
    resource_limits {
      resource_type = "memory"
      minimum       = 1
      maximum       = 12
    }
  }

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    metadata = {
      disable-legacy-endpoints = "true"
    }

  }
}

#resource "google_compute_disk" "default" {
#  name = "pv-disk"
#  size = 1
#}

output "k8s_connect" {
	value = "gcloud container clusters get-credentials ${google_container_cluster.primary.name} --zone ${google_container_cluster.primary.location} --project ${google_container_cluster.primary.project}"
}
