FROM nginx:alpine

COPY public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /usr/share/nginx/html/assets/images

CMD ["nginx", "-g", "daemon off;"]
