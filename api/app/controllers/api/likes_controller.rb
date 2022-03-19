class Api::LikesController < ApplicationController

  def show
    like = Like.where(task_id: params[:id])
    render json: { like: like }
  end

  def create
    like = Like.new(like_params)
    if like.save
        render json: {like: like }
    else
      render json: { message: "作成に失敗しました" }
    end
  end

  def destroy
    like = Like.find(params[:id])
    like.destroy
    render json: { message: "削除しました"}
  end
  
  private
  def like_params
    params.require(:like).permit(:user_id, :task_id)
  end    
end
