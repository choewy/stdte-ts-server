#!/bin/bash

if ! [ -d "/home/ubuntu/archive" ]; then
  mkdir /home/ubuntu/archive
fi

if ! [ -d "/home/ubuntu/archive/release" ]; then
  mkdir /home/ubuntu/archive/release
fi

if  [ -d "/home/ubuntu/release" ]; then
  datetime=`date +%Y%m%d%H%M%S`
  mv /home/ubuntu/release /home/ubuntu/archive/release/$datetime
fi

sudo docker image prune -a --force

exit 0