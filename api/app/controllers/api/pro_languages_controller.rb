class Api::ProLanguagesController < ApplicationController

  def show
    pro_Language = ProLanguage.where(task_id: params[:id])
    render json: { pro_Language: pro_Language }
  end

  def create
    pro_Language = ProLanguage.new(pro_language_params)
    if pro_Language.save
      render json: {pro_Language: pro_Language }
    else
      render json: { message: "作成に失敗しました" }
    end
  end

  def destroy
    pro_Language = ProLanguage.find(params[:id])
    pro_Language.destroy
    render json: { message: "削除しました" }
  end

  private

  def pro_language_params
    params.require(:pro_language).permit(:language, :task_id)
  end
end
