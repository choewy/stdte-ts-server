#/bin/bash

docker run\
  -d\
  -p 6380:6379\
  --name redis\
  redis

exit 0