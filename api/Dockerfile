FROM ruby:2.7.1

# RUN apt-get update -qq && \
#     apt-get install -y build-essential \ 
#     libpq-dev \        
#     nodejs \
#     && rm -rf /var/lib/apt/lists/* 


RUN apt-get update -qq && apt-get install -y
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt-get install -y nodejs

# install yarn
RUN npm install --global yarn



RUN mkdir /app
ENV APP_ROOT /app
WORKDIR $APP_ROOT

ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

# RUN gem install nokogiri --platform=ruby
RUN bundle config set force_ruby_platform true
RUN bundle install





# FROM ruby:3.0
# RUN apt-get update -qq && apt-get install -y
# WORKDIR /

# # install nodejs(LTS)
# RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt-get install -y nodejs

# # install yarn
# RUN npm install --global yarn

# RUN mkdir /myapp
# # コンテナ内にmyappディレクトリを作成

# WORKDIR /myapp
# # 作成したmyappディレクトリを作業用ディレクトリとして設定

# COPY Gemfile /myapp/Gemfile
# COPY Gemfile.lock /myapp/Gemfile.lock
# # ローカルの Gemfile と Gemfile.lock をコンテナ内のmyapp配下にコピー

# RUN bundle install
# # コンテナ内にコピーした Gemfile の bundle install
