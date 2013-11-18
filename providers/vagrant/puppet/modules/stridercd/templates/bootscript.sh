#!/bin/sh

export PATH=$PATH:/usr/local/bin:/usr/bin:/usr/sbin

# boot script for starting docker containers, hipache and then populating hipache routing config (in redis)

echo "Starting Docker"
service docker start

echo "Starting Hipache"
service hipache start

sleep 10

echo "Starting Docker containers"
fr-start-containers

echo "Syncing Hipache from containers"
fr-sync-hipache
