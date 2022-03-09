class Api::SessionsController < ApplicationController
  def create   
    token = get_token(session_params[:email], session_params[:password])
    cookies[:token] = token
    render status: :created
  end

  def destroy

  end
  private
  
  def session_params
    params.require(:session).permit(:email, :password)
  end
end 
