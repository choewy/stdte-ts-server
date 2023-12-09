#!/bin/bash

if ! [ -d "/home/ubuntu/archive" ]; then
  mkdir /home/ubuntu/archive
fi

if ! [ -d "/home/ubuntu/archive/develop" ]; then
  mkdir /home/ubuntu/archive/develop
fi

if  [ -d "/home/ubuntu/develop" ]; then
  datetime=`date +%Y%m%d%H%M%S`
  mv /home/ubuntu/develop /home/ubuntu/archive/develop/$datetime
fi

sudo docker image prune -a --force

exit 0