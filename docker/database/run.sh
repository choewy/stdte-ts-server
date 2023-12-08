#/bin/bash

docker build . -t database

docker run\
  -d\
  -p 33063:3306\
  --name database\
  --env MYSQL_ALLOW_EMPTY_PASSWORD=true\
  database

exit 0