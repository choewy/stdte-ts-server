#/bin/bash

docker run mysql:8.0\
  -d\
  -p 33061:3306\
  --name database\
  --env MYSQL_ALLOW_EMPTY_PASSWORD=true\
  --bind-address=0.0.0.0\
  --character-set-server=utf8mb4\
  --collation-server=utf8mb4_unicode_ci

exit 0