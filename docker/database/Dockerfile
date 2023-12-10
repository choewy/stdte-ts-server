FROM mysql:8.0

EXPOSE 3306

ADD ./mysql.conf /etc/mysql/conf.d/my.cnf

RUN touch /docker-entrypoint-initdb.d/init.sql

RUN echo "CREATE DATABASE IF NOT EXISTS stdte-ts-test;" >> /docker-entrypoint-initdb.d/init.sql

CMD ["mysqld"]