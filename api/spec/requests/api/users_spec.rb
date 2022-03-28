require 'rails_helper'

RSpec.describe 'User', type: :request do
  let(:payload) { { name: user.email, id: user.id, exp: (DateTime.current + 14.days).to_i } }
  let(:api_secret) { OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key'))) }
  let(:algorithm) { 'RS256' }
  let(:token) { JWT.encode payload, api_secret, algorithm }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'GET #show' do
    let(:user) { FactoryBot.create :user }
    context 'ユーザーが存在する場合' do
      it '正常に通る' do
        get "/api/users/#{user.id}", headers: headers
        expect(response).to have_http_status 200
      end
    end
  end

  describe 'POST #create' do
    context '正常に通る' do
      it 'usersをリダイレクトする' do
        expect do
          post '/api/users',
               params: { name: 'test', email: 'test', password: 'password', password_confirmation: 'password' }
        end.to change(User, :count).by(+1)
        expect(response.status).to eq 200
      end
    end

    context 'emailが空の時' do
      it 'messageをレンダリングする' do
        post '/api/users', params: { name: 'test', email: nil, password: 'test', password_confirmation: 'test' }
        response_json = JSON.parse(response.body)
        expect(response_json['errors']).to eq '保存できませんでした'
      end
    end

    context 'passwordが空の時' do
      it 'messageをレンダリングする' do
        post '/api/users', params: { name: 'test', email: 'test', password: nil, password_confirmation: 'test' }
        response_json = JSON.parse(response.body)
        expect(response_json['errors']).to eq '保存できませんでした'
      end
    end
  end

  describe 'PATCH #update' do
    let(:user) { FactoryBot.create(:user) }

    context '名前がある時' do
      it '期待通りに編集さてれているか' do
        patch "/api/users/#{user.id}", headers: headers, params: { name: 'user' }
        user.reload
        expect(user.name).to eq('user')
        expect(response.status).to eq 200
      end
    end

    context 'nameがない時' do
      it 'editをレンダリングする' do
        patch "/api/users/#{user.id}", headers: headers, params: { name: nil }
        user.reload
        response_json = JSON.parse(response.body)
        expect(response_json['errors']).to eq '更新できませんでした'
      end
    end

    context 'emailがない時' do
      it 'editをレンダリングする' do
        patch "/api/users/#{user.id}", headers: headers, params: { email: nil }
        user.reload
        response_json = JSON.parse(response.body)
        expect(response_json['errors']).to eq '更新できませんでした'
      end
    end

    context 'detailsを編集' do
      it '期待通りに編集さてれているか' do
        patch "/api/users/#{user.id}", headers: headers, params: { details: 'details' }
        user.reload
        expect(user.details).to eq('details')
        expect(response.status).to eq 200
      end
    end

    # context 'imageを編集' do
    #   it '期待通りに編集さてれているか' do
    #     patch "/api/users/#{user.id}", headers: headers, params: { image: 'image' }
    #     user.reload
    #     expect(user.image).to eq('image')
    #     expect(response.status).to eq 200
    #   end
    # end

    context 'ageを編集' do
      it '期待通りに編集さてれているか' do
        patch "/api/users/#{user.id}", headers: headers, params: { age: 22 }
        user.reload
        expect(user.age).to eq(22)
        expect(response.status).to eq 200
      end
    end

    context 'liveを編集' do
      it '期待通りに編集さてれているか' do
        patch "/api/users/#{user.id}", headers: headers, params: { live: 'live' }
        user.reload
        expect(user.live).to eq('live')
        expect(response.status).to eq 200
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:user) { FactoryBot.create(:user) }
    it 'user削除' do
      payload = { name: user.email, id: user.id, exp: (DateTime.current + 14.days).to_i }
      api_secret = OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key')))
      algorithm = 'RS256'
      token = JWT.encode(payload, api_secret, algorithm)
      headers = { 'Authorization' => "Bearer #{token}" }

      user2 = FactoryBot.create(:user)
      expect  do
        delete "/api/users/#{user2.id}", headers: headers
      end.to change(User, :count).by(-1)
      response_json = JSON.parse(response.body)
      expect(response_json['message']).to eq '削除しました'
    end
  end
end
