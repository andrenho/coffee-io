#!/bin/sh

. ../vars.env

set -ex

docker run --name database -p 3306:3306 $USERNAME/$IMAGE_DATABASE
