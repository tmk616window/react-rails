class Api::SessionsController < ApplicationController
  # include Authenticatable
  skip_before_action :authenticate_with_token, only: :create

  def show
    render json: {
      current_user: {
        id: current_user.id,
        name: current_user.name,
        email: current_user.email
      }
    }, status: :ok
  end

  def create
    token = get_token(session_params[:email], session_params[:password])
    render json: { token: token }
  end

  def destroy
    cookies.delete :token
    render json: {
      message: 'ログアウトしました'
    }, status: :ok
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
