FROM mongo:5.0.3

EXPOSE 27017

ARG DK_UID
ARG DK_GID

RUN usermod -u ${DK_UID:-1000} mongodb
RUN groupmod -g ${DK_GID:-1000} mongodb

CMD ["mongod", "--bind_ip_all"]
