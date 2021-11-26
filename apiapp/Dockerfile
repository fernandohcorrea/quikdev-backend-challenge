FROM node:14.18.0-alpine3.12

EXPOSE 4000-4004
EXPOSE 9229

ARG DK_UID
ARG DK_GID

ENV PORT=${PORT:-4000}
ENV NODE_ENV=${ENVIRONMENT:-'production'}

RUN apk update && apk upgrade

RUN apk add --update --no-cache autoconf \
    shadow

RUN usermod -u ${DK_UID:-1000} node

RUN groupmod -g ${DK_GID:-1000} node

RUN mkdir /application

COPY ./ /application

RUN chown node:node /application -R

USER node

WORKDIR '/application'

RUN yarn install

CMD [ "yarn", "start" ]
