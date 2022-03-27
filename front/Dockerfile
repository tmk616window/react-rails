FROM node:16

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD ./package.json $APP_ROOT/package.json

RUN apt-get update -qq && apt-get install -y
RUN apt update
RUN npm install
