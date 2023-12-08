#!/bin/bash

source /home/ubuntu/develop/profile

IMAGE_ID="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"

DEVELOP=stdte-ts-server-develop

if [ "$(sudo docker container inspect --format '{{.Name}}' $DEVELOP 2>&1)" == "/$DEVELOP" ]; then
  sudo docker rm -f $DEVELOP
fi

sudo docker run \
  --name $DEVELOP -d \
  -p 3000:3000 \
  -v /home/ubuntu/logs:/var/server/logs \
  --restart=always \
  $IMAGE_ID

exit 0