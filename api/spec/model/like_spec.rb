require 'rails_helper'

RSpec.describe 'Taskモデルのテスト', type: :model do
  let(:like) { FactoryBot.create :like }

  describe 'バリデーションのテスト' do
    context '成功' do
      it '値が正常である' do
        like.valid?
        expect(like).to be_valid
      end
    end

    context '失敗' do
      it 'task_idがない' do
        like.task_id = nil
        like.valid?
        expect(like.errors[:task_id]).to include("can't be blank")
      end

      it 'user_idがない' do
        like.user_id = nil
        like.valid?
        expect(like.errors[:user_id]).to include("can't be blank")
      end
    end
  end
end
