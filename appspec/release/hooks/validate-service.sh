#!/bin/bash

if  [ -d "/home/ubuntu/release" ]; then
  rm -rf /home/ubuntu/release
fi

curl -X GET "http://localhost:3001"
curl -X GET "http://localhost:3002"

sudo docker image prune -a --force

exit 0