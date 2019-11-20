#!/bin/sh

set -ex

. ../vars.env

gcloud container clusters get-credentials $CLUSTER_NAME --zone $CLUSTER_ZONE --project $PROJECT
IP=$(gcloud compute addresses describe ip-backend --region $CLUSTER_REGION --format json | jq -r .address)
cat service.yaml | sed "s/\$VERSION/$(cat VERSION)/g" | sed "s/\$IP/$IP/g" | kubectl apply -f -
