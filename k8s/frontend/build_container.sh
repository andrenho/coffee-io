#!/bin/sh

. ../vars.env

set -ex

pushd .
cd ../../frontend
REACT_APP_BACKEND_URL= yarn build
popd

cp -R ../../frontend/build build
docker build -t $USERNAME/$IMAGE_FRONTEND:latest .
rm -rf build

docker image ls $USERNAME/$IMAGE_FRONTEND
