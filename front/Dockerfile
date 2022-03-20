FROM node:16

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update -qq && apt-get install -y
RUN apt update
RUN npm install
