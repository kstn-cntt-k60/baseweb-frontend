FROM nginx:1.18.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY build/index.html build/*.js /usr/share/nginx/html/
