resource "google_dns_managed_zone" "k8s" {
  name = "k8s"
  dns_name = "coffee-k8s.gamesmith.uk."
}

resource "google_compute_address" "ip_backend" {
  name = "ip-backend"
}

resource "google_dns_record_set" "backend" {
  name = "api.${google_dns_managed_zone.k8s.dns_name}"
  type = "A"
  ttl  = 300

  managed_zone = google_dns_managed_zone.k8s.name

  rrdatas = [google_compute_address.ip_backend.address]
}

resource "google_compute_address" "ip_frontend" {
  name = "ip-frontend"
}

resource "google_dns_record_set" "frontend" {
  name = "www.${google_dns_managed_zone.k8s.dns_name}"
  type = "A"
  ttl  = 300

  managed_zone = google_dns_managed_zone.k8s.name

  rrdatas = [google_compute_address.ip_frontend.address]
}
