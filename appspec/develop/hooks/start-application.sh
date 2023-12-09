#!/bin/bash

source /home/ubuntu/develop/profile

name="$APP_NAME-develop"
image="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"

ports=(3000)

for (( i = 0; i < ${#ports[@]}; i++ )); do
  container="$name-$(($i + 1))"
  port=${ports[$i]}

  if [ "$(sudo docker container inspect --format '{{.Name}}' $container 2>&1)" == "/$container" ]; then
    sudo docker rm -f $container
  fi

  sudo docker run \
    --name $container -d \
    -e CONTAINER_NAME=$container \
    -p $port:3000 \
    -v /home/ubuntu/logs:/var/server/logs \
    --restart=always \
    $image
done

exit 0