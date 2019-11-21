#!/bin/sh

echo db-pass: $(kubectl get secret secrets -o json | jq -r '.data."db-pass"' | base64 --decode)
echo db-root: $(kubectl get secret secrets -o json | jq -r '.data."db-root"' | base64 --decode)
