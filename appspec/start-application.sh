#!/bin/bash

source /home/ubuntu/deployment/profile

BLUE=stdte-ts-server-blue
GREEN=stdte-ts-server-green

if [ "$(sudo docker container inspect --format '{{.Name}}' $BLUE 2>&1)" == "/$BLUE" ]; then
  sudo docker rm -f $BLUE
fi

sudo docker run --name $BLUE -d -p 3001:3000 --restart=always $IMAGE_NAME


if [ "$(sudo docker container inspect --format '{{.Name}}' $GREEN 2>&1)" == "/$GREEN" ]; then
  sudo docker rm -f $GREEN
fi

sudo docker run --name $GREEN -d -p 3002:3000 --restart=always $IMAGE_NAME

exit 0