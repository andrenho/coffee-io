#!/bin/sh

. ../vars.env

set -ex

docker run --name database -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=expired -e MYSQL_PASSWORD=temp \
  $USERNAME/$IMAGE_DATABASE
