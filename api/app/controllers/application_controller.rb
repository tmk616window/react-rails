class ApplicationController < ActionController::API
	include ActionController::Cookies
  class AuthenticationError < StandardError; end
  
	rescue_from AuthenticationError, with: :render_unauthorized_error

	def render_unauthorized_error
	  render json: { message: 'unauthorized' }, status: :unauthorized
	end

  def authenticate_user_password(email, password)
    user = User.find_by(email: email)&.authenticate(password)
    raise AuthenticationError if user.nil?

    return user
  end

	def authenticate_user_token(token)
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))
    begin
      decoded_token = JWT.decode(token, rsa_private, true, { algorithm: 'RS256' })
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError
      raise AuthenticationError
    end
    user_id = decoded_token.first["id"]
    puts decoded_token
    user = User.find(user_id)
    raise AuthenticationError if user.nil?

    return user
	end
  
  def get_token(email, password)
    user = authenticate_user_password(email, password)
    endoce_token(user)
  end

  private

  def endoce_token(user)
    payload = {
      name: user.email,
      id: user.id,
      exp: (DateTime.current + 14.days).to_i
    }
    rsa_private = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))
    return JWT.encode(payload, rsa_private, "RS256")
  end

  def authenticate_with_token
    raise AuthenticationError if unauthorized?
  end

  def authenticate_with_token
    raise AuthenticationError if unauthorized?
  end

  def current_user
    authenticate_user_token(cookies[:token])
  rescue AuthenticationError
    nil
  end

  def unauthorized?
    current_user.nil?
  end
end
