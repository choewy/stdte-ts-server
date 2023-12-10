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

if [ $bootstrap == true ]; then
  echo "success bootstrap ${REPLACE}"

  container="$PREFIX-$ORIGIN"

  if [ "$(sudo docker container inspect --format '{{.Name}}' $container 2>&1)" == "/$container" ]; then
    sudo docker rm -f $container
  fi

  if [ -d "/home/ubuntu/develop" ]; then
    rm -rf /home/ubuntu/develop
  fi
fi

if [ $bootstrap == false ]; then
  echo "fail bootstrap ${REPLACE}"

  container="$PREFIX-$REPLACE"

  if [ "$(sudo docker container inspect --format '{{.Name}}' $container 2>&1)" == "/$container" ]; then
    sudo docker rm -f $container
  fi
fi

sudo docker image prune -a --force

exit 0