class Api::UsersController < ApplicationController
  def index
    cookies[:user_id] = 2
  end

  def show
    # CookieからJWTを取得
    token = cookies[:token]

    # 秘密鍵の取得
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))

    # JWTのデコード。JWTからペイロードが取得できない場合は認証エラーにする
    begin
      decoded_token = JWT.decode(token, rsa_private, true, { algorithm: 'RS256' })
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
      return render json: { message: 'unauthorized' }, status: :unauthorized
    end

    # subクレームからユーザーIDを取得
    user_id = decoded_token.first["id"]

    # ユーザーを検索
    user = User.find(user_id)

    # userが取得できた場合はユーザー情報を返す、取得できない場合は認証エラー
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
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end

# テスト用
# curl -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MDQxNDIwfQ.kMjA4pfLpt1LkMwgjBmjd_1X7w6GSIBAygB_ohK0ipOZYKRqEEoFspsxd4Jk_MGN7PfGChhnyJ1tERDkJthWzFYNkBYrNPIki2Xg2CBF2rpBPOjMuwDoXBQfUIim_Ns2u-7c8TA97I1zPi8pRBshxYE-8zyh2AUqtKbxPGtlV8TCMLflgn0EYl8j13Mqoh2sy2ArZdKqEbAilGmruMkGgMWqMWgYKftdgS6dZgDtI3EewcLa65YizCZ3ESNQSvJO_0AAchJXNnmI4QrLcjRwdFBIJgnSAQjhYqeHE7by8KCLCp916ki_jAAyNxU1wrBfTUr45mA3gwhNRtQNG8GeIQ' http://localhost:3001/api/user

