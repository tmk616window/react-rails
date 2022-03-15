class Api::UsersController < ApplicationController
  skip_before_action :authenticate_with_token, only: :create
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
# curl -i  -X POST -H "Content-Type: application/json" -d '{"user":{"name": user3, "email" : "user3", "password" : "user3", "password_confirmation": "user3" }}' localhost/api/user
# curl -i  -X POST -H "Content-Type: application/json" -d '{"session":{"name": "user5", "email" : "user5", "password" : "user5"}}' localhost/api/session

# curl -X DELETE 'http://localhost/api/session' -H 'Content-Type:application/json;charset=utf-8' -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYWFhYWFhYWFhQGV4YW1wbGUuY29tIiwiaWQiOjI1LCJleHAiOjE2NDgzNzU1NDB9.SRcVbjrf6PD9wIDCuGwyd3GwaJlfvn9_0dpMeKmJ52xLGyk6FOx0MWpRxVwr9xOsi4unr93WdlThCohnESV2ZGPeCe2TCYJhEKeChMNVL6X0BhlLPrfL1Pr9KSImUFQdLOm_NcGNN7X7qD1vy4E65IZkkuZdT4TtyMLT8ck9gYSBb0tFlm27EzGxOmGtgYH5fp6vMe0drpvZOIQNP00P8q6nXG4jZfYDW610xMiItSi7L2aTUDxDwdAu_HTG-hLrdvoWy78tyoSJhv_m3q9S93G1NV5_875ADD53b2CuWybu17YRDce_5BgE8aybv81iPIZttLlNwSPR9dO74A'
# curl -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYWFhYWFhYWFhQGV4YW1wbGUuY29tIiwiaWQiOjIsImV4cCI6MTY0ODU0NDY3OX0.Ewp5M91VGmWtK5Tvf6ujbL4X0l0_orsMFbCia4FYPo00DR13aWyj1CLEzvxRqrrw4t95KcMAbXmkaoRxCdYytdsyf1m6t63XBP4S0bNP6HVaM9Tfhl_Is2Luuq5ydnag8PPzKWp-rJ_bjvkdEkuh6j1hCfqNhjQjwXTr0NYjjbh9qzIRqUlt4ARVLnjfXy041kYy-KifLgot69lYN45QriO_ACB6u5ybMsAKlLsIleZf51HvmoYgCT5YWcs_7l5Q-MbxcNJ2ZpOaL_exisqlXtXMKoEuBjlFz8rL_BY6c0sgpxvuy5ZC69n8ZjzAWYFJNUcuP02DV8Ai7BRHwg' http://localhost/api/tasks


# curl -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MTk5Nzg4fQ.MFEa_uwtsafJo_us73ErqbLRa_pFrbsYaRHWn_ngVCLmeXjMsCbdvBw1Qwj0LcppopSAqSuQvVN9oR3XULLEcAp-qUQRoDwne-T94O6VBqUdMHtN8hGODGxfOMOT2nL2ZyD1Z4Pje2RO-UQJAxV2SUhCRwx5MJcleSubYxXAv4D5kX5bFjoUgmd4ez3Yb74jwmyeG5mETmBQ3u1j8IOfTfd4hmDGj8vBH9HB2MxVJH695m_QpdIrPzCtZXNTZz2zd8aYhFaBJqfjB_ii2HFJ7KCsWV3M-KMQcJ4WEUi8_UUg-693_Vo0OQbRe0qPF1Z_GIKj5RkD5W0uqZ_hLQ' -X GET -H 'Content-Type:application/json' http://localhost/api/user