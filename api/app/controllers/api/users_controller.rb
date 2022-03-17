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
# curl -i  -X POST -H "Content-Type: application/json" -d '{"name": "user", "email" : "user", "password" : "user", "password_confirmation": "user" }' http://localhost:8080/api/users
# curl -i  -X POST -H "Content-Type: application/json" -d '{"session":{"email":"user", "password":"user"}}' http://localhost:8080/api/session

# curl -X DELETE 'http://localhost/api/session' -H 'Content-Type:application/json;charset=utf-8' -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYWFhYWFhYWFhQGV4YW1wbGUuY29tIiwiaWQiOjI1LCJleHAiOjE2NDgzNzU1NDB9.SRcVbjrf6PD9wIDCuGwyd3GwaJlfvn9_0dpMeKmJ52xLGyk6FOx0MWpRxVwr9xOsi4unr93WdlThCohnESV2ZGPeCe2TCYJhEKeChMNVL6X0BhlLPrfL1Pr9KSImUFQdLOm_NcGNN7X7qD1vy4E65IZkkuZdT4TtyMLT8ck9gYSBb0tFlm27EzGxOmGtgYH5fp6vMe0drpvZOIQNP00P8q6nXG4jZfYDW610xMiItSi7L2aTUDxDwdAu_HTG-hLrdvoWy78tyoSJhv_m3q9S93G1NV5_875ADD53b2CuWybu17YRDce_5BgE8aybv81iPIZttLlNwSPR9dO74A'
# curl -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlciIsImlkIjozLCJleHAiOjE2NDg3MDUyMDd9.E1UtvOeyjtdK1Qp-G9L8-blWCFkZQRMfaodhe1fv_o4GH8svd308pwEoo4q-aknBJf3eYhV9oEKEp8FEJ1QvMthuxutxqzMvDl6JY-TsWSYkB22s4byO-13zeBOCBZl3eFTPKu_XlffXn-hCCn2QYl8NQLsRnfb4VRHFohosC1SRf9OgtProxHmVModpKQ3Jq-dGOlOPL4QBGEX7Me-MJxqHewox1--DqSHHs0V38FmcnLSf2sE4RBuLKSJ6s1FOthemuTtEpr4_DUeFi-4F0hOzX2bUKnvvdHS_nKn85hclLx-FGBtCa9Bzi3TRUG6b9IX-aHcFxasXz08jLg' http://localhost:8080/api/tasks
# curl -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlciIsImlkIjozLCJleHAiOjE2NDg2Mjg2MTZ9.CNPEET9wi-bRAlutomHzTx3rCAxfOhrNB2rQtBKyoStJ089AsxHcGoEWdCWF9G7ovjC86UOGqRG_aYfM31J2A3Wo4tcpyv7H6MeXqkrPhy7Ist8OxYMArHhNn53EVDyfMDTh-hFpx47-_J6xX9rGWOyt9KxFBNQAheJ6Bo53_Ud5HBs3Xt1KutAcnvexB96Hk0i8YJqOufE42fQHJfUE2AQ8A0flHdljg-fFuUvRzmpi2EFk8c5s9b0zbuzWRYcm5eBHQLbrvuJjUmPqYImmiKszZrqvMQTbNMUpd0lauQ1NirYrT8P1TKJvYFcyS2Vk6brhSclwDSC3ksJ4xQ' http://localhost:8080/api/session

# curl -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MTk5Nzg4fQ.MFEa_uwtsafJo_us73ErqbLRa_pFrbsYaRHWn_ngVCLmeXjMsCbdvBw1Qwj0LcppopSAqSuQvVN9oR3XULLEcAp-qUQRoDwne-T94O6VBqUdMHtN8hGODGxfOMOT2nL2ZyD1Z4Pje2RO-UQJAxV2SUhCRwx5MJcleSubYxXAv4D5kX5bFjoUgmd4ez3Yb74jwmyeG5mETmBQ3u1j8IOfTfd4hmDGj8vBH9HB2MxVJH695m_QpdIrPzCtZXNTZz2zd8aYhFaBJqfjB_ii2HFJ7KCsWV3M-KMQcJ4WEUi8_UUg-693_Vo0OQbRe0qPF1Z_GIKj5RkD5W0uqZ_hLQ' -X GET -H 'Content-Type:application/json' http://localhost/api/user