#!/bin/sh

. ../vars.env

set -ex

echo "http://localhost:8080"

docker run --name frontend -p 8080:80 $USERNAME/$IMAGE_FRONTEND
