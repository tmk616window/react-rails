class Api::UsersController < ApplicationController
  before_action :authenticate_with_token, except: :create
  
  def show
      user = User.find(1)
      render json: {
        user: {
          id: user.id,
          name: user.name,
          emai: user.email
        }
      }, status: :ok
  end

  def create
    user = User.new(user_params)
    if user.save
      token = get_token(user_params[:email], user_params[:password])
      cookies[:token] = token
      render json: { token: token} 
    else
      render json: { errors: "保存できませんでした"} 
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end

# テスト用
# curl --head 'Bearer　eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MjAyNzUyfQ.hf0bNgKf5vumiRqP7mZbsXPXsnbqSqmFmG3QK5mLPZB7-Xe_0arbsfzFEspDjQtvHeSLz2C4hcECWo4_8czly8gMrFr_eZwK1lCjtXw38huc7KCO2wI5InQQMxgAJLgE3nyJKmLsUAyvDPolPiHocuTGA-chgC8TlEe38yDqQDQdS9pJBNR73msIIYJY11PB0pV6QOKXkTNlix4au51ntVrziIn0EQ5fsK6_i9tn-3xjTLd5np08uIchiskUUksghmJqptULxlnALr3Y08N1D9XPyfWSAHoQTrnp3JXRWTFtAn3pl56EUAItjlm2oODw4cEo9HNzEpiwhAjSKA' http://localhost:3000/api/user
# curl -i  -X POST -H "Content-Type: application/json" -d '{"user":{"name": user3, "email" : "user3", "password" : "user3", "password_confirmation": "user3" }}' localhost:3000/api/user
# curl -i  -X POST -H "Content-Type: application/json" -d '{"session":{ "email" : "user2", "password" : "user2" }}' localhost:3000/api/session

# curl -H GET 'http://localhost:3000/api/users' -H 'Content-Type:application/json;charset=utf-8' -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MjEyOTAyfQ.mjgf3EUtXFezCurYW5xF0eXh-zCapCOhyE2IpWbPZI1AFyWNLGd-qGEORJTXSiNbacFEAREnr8RacO6YXlhuF5oGH-thw1UN8dvheEgPqFLDBpEwyzy2iPoyjLX_4mc7TXGxL8BS2-qAALDrinh9aIDHJnOGz8eCygh-SLfdFnAzG-QYSAGj4613M3KnMNaSMBrdkbPN6y7GAVzCAD6cmgRqkzRnLB2oTiHicLdFo7KL048-7_viSyDePDUtlSri8y5F0-b1bY8jZPX9xw9Ocg69nFxvCVW5LV7Xeo8K_4rRXk4gIia1XCqyRX1RjTOGAG4fbXp6baORu_5jkg'
# curl -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MjA1NTYwfQ.X6c_7lfbZS6JoTLtkHuKkBZrGhR82_2cjeinR3078nDZtGMAI82f43dRMlJT8BtQOKnEtPxuxitviiLK4M8joK6MCVHNuHury1EK0MfMrpa5byw3uLRKVtV-HSBBMb4fkfsTWtT00jFcuPbg1zM3STGQgWEjMrt3qbD8WZYCM93KJqQGx9Bey6HldX0tZnoUf-hFYSFhgIdH__Vn6cXA_R_veejog5vqz2I0TVXs981_X2Ef8SKRa-Z5JRjgXv0NJf1E2KK-td95bxV5JsAhH3VJRVPUqcK1BXdHG1sGSFuc6bPtp4-Byuz7ueX61VjpFhqGDl4-c-ayI_5deQ' http://localhost:3000/api/user



# curl -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MTk5Nzg4fQ.MFEa_uwtsafJo_us73ErqbLRa_pFrbsYaRHWn_ngVCLmeXjMsCbdvBw1Qwj0LcppopSAqSuQvVN9oR3XULLEcAp-qUQRoDwne-T94O6VBqUdMHtN8hGODGxfOMOT2nL2ZyD1Z4Pje2RO-UQJAxV2SUhCRwx5MJcleSubYxXAv4D5kX5bFjoUgmd4ez3Yb74jwmyeG5mETmBQ3u1j8IOfTfd4hmDGj8vBH9HB2MxVJH695m_QpdIrPzCtZXNTZz2zd8aYhFaBJqfjB_ii2HFJ7KCsWV3M-KMQcJ4WEUi8_UUg-693_Vo0OQbRe0qPF1Z_GIKj5RkD5W0uqZ_hLQ' -X GET -H 'Content-Type:application/json' http://localhost:3000/api/user