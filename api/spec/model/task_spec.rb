require 'rails_helper'

RSpec.describe 'Taskモデルのテスト', type: :model do
  let(:task) { FactoryBot.create :task }

  describe 'バリデーションのテスト' do
    context '成功' do
      it '値が正常である' do
        task.valid?
        expect(task).to be_valid
      end
    end

    context '失敗' do
      it 'タイトルがない' do
        task.title = nil
        task.valid?
        expect(task.errors[:title]).to include("can't be blank")
      end

      it 'imageがない' do
        task.image = nil
        task.valid?
        expect(task.errors[:image]).to include("can't be blank")
      end

      it 'detailsがない' do
        task.details = nil
        task.valid?
        expect(task.errors[:details]).to include("can't be blank")
      end

      it 'urlがない' do
        task.details = nil
        task.valid?
        expect(task.errors[:details]).to include("can't be blank")
      end

      it 'user_idがない' do
        task.details = nil
        expect(task.valid?).to eq(false)
      end
    end
  end
end
