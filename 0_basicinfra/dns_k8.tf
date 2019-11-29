resource "google_compute_address" "ip_backend" {
  name = "ip-backend"
}

resource "google_dns_record_set" "backend" {
  name = "api.k8s.${google_dns_managed_zone.coffee.dns_name}"
  type = "A"
  ttl  = 300

  managed_zone = google_dns_managed_zone.coffee.name

  rrdatas = [google_compute_address.ip_backend.address]
}

resource "google_compute_address" "ip_frontend" {
  name = "ip-frontend"
}

resource "google_dns_record_set" "frontend" {
  name = "www.k8s.${google_dns_managed_zone.coffee.dns_name}"
  type = "A"
  ttl  = 300

  managed_zone = google_dns_managed_zone.coffee.name

  rrdatas = [google_compute_address.ip_frontend.address]
}
