# Frontend: Apache + PHP. Strony .php dołączają wspólne części (nagłówek, stopkę) przez include.
FROM php:8.4-apache

# mod_proxy – adresy /api/... przekazujemy do backendu
RUN a2enmod proxy proxy_http

COPY api.conf /etc/apache2/conf-enabled/api.conf
