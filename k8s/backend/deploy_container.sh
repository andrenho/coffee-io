#!/bin/sh

. ../vars.env

set -ex

docker run --rm -v "$PWD":/app treeder/bump patch
version=`cat VERSION`
echo "version: $version"

# run build
./build_container.sh

# tag it
docker tag $USERNAME/$IMAGE_BACKEND:latest $USERNAME/$IMAGE_BACKEND:$version

# push it
docker push $USERNAME/$IMAGE_BACKEND:latest
docker push $USERNAME/$IMAGE_BACKEND:$version
