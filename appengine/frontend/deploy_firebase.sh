#!/bin/sh

set -xe

rm -rf public

## compile application
pushd .
cd ../../frontend
yarn build
popd

cp -R ../../frontend/build public

# deploy http
firebase deploy
