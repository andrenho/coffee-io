#!/bin/sh

. ../vars.env

set -ex

docker run --name dbcleaner $USERNAME/$IMAGE_DBCLEANER
