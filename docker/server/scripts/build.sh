#!/bin/bash

IMAGE_NAME="$1"

if [ -d "build" ]; then
  rm -rf build
fi

mkdir build

cp -r ../../package* build
cp -r ../../dist build
cp ../../.env build

docker build -t $IMAGE_NAME . 

exit 0