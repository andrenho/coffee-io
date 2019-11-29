resource "google_storage_bucket" "website" {
  name = "www.coffee-appengine.gamesmith.uk"

  website {
    main_page_suffix = "index.html"
    not_found_page = "index.html"
  }

  force_destroy = true
}
