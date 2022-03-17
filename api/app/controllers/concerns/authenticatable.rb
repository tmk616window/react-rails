module Authenticatable
  def authenticate_with_token
    raise AuthenticationError if unauthorized
  end

  def current_user
    begin
      current_user = authenticate_user_token(access_token)
    rescue AuthenticationError
      nil
    end
  end

  def unauthorized?
    current_user.nil?
  end
end
