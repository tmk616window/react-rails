class Api::UsersController < ApplicationController
  before_action :authenticate_with_token, except: :create
  def index; end
  
  def show
      user = User.find(params[:id])
      render json: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
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

# curl -H GET 'http://localhost:3000/api/users/1' -H 'Content-Type:application/json;charset=utf-8' -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MjI2ODE3fQ.c_nA9iJyqzK51Z_WNvwkVHNwjVel3vWH4kyUWwkM_PjSdBLi58VeMDSBjp_3xM1XKt4bYCyet9KQj6HE7jCw40M5aCVtXaIaaZZ6DlpeU5Tzuy8FyhF0Zm4U-V2ggZpVdOlgmhs51by21XtmWqmpO_aRM97oerJL3tN1Dmj8A8mfx_8qEwsMNHXWA0jRsWtKhubFggyqZn-1BnRdCxXmygAuRXEhqMleMML0I5vmRc1FyfEzS1OchwLtHUh0_-6i7HfYp22h1aXLZcq7VhXQ-aQrnirUaTNZuotJRveNwhm2Bn1E3BuVjqObiS0APar0dAciNszfPHtdS8518g'
# curl -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MjE1MDEzfQ.Pw-zezjntmRSxQmy9mPhl072RtpFmfmJKFpnwFA-bn6JKbLxEZMKntivKwe3f6J1PaL5zbTmUq0_Zg3fYYtf1vjBC4bA_7DH3fG70ZUzTHsjGtHF-b5WHUQYWkCE2YN3MEaF80Cx27by9KyifTevdqOOPzwWcY94EPu1c_XZ2wvduS-mgyOpMtlQiIAp7yF_DEJQJ25HuFTxJ8MrBQx-pWRBAUzzZdy9giXRqROtDer-h0qOxXAYwfjKT3Z4BKx8C0HSPcSR_J_mE-VMyu_dQ4Iird7mzMikPwtT7fOFV6BTDZUOxMWK7E6qua3mOkCZlFjC1hbV9tvyLMZPZw' http://localhost:3000/api/users


# curl -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MTk5Nzg4fQ.MFEa_uwtsafJo_us73ErqbLRa_pFrbsYaRHWn_ngVCLmeXjMsCbdvBw1Qwj0LcppopSAqSuQvVN9oR3XULLEcAp-qUQRoDwne-T94O6VBqUdMHtN8hGODGxfOMOT2nL2ZyD1Z4Pje2RO-UQJAxV2SUhCRwx5MJcleSubYxXAv4D5kX5bFjoUgmd4ez3Yb74jwmyeG5mETmBQ3u1j8IOfTfd4hmDGj8vBH9HB2MxVJH695m_QpdIrPzCtZXNTZz2zd8aYhFaBJqfjB_ii2HFJ7KCsWV3M-KMQcJ4WEUi8_UUg-693_Vo0OQbRe0qPF1Z_GIKj5RkD5W0uqZ_hLQ' -X GET -H 'Content-Type:application/json' http://localhost:3000/api/user