#!/bin/sh

set -ex

. ../vars.env

gcloud container clusters get-credentials $CLUSTER_NAME --zone $CLUSTER_ZONE --project $PROJECT
PASSWORD=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1)
PASSWORD_BASE=$(echo -n $PASSWORD | base64)
PASSWORD_ROOT=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1)
PASSWORD_ROOT_BASE=$(echo -n $PASSWORD_ROOT | base64)
echo Password: $PASSWORD
echo Password root: $PASSWORD_ROOT
cat secrets.yaml | sed "s/\$PASSWORD/$PASSWORD_BASE/g" | sed "s/\$PASSROOT/$PASSWORD_ROOT_BASE/g" | kubectl apply -f -
