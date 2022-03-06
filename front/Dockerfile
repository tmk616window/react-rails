FROM node:16

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

# RUN npm install
RUN apt update && npm install
# npm i g node-gyp