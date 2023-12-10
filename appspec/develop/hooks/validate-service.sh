#!/bin/bash

source /home/ubuntu/develop/docker

loop=0
bootstrap=false

while [ $loop -le 5 ]
do
  ((loop++))

  status="$(curl --silent --head -X GET http://localhost:${REPLACE}/health | awk '/^HTTP/{print $2}')"

  if [ "$status" == "200" ]; then
    bootstrap=true
    break
  fi

  sleep 5s
done

if [ $bootstrap == false ]; then
  echo "fail bootstrap ${REPLACE}"
  exit 1
fi

container="$PREFIX-$ORIGIN"

if [ "$(sudo docker container inspect --format '{{.Name}}' $container 2>&1)" == "/${$container}" ]; then
  sudo docker rm -f $container
fi

if [ -d "/home/ubuntu/develop" ]; then
  rm -rf /home/ubuntu/develop
fi

sudo docker image prune -a --force

exit 0