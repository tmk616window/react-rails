require 'rails_helper'

RSpec.describe 'Taskモデルのテスト', type: :model do
  let(:tool) { FactoryBot.create :tool }

  describe 'バリデーションのテスト' do
    context '成功' do
      it '値が正常である' do
        tool.valid?
        expect(tool).to be_valid
      end
    end

    context '失敗' do
      it 'nameがない' do
        tool.name = nil
        tool.valid?
        expect(tool.errors[:name]).to include("can't be blank")
      end

      it 'task_idがない' do
        tool.task_id = nil
        tool.valid?
        expect(tool.errors[:task_id]).to include("can't be blank")
      end
    end
  end
end
