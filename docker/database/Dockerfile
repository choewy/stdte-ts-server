FROM mysql:8.0

EXPOSE 3306

ADD ./mysql.conf /etc/mysql/conf.d/my.cnf

RUN touch /docker-entrypoint-initdb.d/init.sql
RUN echo "SET GLOBAL time_zone='Asia/Seoul';" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "SET time_zone='Asia/Seoul';" >> /docker-entrypoint-initdb.d/init.sql
RUN echo "CREATE DATABASE IF NOT EXISTS test;" >> /docker-entrypoint-initdb.d/init.sql

CMD ["mysqld"]