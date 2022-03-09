class Api::UsersController < ApplicationController
  before_action :authenticate_with_token, only: :show
  
  def show
    user = authenticate_user_token(cookies[:token])
    if user.nil?
      render json: { message: 'unauthorized' }, status: :unauthorized
    else
      render json: {
        user: {
          id: current_user.id,
          name: current_user.name,
          emai: current_user.email
        }
      }, status: :ok
    end
  end

  def create
    user = User.new(user_params)
    user.save!
    # render json: user, serializer: UserSerializer
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end

# テスト用
# curl -i -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MDUzNTM3fQ.ECGiD83GFjkxJU92SkzrXqv1hVQgp3CjBAP4ZNf_QVGOnGESXF4ZoPuM621HnH9U_j6S0JZfSc4NWcNtI5aoI9YPfTJxv99IyY_Sv9WHx11MXycSG8ZBtFZzRWeMsKxPXyY_5RswlTZhjvkLvGRghB0QuGKp7GQ1OWC7TMcjSkEhMteU734wFEx3VGObrSlV5J8uruIflULtpklOfVzR0yFA3_DU4kFNeOhfOe3FI88J_JyIox3nlTwKKwwzB6uSERwf-AoY5UBKqwMJr_U6sBfUePt88Rba1gllYxaGR6_WHiKJwk6ASZrbSPUOWuUBOdiB8s3RXAC4Yo-cbg' http://localhost:3000/api/user
# curl -i  -X POST -H "Content-Type: application/json" -d '{"user":{"name": user3, "email" : "user3", "password" : "user3", "password_confirmation": "user3" }}' localhost:3000/api/user
# curl -i  -X POST -H "Content-Type: application/json" -d '{"session":{ "email" : "user2", "password" : "user2" }}' localhost:3000/api/session