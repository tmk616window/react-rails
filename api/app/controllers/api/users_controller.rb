class Api::UsersController < ApplicationController
  skip_before_action :authenticate_with_token, only: :create
  before_action :set_user, only: %i[show update destroy]

  def index; end

  def show
    render json: {
      user: {
        id: @user.id,
        name: @user.name,
        email: @user.email,
        live: @user.live,
        age: @user.age,
        details: @user.details,
        tasks: @user.tasks
      }
    }, status: :ok
  end

  def create
    user = User.new(user_params)
    if user.save
      token = get_token(user_params[:email], user_params[:password])
      cookies[:token] = token
      render json: { token: token }
    else
      render json: { errors: '保存できませんでした' }
    end
  end

  def update
    if @user.update(user_params)
      render json: {
        user: {
          id: @user.id,
          name: @user.name,
          email: @user.email,
          live: @user.live,
          age: @user.age,
          details: @user.details,
          tasks: @user.tasks
        }
      }, status: :ok
    else
      render json: { errors: '更新できませんでした' }
    end
  end

  def destroy
    @user.destroy
    render json: { message: '削除しました' }, status: :ok
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :details, :age, :live, :image)
  end

  def set_user
    @user = User.find(params[:id])
  end
end

# テスト用
# curl -i  -X POST -H "Content-Type: application/json" -d '{"name": "user", "email" : "user", "password" : "user", "password_confirmation": "user" }' http://localhost:8080/api/users
# curl -i  -X POST -H "Content-Type: application/json" -d '{"session":{"email":"user1", "password":"user1"}}' http://localhost:8080/api/session

# curl -X DELETE 'http://localhost/api/session' -H 'Content-Type:application/json;charset=utf-8' -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYWFhYWFhYWFhQGV4YW1wbGUuY29tIiwiaWQiOjI1LCJleHAiOjE2NDgzNzU1NDB9.SRcVbjrf6PD9wIDCuGwyd3GwaJlfvn9_0dpMeKmJ52xLGyk6FOx0MWpRxVwr9xOsi4unr93WdlThCohnESV2ZGPeCe2TCYJhEKeChMNVL6X0BhlLPrfL1Pr9KSImUFQdLOm_NcGNN7X7qD1vy4E65IZkkuZdT4TtyMLT8ck9gYSBb0tFlm27EzGxOmGtgYH5fp6vMe0drpvZOIQNP00P8q6nXG4jZfYDW610xMiItSi7L2aTUDxDwdAu_HTG-hLrdvoWy78tyoSJhv_m3q9S93G1NV5_875ADD53b2CuWybu17YRDce_5BgE8aybv81iPIZttLlNwSPR9dO74A'
# curl -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlciIsImlkIjozLCJleHAiOjE2NDg3NDE0MTN9.aOYI0eVnpl92ucGcSy_5XqWN3zPmELQDVnjXbFXl3ZjthLCsbFNEZVA0SET4nN9WxI0Zs5fXeu30Mjllvyr3Zklka8-Hl5Ef4iJLE_vDBi77lqJMpQb5EioNmjHsIC8a2WSBRw9v4OXnNYrWgdF6FKBb8uSJBQ1kPLFJriw3ioaJyXIaKUlegkRNn5_C09GSOuuqv3kwhFiAa9AUpvKPqblh1s8KRUHUKE45JoAdXvWC_3nfQvLnRxb1zHgMeFCcp_E0Z_RJjv85eBiXI3kQ6diHEXOU2svt1nwG3n6n1-Fi3zbxEwaNnYl5JMKkxWQV1UckR0rIBPqPjw3F2g' http://localhost:8080/api/tasks
# curl -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiZWVlZWVlZWVlQGV4YW1wbGUuY29tIiwiaWQiOjYsImV4cCI6MTY0ODk5Nzc3Mn0.fh06vPYpJWhDoQrcl4f2THQJo-aunQ95EwYnwrDoVVKQKIs9gmRFrs8BqCHO0Nm-fffMMWVQyWFC6JGYhBuMKKAjPd72N038qRjtwimAtyZR3nwcZ84ey-FtjXAyRTGQri-Q8kCw1rCi3ID56p9uPdlbuBSJteyEpHWzy9MnLbB7lTZHtgSR42DSdVbbQjhJuEUNVf4Mq0dYHpa45k8A5e1YKJMsN-NMhxGdQmeoYfgjvxMYeNNJiIriFTBaAsnXC_pDLZtheI-qfboaX2smVeNvRVx9zNMxk78VIvmsn3TCaKt5llCuQCWTzaNfV0-t6wgHS3Lq-vkk1Jo2EQ' http://localhost:8080/api/users/6

# curl -b 'token=eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoidXNlcjIiLCJpZCI6MiwiZXhwIjoxNjQ4MTk5Nzg4fQ.MFEa_uwtsafJo_us73ErqbLRa_pFrbsYaRHWn_ngVCLmeXjMsCbdvBw1Qwj0LcppopSAqSuQvVN9oR3XULLEcAp-qUQRoDwne-T94O6VBqUdMHtN8hGODGxfOMOT2nL2ZyD1Z4Pje2RO-UQJAxV2SUhCRwx5MJcleSubYxXAv4D5kX5bFjoUgmd4ez3Yb74jwmyeG5mETmBQ3u1j8IOfTfd4hmDGj8vBH9HB2MxVJH695m_QpdIrPzCtZXNTZz2zd8aYhFaBJqfjB_ii2HFJ7KCsWV3M-KMQcJ4WEUi8_UUg-693_Vo0OQbRe0qPF1Z_GIKj5RkD5W0uqZ_hLQ' -X GET -H 'Content-Type:application/json' http://localhost/api/user
