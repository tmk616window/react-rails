class Api::RankingController < ApplicationController
  skip_before_action :authenticate_with_token
  def index
    taskRank = Task.taskRankingTop3
    render json: { tasks: taskRank },
           include: [:pro_languages.as_json(only: [:language]), :user.as_json(only: [:email])]
  end
end
