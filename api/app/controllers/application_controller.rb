class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::HttpAuthentication::Token
  class AuthenticationError < StandardError; end
  rescue_from AuthenticationError, with: :render_unauthorized_error
  before_action :authenticate_with_token

  def render_unauthorized_error
    render json: { message: 'unauthorized' }, status: :unauthorized
  end

  def authenticate_user_password(email, password)
    user = User.find_by(email: email)&.authenticate(password)
    raise AuthenticationError if user.nil?

    user
  end

  def authenticate_user_token(token)
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))
    begin
      decoded_token = JWT.decode(token, rsa_private, true, { algorithm: 'RS256' })
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
      raise AuthenticationError
    end
    user_id = decoded_token.first['id']
    user = User.find(user_id)
  end

  def get_token(email, password)
    user = authenticate_user_password(email, password)
    endoce_token(user)
  end

  def current_user
    current_user = authenticate_user_token(access_token)
  rescue AuthenticationError
    nil
  end

  private

  def endoce_token(user)
    payload = {
      name: user.email,
      id: user.id,
      exp: (DateTime.current + 14.days).to_i
    }
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))
    JWT.encode(payload, rsa_private, 'RS256')
  end

  def authenticate_with_token
    raise AuthenticationError if unauthorized
  end

  def unauthorized
    current_user.nil?
  end

  def access_token
    token_and_options(request)&.first
  end
end
