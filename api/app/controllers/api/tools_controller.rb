class Api::ToolsController < ApplicationController
  def show
    tool = Tool.where(task_id: params[:id])
    render json: { tool: tool }
  end

  def create
    tool = Tool.new(tool_params)
    if tool.save
      render json: { tool: tool }
    else
      render json: { message: "作成に失敗しました" }
    end
  end

  def destroy
    tool = Tool.find(params[:id])
    tool.destroy
    render json: {message: "削除しました" }
  end

  private

  def tool_params
    params.require(:tool).permit(:name, :task_id)
  end
end
