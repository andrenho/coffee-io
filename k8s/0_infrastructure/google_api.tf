resource "google_project_service" "resourcemanager" {
  project = "coffee-io-k8s"
  service = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "project" {
  project = "coffee-io-k8s"
  service = "container.googleapis.com"
  depends_on = [google_project_service.resourcemanager]
}
