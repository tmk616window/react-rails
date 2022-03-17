require 'rails_helper'

RSpec.describe 'Userモデルのテスト', type: :model do
  describe 'バリデーションのテスト' do
    context '成功' do
      it "値が正常である" do
        user = User.new(name: 'test', email: 'test', password: 'test', password_confirmation: 'test')
        user.valid?
        expect(user).to be_valid
      end
    end

    context '失敗' do
      it "名前がない" do
        user = User.new(name: nil, email: 'test', password: 'test', password_confirmation: 'test')
        user.valid?
        expect(user.errors[:name]).to include("can't be blank")
      end
 
      it "アドレスがない" do
        user = User.new(name: 'test', email: nil, password: 'test', password_confirmation: 'test')
        user.valid?
        expect(user.errors[:email]).to include("can't be blank")
      end  
      
      it "パスワードがない" do
        user = User.new(name: 'test', email: 'test', password: nil, password_confirmation: nil)
        user.valid?
        expect(user.errors[:password_digest]).to include("can't be blank")
      end
    end
  end
end
