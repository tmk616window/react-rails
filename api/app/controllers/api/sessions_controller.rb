class Api::SessionsController < ApplicationController
  def create
		user = User.find_by(email: session_params[:email])
    if user && user.authenticate(session_params[:password])
			puts "成功"
			render json: user
    else
			puts "失敗"
			a = { id:2, nickname: "失敗", age: 22 }
			render json: a	
    end
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end 


# curl -X POST -H "Content-Type: application/json" -d '{"session":{ "email" : "user2", "password" : "user2" }}' localhost:3000/api/session
