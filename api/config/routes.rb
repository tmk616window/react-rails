Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :tasks
    resource :session, only: %i[create destroy show]
    resources :ranking, only: %i[index]
    resources :pro_languages, only: %i[create destroy]
    resources :tools, only: %i[create destroy]
    resources :contents, only: %i[show create update destroy]
    resources :comments, only: %i[show create update destroy]
    resources :likes, only: %i[show create destroy]
    resources :ranking, only: %i[index]
  end
end
