class Api::LikesController < ApplicationController

  def show
    task_likes = Like.where(task_id: params[:id])
    current_user_like = task_likes.where(user_id: current_user.id)
    render json: {current_user_like:  current_user_like.ids,is_like: current_user_like.exists? }
  end

  def create
    like = Like.new(like_params)
    if like.save 
        render json: {like: like }
    else
      render json: { message: "作成に失敗しました"}
    end
  end

  def destroy
    like = Like.find(params[:id])
    like.destroy
    render json: { message: "削除しました"}
  end

  def is_like?
    task_likes = Like.where(task_id: params[:id])
    current_user_like = task_likes.where(user_id: current_user.id)
    current_user_like.exists?
  end

  private
  def like_params
    params.require(:like).permit(:user_id, :task_id)
  end    
end
