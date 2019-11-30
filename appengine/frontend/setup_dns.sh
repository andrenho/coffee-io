#!/bin/sh

set -x

ZONE=coffee
URL=www.appengine.coffee.gamesmith.uk
IP_1=151.101.1.195
IP_2=151.101.65.195

# setup dns
gcloud dns record-sets transaction start --zone=$ZONE
gcloud dns record-sets transaction add $IP_1 $IP_2 --name=$URL. --ttl=300 --type=A --zone=$ZONE
gcloud dns record-sets transaction execute --zone=$ZONE

echo If anything went wrong, abort the transaction with "gcloud dns record-sets transaction abort --zone=$ZONE"
