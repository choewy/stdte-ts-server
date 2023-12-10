#!/bin/bash

source /home/ubuntu/develop/docker

container="$PREFIX-$REPLACE"

sudo docker run \
  --name $container -d \
  -e CONTAINER_PREFIX=$PREFIX \
  -e CONTAINER_PROCESS=${REPLACE} \
  -p ${REPLACE}:3000 \
  -v /home/ubuntu/logs:/var/server/logs \
  --restart=always \
  $IMAGE_ID

exit 0