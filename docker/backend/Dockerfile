# Backend: Apache + PHP 8.4 z rozszerzeniem mysqli
FROM php:8.4-apache

RUN docker-php-ext-install mysqli

# Większe limity wysyłania plików – quiz może mieć dużo zdjęć naraz
RUN { \
      echo 'upload_max_filesize = 5M'; \
      echo 'post_max_size = 100M'; \
      echo 'max_file_uploads = 64'; \
      echo 'date.timezone = Europe/Warsaw'; \
    } > /usr/local/etc/php/conf.d/quizownia.ini
