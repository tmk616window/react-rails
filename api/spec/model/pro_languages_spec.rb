require 'rails_helper'

RSpec.describe 'Taskモデルのテスト', type: :model do
  let(:pro_Language) { FactoryBot.create :ProLanguage }

  describe 'バリデーションのテスト' do
    context '成功' do
      it '値が正常である' do
        pro_Language.valid?
        expect(pro_Language).to be_valid
      end
    end

    context '失敗' do
      it 'textがない' do
        pro_Language.language = nil
        pro_Language.valid?
        expect(pro_Language.errors[:language]).to include("can't be blank")
      end

      it 'task_idがない' do
        pro_Language.task_id = nil
        pro_Language.valid?
        expect(pro_Language.errors[:task_id]).to include("can't be blank")
      end
    end
  end
end
