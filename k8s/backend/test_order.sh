#!/bin/sh

curl http://localhost:8888/cart/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data @test.json
