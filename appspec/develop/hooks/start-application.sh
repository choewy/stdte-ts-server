#!/bin/bash

source /home/ubuntu/develop/profile

image="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"
prefix=stdte-ts-develop
ports=(3000)

for (( i = 0; i < ${#ports[@]}; i++ )); do
  
  name="$prefix-$(($i + 1))"
  port=${ports[$i]}

  if [ "$(sudo docker container inspect --format '{{.Name}}' $name 2>&1)" == "/$name" ]; then
    sudo docker rm -f $name
  fi

  sudo docker run \
    --name $name -d \
    -e CONTAINER_NAME=$name \
    -p $port:3000 \
    -v /home/ubuntu/logs:/var/server/logs \
    --restart=always \
    $image
done

exit 0