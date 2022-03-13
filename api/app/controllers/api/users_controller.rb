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
# curl --head 'Bearer　eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MzA5ODgyfQ.UYb0FQUSvqE_7LEUm-3zZxqa5Ix4k4VM_FGKccguD1JO900lrdHOXoN5AmPh8zHrq5o6UpKYpePDetUAhwSmwjdotjaaUt0JeO-YXX6fo6WjxGf9FpNWU4ODSXoXl7mZjp6Di33z1l_iLEGw00cVodYD5N4RLstDSE1u7DOreICp0neDDbXfpwn8TnMrEmg7sQPjj_RS11XkZEvrOt93n-PleR95cO0KWc4He0og8W4MAURHCE8-Cy54fZ2W8BnyBR1TdEwZ89iqU27825k-fOt6NjepKwQGsx4UZr_UgaehbqBSbZ7mph0kEvfSSe-8HwgXt_0qQvx7HF1FUg' http://localhost:3000/api/session
# curl -i  -X POST -H "Content-Type: application/json" -d '{"user":{"name": user3, "email" : "user3", "password" : "user3", "password_confirmation": "user3" }}' localhost:3000/api/user
# curl -i  -X POST -H "Content-Type: application/json" -d '{"session":{ "email" : "user2", "password" : "user2" }}' localhost:3000/api/session

# curl -X DELETE 'http://localhost:3000/api/session' -H 'Content-Type:application/json;charset=utf-8' -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYWFhYWFhYWFhQGV4YW1wbGUuY29tIiwiaWQiOjI1LCJleHAiOjE2NDgzNzU1NDB9.SRcVbjrf6PD9wIDCuGwyd3GwaJlfvn9_0dpMeKmJ52xLGyk6FOx0MWpRxVwr9xOsi4unr93WdlThCohnESV2ZGPeCe2TCYJhEKeChMNVL6X0BhlLPrfL1Pr9KSImUFQdLOm_NcGNN7X7qD1vy4E65IZkkuZdT4TtyMLT8ck9gYSBb0tFlm27EzGxOmGtgYH5fp6vMe0drpvZOIQNP00P8q6nXG4jZfYDW610xMiItSi7L2aTUDxDwdAu_HTG-hLrdvoWy78tyoSJhv_m3q9S93G1NV5_875ADD53b2CuWybu17YRDce_5BgE8aybv81iPIZttLlNwSPR9dO74A'
# curl -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MjE1MDEzfQ.Pw-zezjntmRSxQmy9mPhl072RtpFmfmJKFpnwFA-bn6JKbLxEZMKntivKwe3f6J1PaL5zbTmUq0_Zg3fYYtf1vjBC4bA_7DH3fG70ZUzTHsjGtHF-b5WHUQYWkCE2YN3MEaF80Cx27by9KyifTevdqOOPzwWcY94EPu1c_XZ2wvduS-mgyOpMtlQiIAp7yF_DEJQJ25HuFTxJ8MrBQx-pWRBAUzzZdy9giXRqROtDer-h0qOxXAYwfjKT3Z4BKx8C0HSPcSR_J_mE-VMyu_dQ4Iird7mzMikPwtT7fOFV6BTDZUOxMWK7E6qua3mOkCZlFjC1hbV9tvyLMZPZw' http://localhost:3000/api/users


# curl -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MTk5Nzg4fQ.MFEa_uwtsafJo_us73ErqbLRa_pFrbsYaRHWn_ngVCLmeXjMsCbdvBw1Qwj0LcppopSAqSuQvVN9oR3XULLEcAp-qUQRoDwne-T94O6VBqUdMHtN8hGODGxfOMOT2nL2ZyD1Z4Pje2RO-UQJAxV2SUhCRwx5MJcleSubYxXAv4D5kX5bFjoUgmd4ez3Yb74jwmyeG5mETmBQ3u1j8IOfTfd4hmDGj8vBH9HB2MxVJH695m_QpdIrPzCtZXNTZz2zd8aYhFaBJqfjB_ii2HFJ7KCsWV3M-KMQcJ4WEUi8_UUg-693_Vo0OQbRe0qPF1Z_GIKj5RkD5W0uqZ_hLQ' -X GET -H 'Content-Type:application/json' http://localhost:3000/api/user