FROM node:16-alpine3.14

RUN mkdir -p /home/app

COPY . /home/app

ENV DEBUG="*"

CMD ["node", "/home/app/bin/www"]