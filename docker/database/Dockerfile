FROM mysql:8.0

EXPOSE 3306

RUN touch /docker-entrypoint-initdb.d/init.sql
RUN echo "CREATE DATABASE IF NOT EXISTS test;" >> /docker-entrypoint-initdb.d/init.sql

CMD ["mysqld"]