#!/bin/sh

. ../vars.env

set -ex

docker run --rm -v "$PWD":/app treeder/bump patch
version=`cat VERSION`
echo "version: $version"

# run build
./build_container.sh

# tag it
docker tag $USERNAME/$IMAGE_DATABASE:latest $USERNAME/$IMAGE_DATABASE:$version

# push it
docker push $USERNAME/$IMAGE_DATABASE:latest
docker push $USERNAME/$IMAGE_DATABASE:$version
