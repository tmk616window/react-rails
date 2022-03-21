require 'rails_helper'

RSpec.describe 'Like', type: :request do
  let(:user) { FactoryBot.create :user }
  let(:task) { FactoryBot.create :task }
  let(:payload) {  { name: user.email, id: user.id, exp: (DateTime.current + 14.days).to_i } }
  let(:api_secret) { OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key'))) }
  let(:algorithm) { 'RS256' }
  let(:token) { JWT.encode payload, api_secret, algorithm }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'create' do
    context '正常に動いている' do
      it 'taskをリダイレクトする' do
        expect do
          post '/api/likes', headers: headers, params: { like: { task_id: task.id, user_id: user.id } }
        end.to change(Like, :count).by(+1)
        expect(response.status).to eq 200
      end
    end

    context '作成できない' do
      it 'messageをリダイレクトする' do
        expect do
          post '/api/likes', headers: headers, params: { like: { task_id: nil, user_id: user.id } }
        end.to change(Like, :count).by(0)
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '作成に失敗しました'
      end

      it 'messageをリダイレクトする' do
        expect do
          post '/api/likes', headers: headers, params: { like: { task_id: task.id, user_id: nil } }
        end.to change(Like, :count).by(0)
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '作成に失敗しました'
      end
    end

    context 'トークンがない' do
      it 'taskをリダイレクトする' do
        post '/api/likes', params: { like: { task_id: task.id, user_id: user.id } }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end

  describe 'delete' do
    let(:like) { FactoryBot.create :like }
    context '正常に動いている' do
      it 'messageをリダイレクトする' do
        delete "/api/likes/#{like.id}", headers: headers
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '削除しました'
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        delete "/api/likes/#{like.id}"
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end
end
