#!/bin/sh

. ../vars.env

set -ex

docker run --rm -v "$PWD":/app treeder/bump patch
version=`cat VERSION`
echo "version: $version"

# run build
./build_container.sh

# tag it
docker tag $USERNAME/$IMAGE_FRONTEND:latest $USERNAME/$IMAGE_FRONTEND:$version

# push it
docker push $USERNAME/$IMAGE_FRONTEND:latest
docker push $USERNAME/$IMAGE_FRONTEND:$version
