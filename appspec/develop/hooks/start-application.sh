#!/bin/bash

source /home/ubuntu/develop/docker

if [ "$(sudo docker container inspect --format '{{.Name}}' $PREFIX 2>&1)" == "/$PREFIX" ]; then
  container_id=`sudo docker rm -f $PREFIX`
  echo "remove container $container_id"
fi

sudo docker run \
  --name $PREFIX -d \
  -e CONTAINER_PREFIX=$PREFIX \
  -e CONTAINER_PROCESS=3000 \
  -p 3000:3000 \
  -v /home/ubuntu/logs:/var/server/logs \
  --network=net \
  --restart=always \
  $IMAGE_ID

exit 0