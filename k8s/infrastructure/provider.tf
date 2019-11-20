provider "google" {
  credentials = "${file("credentials.json")}"
  project     = "coffee-io-k8s"
  region      = "southamerica-east1"
  zone        = "southamerica-east1-b"
}
