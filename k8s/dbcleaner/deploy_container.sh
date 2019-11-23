#!/bin/sh

. ../vars.env

set -ex

docker run --rm -v "$PWD":/app treeder/bump patch
version=`cat VERSION`
echo "version: $version"

# run build
./build_container.sh

# tag it
docker tag $USERNAME/$IMAGE_DBCLEANER:latest $USERNAME/$IMAGE_DBCLEANER:$version

# push it
docker push $USERNAME/$IMAGE_DBCLEANER:latest
docker push $USERNAME/$IMAGE_DBCLEANER:$version
