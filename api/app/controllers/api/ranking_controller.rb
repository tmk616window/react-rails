class Api::RankingController < ApplicationController
  def index
    taskRank = Task.taskRankingTop3
    render json: {task: taskRank},status: ok,include: [:pro_languages.as_json(only: [:language]), :user.as_json(only: [:email])]
  end
end