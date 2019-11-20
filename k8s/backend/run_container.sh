#!/bin/sh

. ../vars.env

set -ex

echo "http://localhost:8080"

docker run --name backend -p 8080:8888 $USERNAME/$IMAGE_BACKEND
