#!/bin/bash

curl -X GET "http://localhost:3001"
curl -X GET "http://localhost:3002"

sudo docker image prune -a --force

exit 0