#!/bin/sh

set -ex

. ./vars.env

gcloud container clusters get-credentials $CLUSTER_NAME --zone $CLUSTER_ZONE --project $PROJECT
kubectl apply -f ingress.yaml
