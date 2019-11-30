#!/bin/sh

set -x

#BUCKET=gs://www.appengine.coffee.gamesmith.uk

## compile application
# pushd .
# cd ../../frontend
# yarn build
# popd

firebase login:ci

# rm -rf build
