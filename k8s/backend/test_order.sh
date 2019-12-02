#!/bin/sh

curl http://localhost:5000/cart \
  -X POST \
  -H "Content-Type: application/json" \
  --data @test.json
