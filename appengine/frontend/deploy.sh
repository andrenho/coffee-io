#!/bin/sh

set -x

BUCKET=gs://www.appengine.coffee.gamesmith.uk

pushd .
cd ../../frontend
yarn build
popd

cp -R ../../frontend/build .

gsutil mb $BUCKET
gsutil -m rm -rf $BUCKET/*
cd build
gsutil -m cp -r . $BUCKET/
cd ..
gsutil iam ch allUsers:objectViewer $BUCKET

rm -rf build
