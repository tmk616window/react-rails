class Api::ContentsController < ApplicationController
  def show
    content = Content.where(task_id: params[:id])
    render json: { content: content }
  end

  def create
    content = Content.new(content_params)
    if content.save
      render json: { content: content }
    else
      render json: { message: '作成に失敗しました' }
    end
  end

  def update
    content = Content.find(params[:id])
    if content.update(content_params)
      render json: { content: content }
    else
      render json: { message: '作成に失敗しました' }
    end
  end

  def destroy
    content = Content.find(params[:id])
    if content.destroy
      render json: { content: content }
    else
      render json: { message: 'contentの削除に失敗しました' }
    end
  end

  private

  def content_params
    params.require(:content).permit(:title, :text, :task_id)
  end
end
