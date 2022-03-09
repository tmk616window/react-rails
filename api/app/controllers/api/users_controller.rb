class Api::UsersController < ApplicationController
  def index
    cookies[:user_id] = 3
  end

  def show
    user = authenticate_user_with_token!(cookies[:token])
    if user.nil?
      render json: { message: 'unauthorized' }, status: :unauthorized
    else
      render json: {
        user: {
          id: user.id,
          name: user.name,
          emai: user.email
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
# curl -i -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MDUxMzAwfQ.CPINKsFZOF0aYK5cu9NizMnMHCbAep_GuaCSx2YDVzBgidsUNvxPxTWHK2MlGWJx4RfPLtZ6dzT5qNwTLPI6LMet_TBzy6RZhi0TGPMlJ-GXNbMrluifLeMApd6CcfNenFaDollLcc2tdTS2B7MOmHlLVpI8geW4w96En51vp-aPZRvO-c8PjQOS36uk7dn8b3SuTmCU3ZOjxjHuQAe8_VWiZmQkgKQVeIkAv5_aYOio31aXHYnfl_KMfxmzJzPqXDhTlzTltbT-8VrywCgX0R194szrQTaNVcTeHIuSrLNX7rGpegksVbys1NJ9EL46AliBbkTNa3XcTPDNRg' http://localhost:3000/api/user

# curl -i  -X POST -H "Content-Type: application/json" -d '{"user":{"name": user3, "email" : "user3", "password" : "user3", "password_confirmation": "user3" }}' localhost:3000/api/user
# curl -i  -X POST -H "Content-Type: application/json" -d '{"session":{ "email" : "user2", "password" : "user2" }}' localhost:3000/api/session