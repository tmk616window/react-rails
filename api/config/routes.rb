Rails.application.routes.draw do
  # root 'home#index'
  namespace :api do
    resources :users
    resource :session, only: %i[create destroy show]
  end
end
