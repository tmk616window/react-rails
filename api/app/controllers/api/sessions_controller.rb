class Api::SessionsController < ApplicationController
  def create    
    user = User.find_by(email: session_params[:email])
    if user && user.authenticate(session_params[:password])

      payload = {
        name: user.name,
        id: user.id,
        exp: (DateTime.current + 14.days).to_i # JWTの有効期限
      }
      rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

      # JWTの作成
      token = JWT.encode(payload, rsa_private, "RS256")
      puts "成功"
      puts "成功"
      puts "成功"
      puts "成功"
      puts "成功"
      puts "成功"
      puts "成功"
      puts token
      # JWTをCookieにセット
      cookies[:token] = token
      cookies[:user_name] = "david"  
      render status: :created
			# render json: { id:2, token: token, age: 22 }
    else
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
