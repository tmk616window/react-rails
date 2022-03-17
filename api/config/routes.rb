Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :tasks
    resource :session, only: %i[create destroy show]
    resources :ranking, only: %i[index]
    resources :pro_languages, only: [:index,  :create, :destroy]
    resources :tools, only: [:index, :create, :destroy]
    resources :contents, only: [:index, :update, :create, :destroy]
    resources :comments, only: [:index, :update, :create, :destroy]
    resources :likes, only: [:create, :destroy]
  end
end
