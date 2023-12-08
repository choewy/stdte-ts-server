#/bin/bash

docker run\
  -d\
  -p 33061:3306\
  --name database\
  --env MYSQL_ALLOW_EMPTY_PASSWORD=true\
  database

exit 0