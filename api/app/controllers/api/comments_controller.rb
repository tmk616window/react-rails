class Api::CommentsController < ApplicationController
  def show
    comment = Comment.where(task_id: params[:id])
    render json: { comment: comment }
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: { comment: comment }
    else
      render json: { message: '作成に失敗しました' }
    end
  end

  def update
    comment = Comment.find(params[:id])
    if comment.update(comment_params)
      render json: { comment: comment }
    else
      render json: { message: '更新できませんでした' }
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: { comment: comment }
    else
      render json: { message: '削除に失敗しました' }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :task_id, :user_id)
  end
end
