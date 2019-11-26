FROM nginx:alpine
ADD VERSION .

COPY default.conf /etc/nginx/conf.d/default.conf

COPY build /usr/share/nginx/html
