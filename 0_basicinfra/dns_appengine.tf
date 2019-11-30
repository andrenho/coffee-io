resource "google_dns_record_set" "appengine" {
  name = "www.appengine.${google_dns_managed_zone.coffee.dns_name}"
  type = "CNAME"
  ttl  = 300

  managed_zone = google_dns_managed_zone.coffee.name

  rrdatas = ["c.storage.googleapis.com."]
}
