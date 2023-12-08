#!/bin/bash

IMAGE_NAME="$1"

docker push $IMAGE_NAME

exit 0