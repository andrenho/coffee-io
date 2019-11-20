#!/bin/sh

PROJECT=coffee-io-k8s
BILLING_ACCOUNT=01C9A5-A7CE69-07C9D7
SERVICE_ACCOUNT=ci-runner
SA_EMAIL=$SERVICE_ACCOUNT@$PROJECT.iam.gserviceaccount.com

set -x

gcloud projects create $PROJECT --name=$PROJECT --set-as-default
gcloud beta billing projects link $PROJECT --billing-account=$BILLING_ACCOUNT

gcloud iam service-accounts create $SERVICE_ACCOUNT --display-name=ci
gcloud projects add-iam-policy-binding $PROJECT --member serviceAccount:$SA_EMAIL --role roles/owner
gcloud iam service-accounts keys create credentials.json --iam-account $SA_EMAIL
