class Api::LikesController < ApplicationController
  def create
    like = Like.new(like_params)
    if like.save
        render json: {like: like }, status: ok
    else
        render json: {message: like.errors }, status: error
    end
  end

  def destroy
    like = Like.find(params[:id])
    if like.destroy
        render json: status: ok
    else
        render json: status: error
    end
  end

  private
  def like_params
     params.require(:like).permit(:user_id, :task_id)
  end    
end
