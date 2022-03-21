require 'rails_helper'

RSpec.describe 'Taskモデルのテスト', type: :model do
  let(:content) { FactoryBot.create :content }

  describe 'バリデーションのテスト' do
    context '成功' do
      it '値が正常である' do
        content.valid?
        expect(content).to be_valid
      end
    end

    context '失敗' do
      it 'titleがない' do
        content.title = nil
        content.valid?
        expect(content.errors[:title]).to include("can't be blank")
      end

      it 'textがない' do
        content.text = nil
        content.valid?
        expect(content.errors[:text]).to include("can't be blank")
      end
    end
  end
end
