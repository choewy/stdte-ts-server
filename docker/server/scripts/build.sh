#!/bin/bash

IMAGE_NAME="$1"

if ! [ -d "build" ]; then
  mkdir build
fi

cp -r ../../dist build
cp ../../.env build

docker build -t $IMAGE_NAME . 

exit 0