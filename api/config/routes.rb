Rails.application.routes.draw do
  namespace :api do
    resources :users
    resources :tasks
    resource :session, only: %i[create destroy show]
  end
end
