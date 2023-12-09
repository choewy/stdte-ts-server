#!/bin/bash

source /home/ubuntu/release/profile

prefix=stdte-ts-product
image="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"

ports=(3001, 3002)

for (( i = 0; i < ${#ports[@]}; i++ )); do
  process=$(($i + 1))
  name="$prefix-$process"
  port=${ports[$i]}

  if [ "$(sudo docker container inspect --format '{{.Name}}' $name 2>&1)" == "/$name" ]; then
    sudo docker rm -f $name
  fi

  sudo docker run \
    --name $name -d \
    -e CONTAINER_PREFIX=$prefix \
    -e CONTAINER_PROCESS=$process \
    -p $port:3000 \
    -v /home/ubuntu/logs:/var/server/logs \
    --restart=always \
    $image
done

exit 0