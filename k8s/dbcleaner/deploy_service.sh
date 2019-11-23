#!/bin/sh

set -ex

. ../vars.env

gcloud container clusters get-credentials $CLUSTER_NAME --zone $CLUSTER_ZONE --project $PROJECT
cat service.yaml | sed "s/\$VERSION/$(cat VERSION)/g" | kubectl apply -f -
