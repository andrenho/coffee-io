#!/bin/sh

. ../vars.env

set -ex

docker build -t $USERNAME/$IMAGE_DATABASE:latest .
rm -rf build

docker image ls $USERNAME/$IMAGE_DATABASE
