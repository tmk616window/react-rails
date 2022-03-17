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
        render json: { status: 500, message: "Taskの作成に失敗しました" }
    end
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
        render json: { status: 200, task: task }
    else
        render json: { status: 500, message: "Taskの削除に失敗しました" }
    end
  end


  def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render json: { status: 200, task: task }
    else
        render json: { status: 500, message: "userの更新に失敗しました" }
    end
  end

  private

  def task_params
    params.permit(:title, :image, :description, :purl, :user_id)
  end
end
