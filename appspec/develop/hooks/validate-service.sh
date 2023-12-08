#!/bin/bash

if  [ -d "/home/ubuntu/develop" ]; then
  rm -rf /home/ubuntu/develop
fi

curl -X GET "http://localhost:3000"

sudo docker image prune -a --force

exit 0