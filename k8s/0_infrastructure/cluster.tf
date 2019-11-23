resource "google_container_cluster" "primary" {
  remove_default_node_pool = true

  name       = "coffee-io"
  depends_on = [google_project_service.project]
  min_master_version = "1.14.8-gke.17"

  initial_node_count       = 1

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "my-node-pool"
  cluster    = google_container_cluster.primary.name
  node_count = 1

  node_config {
    preemptible  = true
    machine_type = "g1-small"

    metadata = {
      disable-legacy-endpoints = "true"
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }

  autoscaling {
    min_node_count = 1
    max_node_count = 4
  }
}

output "k8s_connect" {
	value = "gcloud container clusters get-credentials ${google_container_cluster.primary.name} --zone ${google_container_cluster.primary.location} --project ${google_container_cluster.primary.project}"
}
