#!/bin/sh

. ../vars.env

set -ex

docker build -t $USERNAME/$IMAGE_DBCLEANER:latest .
rm -rf build

docker image ls $USERNAME/$IMAGE_DBCLEANER
