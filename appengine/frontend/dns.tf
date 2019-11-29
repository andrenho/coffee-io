resource "google_dns_managed_zone" "appengine" {
  name = "appengine"
  dns_name = "coffee-appengine.gamesmith.uk."
}

resource "google_dns_record_set" "frontend" {
  name = "www.${google_dns_managed_zone.appengine.dns_name}"
  type = "CNAME"
  ttl  = 300

  managed_zone = google_dns_managed_zone.appengine.name

  rrdatas = ["c.storage.googleapis.com."]
}

