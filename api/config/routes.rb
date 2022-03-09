Rails.application.routes.draw do
  # root 'home#index'
  namespace :api do
    resource :user, only: [:show, :create]
    get  "users"  => "users#index"
    resource :session, only: %i[create destroy]
  end
  
end