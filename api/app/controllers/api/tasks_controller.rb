class Api::TasksController < ApplicationController
  def index
    tasks = Task.all
    render json: { tasks: tasks.order(id: "DESC") }, status: :ok, include: [:pro_languages]
  end

  def show
    task = Task.find(params[:id])
    render json: {task: task, proLanguages: task.pro_languages, tools: task.tools, contents: task.contents, comments: task.comments, user: task.user, likes: task.likes}, status: :ok
  end

  def create
    task = Task.new(task_params)
    if task.save
        render json: { status: 200, task: task }
    else
      render json: {message: "保存できませんでした" }
    end
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render json: { message: "削除しました"}, status: :ok
  end

  def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render json: {task: task }, status: 200
    else
        render json: {message: "更新に失敗しました" }
    end
  end

  private

  def task_params
    params.permit(:title, :image, :details, :url, :user_id)
  end
end
