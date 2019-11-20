FROM mysql

ENV MYSQL_ROOT_PASSWORD temp
ENV MYSQL_DATABASE db
ENV MYSQL_USER temp
ENV MYSQL_PASSWORD temp

COPY init.sql /docker-entrypoint-initdb.d/
