require 'rails_helper'

RSpec.describe 'Taskモデルのテスト', type: :model do
  let(:user) { FactoryBot.create :user }
  describe 'バリデーションのテスト' do
    context '成功' do
      it "値が正常である" do
        task = Task.new(title: 'test', image: 'test', details: 'test', url: 'test', user_id: user.id)
        task.valid?
        expect(task).to be_valid
      end
    end

    context '失敗' do
      it "タイトルがない" do
        task = Task.new(title: nil, image: "test", details: 'test', url: 'test', user_id: user.id)
        task.valid?
        expect(task.errors[:title]).to include("can't be blank")
      end

      it "imageがない" do
        task = Task.new(title: "test", image: nil, details: 'test', url: 'test', user_id: user.id)
        task.valid?
        expect(task.errors[:image]).to include("can't be blank")
      end

      it "detailsがない" do
        task = Task.new(title: "test", image: nil, details: nil, url: 'test', user_id: user.id)
        task.valid?
        expect(task.errors[:image]).to include("can't be blank")
      end

      it "urlがない" do
        task = Task.new(title: "test", image: nil, details: 'test', url: nil, user_id: user.id)
        task.valid?
        expect(task.errors[:image]).to include("can't be blank")
      end

      it "user_idがない" do
        task = Task.new(title: "test", image: nil, details: 'test', url: nil, user_id: nil)
        expect(task.valid?).to eq(false)
      end
    end
  end
end