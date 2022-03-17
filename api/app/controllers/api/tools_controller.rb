class Api::ToolsController < ApplicationController

  def create
    tool = Tool.new(tool_params)
    if tool.save
      render json: { tool: tool },status: ok
    else
      render json: { message: "Toolの作成に失敗しました" }, status: error
    end
  end

  def destroy
    tool = Tool.find(params[:id])
    if tool.destroy
      render json: status: ok
    else
      render json: status: error
    end    
  end

  private

  def tool_params
    params.require(:tool).permit(:name, :task_id)
  end
end
