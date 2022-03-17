class Api::RankingController < ApplicationController
  def index
    taskRank = Task.taskRankingTop3
    render json: {status: 200,  task: taskRank},include: [:pro_languages.as_json(only: [:language]), :user.as_json(only: [:email])]
  end
end