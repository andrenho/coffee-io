#!/bin/sh

BUCKET=gs://www.coffee-appengine.gamesmith.uk

gsutil -m rm -rf $BUCKET/*
cd build
gsutil -m cp -r . $BUCKET/
cd ..
