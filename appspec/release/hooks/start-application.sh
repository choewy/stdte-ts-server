#!/bin/bash

source /home/ubuntu/release/profile

IMAGE_ID="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"

BLUE=stdte-ts-server-blue

if [ "$(sudo docker container inspect --format '{{.Name}}' $BLUE 2>&1)" == "/$BLUE" ]; then
  sudo docker rm -f $BLUE
fi

sudo docker run \
  --name $BLUE -d \
  -p 3001:3000 \
  -v /home/ubuntu/logs:/var/server/logs \
  --restart=always \
  $IMAGE_ID

GREEN=stdte-ts-server-green

if [ "$(sudo docker container inspect --format '{{.Name}}' $GREEN 2>&1)" == "/$GREEN" ]; then
  sudo docker rm -f $GREEN
fi

sudo docker run \
  --name $GREEN -d \
  -p 3002:3000 \
  -v /home/ubuntu/logs:/var/server/logs \
  --restart=always \
  $IMAGE_ID 

exit 0