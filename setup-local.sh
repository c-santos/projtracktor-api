#!/bin/sh

set -e
set -x

D="docker"
DC="docker-compose"
$DC down --remove-orphans

# Spin up conatiners
$DC up -d

# Run migration and seeders
$DC exec projtracktor npm run typeorm:migration:run
# $DC exec my-template npm run typeorm:seed

# show logs
$DC logs -f
