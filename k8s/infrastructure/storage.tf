resource "google_compute_disk" "db-storage" {
  name  = "db-storage"
  size  = 2
}
