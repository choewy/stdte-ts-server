#!/bin/bash

source /home/ubuntu/deployment/profile

BLUE=stdte-ts-server-blue
GREEN=stdte-ts-server-green

if [ "$(sudo docker container inspect --format '{{.Name}}' $BLUE 2>&1)" == "/$BLUE" ]; then;
  sudo docker rm -f $BLUE
fi

sudo docker run -d -p 3001:3000 --restart --name $BLUE $IMAGE_NAME


if [ "$(sudo docker container inspect --format '{{.Name}}' $GREEN 2>&1)" == "/$GREEN" ]; then;
  sudo docker rm -f $GREEN
fi

sudo docker run -d -p 3002:3000 --restart --name $GREEN $IMAGE_NAME

exit 0