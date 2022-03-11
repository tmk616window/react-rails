class Api::SessionsController < ApplicationController
  before_action :authenticate_with_token, except: :create
  def create
    token = get_token(session_params[:email], session_params[:password])
    cookies[:token] = token
    render json: { token: token} 
  end

  def destroy
    cookies.delete :token
  end
  private
  
  def session_params
    params.require(:session).permit(:email, :password)
  end
end 
