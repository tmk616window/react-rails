require 'rails_helper'

RSpec.describe 'Userモデルのテスト', type: :model do
  let(:user) { FactoryBot.create :user }

  describe 'バリデーションのテスト' do
    context '成功' do
      it "値が正常である" do
        user.valid?
        expect(user).to be_valid
      end
    end

    context '失敗' do
      it "名前がない" do
        user.name = nil
        user.valid?
        expect(user.errors[:name]).to include("can't be blank")
      end
 
      it "アドレスがない" do
        user.email = nil
        user.valid?
        expect(user.errors[:email]).to include("can't be blank")
      end  

      it "パスワードがない" do
        user.password_digest = nil
        user.valid?
        expect(user.errors[:password_digest]).to include("can't be blank")
      end
    end
  end
end
