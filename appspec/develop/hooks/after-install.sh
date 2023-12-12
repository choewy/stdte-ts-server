#!/bin/bash

source /home/ubuntu/develop/profile

sudo docker login -u AWS -p $(aws ecr get-login-password) $REGISTRY
sudo docker pull $IMAGE_PATH

docker="/home/ubuntu/develop/docker"

image_id="$(sudo docker images --filter=reference=*/$IMAGE_NAME --format "{{.ID}}")"
prefix=stdte-ts-develop

echo "PREFIX=$prefix" >> $docker
echo "IMAGE_ID=$image_id" >> $docker

exit 0