class Api::ProLanguagesController < ApplicationController
  def index
    render json: {prolanguage: ProLanguage.where(params[:task_id]) }, status: :ok
  end

  def create
    proLanguage = ProLanguage.new(prolong_params)
    if prolong.save
      render json: {proLanguage: proLanguage },status: ok
    else
      render json: { message: "Prolongの作成に失敗しました" }, status: error
    end
  end
      
  def destroy
    proLanguage = ProLanguage.find(params[:id])
    if proLanguage.destroy
      render json: status: ok
    else
      render json: status: error
    end
  end

    private

    def proLanguage_params
        params.require(:proLanguage).permit(:language, :task_id)
     end
end
