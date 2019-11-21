FROM mysql

# ENV MYSQL_ROOT_PASSWORD expired
ENV MYSQL_DATABASE db
ENV MYSQL_USER coffee
# ENV MYSQL_PASSWORD temp

COPY init.sql /docker-entrypoint-initdb.d/
