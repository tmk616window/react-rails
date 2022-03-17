class Api::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: {comment: comment }, status: ok
    else
      render json: {message: "commentの作成に失敗しました" }, status: error
    end
  end

  def update
    comment = Comment.find(params[:id])
    if comment.update(comment_params)
      render json: {comment: comment }, status: ok
    else
      render json: {message: "commentの作成に失敗しました" }, status: error
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: { comment: comment }, status: ok
    else
      render json: {message: "commentの削除に失敗しました" }, status: error
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:text, :task_id, :user_id)
  end
end