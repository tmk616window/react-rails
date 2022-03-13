class Api::SessionsController < ApplicationController
  before_action :authenticate_with_token, except: :create

  def show
    render json: {
        id: @current_user.id,
        name: @current_user.name,
        email: @current_user.email
    }, status: :ok

  end
  def create
    token = get_token(session_params[:email], session_params[:password])
    cookies[:token] = token
    render json: { token: token} 
  end

  def destroy
    cookies.delete :token
    render json: {
      message: "ログアウトしました"
    }, status: :ok
  end
  private
  
  def session_params
    params.require(:session).permit(:email, :password)
  end
end 
