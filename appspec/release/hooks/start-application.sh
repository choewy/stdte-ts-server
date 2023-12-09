#!/bin/bash

source /home/ubuntu/release/profile

image="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"
name=stdte-ts-product
ports=(3001, 3002)

for (( i = 0; i < ${#ports[@]}; i++ )); do
  label=$(($i + 1))
  container="$name-$label"
  port=${ports[$i]}

  if [ "$(sudo docker container inspect --format '{{.Name}}' $container 2>&1)" == "/$container" ]; then
    sudo docker rm -f $container
  fi

  sudo docker run \
    --name $container -d \
    -e NAME=$name \
    -e LABEL=$label \
    -p $port:3000 \
    -v /home/ubuntu/logs:/var/server/logs \
    --restart=always \
    $image
done

exit 0
