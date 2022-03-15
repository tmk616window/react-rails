class Api::TasksController < ApplicationController
  def index
    tasks = Task.all
    # puts tasks
    # puts tasks
    # puts tasks
    # puts tasks
    # puts tasks
    # puts tasks
    # puts tasks
    # puts json: {tasks: tasks}

    render json: {
      tasks: tasks
    }, status: :ok
  end

  def show
    task = Task.select(:id).find(params[:id])
    render json: {
      task: task
    }, status: :ok
  end

  def new
  end

  def create
  end

  def edit
  end

  def destroy
  end
  
end
