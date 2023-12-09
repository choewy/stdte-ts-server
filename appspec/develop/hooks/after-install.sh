#!/bin/bash

source /home/ubuntu/develop/profile

sudo docker login -u AWS -p $(aws ecr get-login-password) $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
sudo docker pull $IMAGE_PATH

exit 0