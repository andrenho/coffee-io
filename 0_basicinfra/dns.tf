resource "google_dns_managed_zone" "coffee" {
  name = "coffee"
  dns_name = "coffee.gamesmith.uk."
}

output "nameservers" {
  value = google_dns_managed_zone.coffee.name_servers
}
