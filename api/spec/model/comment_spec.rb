require 'rails_helper'

RSpec.describe 'Taskモデルのテスト', type: :model do
  let(:comment) { FactoryBot.create :comment }

  describe 'バリデーションのテスト' do
    context '成功' do
      it "値が正常である" do
        comment.valid?
        expect(comment).to be_valid
      end
    end

    context '失敗' do
      it "textがない" do
        comment.text = nil
        comment.valid?
        expect(comment.errors[:text]).to include("can't be blank")
      end
    end
  end
end