FROM httpd:latest

VOLUME [ "/backoffice-front:/usr/local/apache2/htdocs/" ]

EXPOSE 80
