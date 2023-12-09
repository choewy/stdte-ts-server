#!/bin/bash

source /home/ubuntu/develop/profile

IMAGE_ID="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"

prefix=stdte-ts-develop
processes=(1)

for i in ${processes[@]}
do
  CONTAINER_NAME="$prefix-$i"

  if [ "$(sudo docker container inspect --format '{{.Name}}' $CONTAINER_NAME 2>&1)" == "/$CONTAINER_NAME" ]; then
    sudo docker rm -f $CONTAINER_NAME
  fi

  sudo docker run \
    --name $CONTAINER_NAME -d \
    -e CONTAINER_NAME=$CONTAINER_NAME \
    -p 3001:3000 \
    -v /home/ubuntu/logs:/var/server/logs \
    --restart=always \
    $IMAGE_ID
done

exit 0