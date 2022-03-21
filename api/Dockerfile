FROM ruby:2.7.1



RUN apt-get update -qq && apt-get install -y
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt-get install -y nodejs

# install yarn
RUN npm install --global yarn



RUN mkdir /app
ENV APP_ROOT /app
WORKDIR $APP_ROOT


RUN mkdir -p ./app/tmp/sockets && mkdir -p ./app/tmp/pids


ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

RUN gem install rubocop
RUN gem install openssl
RUN bundle config set force_ruby_platform true
RUN bundle install
