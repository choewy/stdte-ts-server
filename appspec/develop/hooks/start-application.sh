#!/bin/bash

source /home/ubuntu/develop/profile

image="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"

prefix=stdte-ts-develop
ports=(3000 3001)

origin_port=-1

for (( i = 0; i < ${#ports[@]}; i++ )); do
  port=${ports[$i]}
  name="$prefix-$port"

  if [ "$(sudo docker container inspect --format '{{.Name}}' $name 2>&1)" == "/$name" ]; then
    origin_port=$port
    ports=${ports[@]/$origin_port}
    break
  fi
done

replace_port=${ports[0]}
replace_name="$prefix-$replace_port"

sudo docker run \
  --name $replace_name -d \
  -e CONTAINER_PREFIX=$prefix \
  -e CONTAINER_PROCESS=$replace_port \
  -p $replace_port:3000 \
  -v /home/ubuntu/logs:/var/server/logs \
  --restart=always \
  $image

loop=0
bootstrap=false

while [ $loop -le 10 ]
do
  ((loop++))

  status="$(curl --silent --head -X GET http://localhost:$replace_port | awk '/^HTTP/{print $2}')"

  if [ "$status" == "200" ]; then
    echo "succss bootstrap(loop : $loop)"
    bootstrap=true
    break
  fi

  sleep 5s
done

if [ $bootstrap == false ]; then
  echo "fail bootstrap $replace_name"
  exit 1
fi

origin_name="$prefix-$origin_port"

if [ "$(sudo docker container inspect --format '{{.Name}}' $origin_name 2>&1)" == "/$origin_name" ]; then
  sudo docker rm -f $origin_name
fi

sudo docker image prune -a --force

if [ -d "home/ubuntu/develop" ]; then
  rm -rf home/ubuntu/develop
fi

exit 0