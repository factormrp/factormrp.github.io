FROM nginx:alpine

COPY public /usr/share/nginx/html
COPY includes /usr/share/nginx/html/includes
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /usr/share/nginx/html/assets/images

CMD ["nginx", "-g", "daemon off;"]
