FROM nginx:alpine

# Copy the website files and the Nginx configuration
COPY public /usr/share/nginx/html
COPY includes /usr/share/nginx/html/includes
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY certs /etc/nginx/certs

RUN mkdir -p /usr/share/nginx/html/assets/images

CMD ["nginx", "-g", "daemon off;"]
