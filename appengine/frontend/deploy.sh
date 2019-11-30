#!/bin/sh

set -x

BUCKET=gs://www.appengine.coffee.gamesmith.uk

# compile application
pushd .
cd ../../frontend
yarn build
popd

cp -R ../../frontend/build .

# create bucket
gsutil mb $BUCKET

# clear pre-exiting files on bucket
gsutil -m rm -rf $BUCKET/*

# copy files to bucket
cd build
gsutil -m cp -r . $BUCKET/
cd ..
rm -rf build

# make bucket public
gsutil iam ch allUsers:objectViewer $BUCKET

# set index page
gsutil web set -m index.html -e index.html $BUCKET
