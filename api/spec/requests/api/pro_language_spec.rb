require 'rails_helper'

RSpec.describe 'pro_language', type: :request do
  let(:user) { FactoryBot.create :user }
  let(:task) { FactoryBot.create :task }
  let(:payload) {  {name: user.email, id: user.id, exp: (DateTime.current + 14.days).to_i}}
  let(:api_secret) { OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key'))) }
  let(:algorithm) { 'RS256' }
  let(:token) { JWT.encode payload, api_secret, algorithm }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'create' do
    context '正常に動いている' do
      it 'pro_languageをリダイレクトする' do
        expect{
          post '/api/pro_languages', headers: headers, params: { pro_language: {language: 'test', task_id: task.id}}
        }.to change(ProLanguage,:count).by(+1)
        expect(response.status).to eq 200
      end
    end

    context '作成できない' do
      it 'messageをリダイレクトする' do
        post '/api/pro_languages', headers: headers, params: { pro_language: {language: nil, task_id: task.id}}
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq "作成に失敗しました"
      end
    
      it 'messageをリダイレクトする' do
        post '/api/pro_languages', headers: headers, params: { pro_language: {language: "test", task_id: nil}}
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq "作成に失敗しました"
      end
    end

    context 'トークンがない' do
      it 'taskをリダイレクトする' do
        post '/api/pro_languages', params: { pro_language: {language: 'test', task_id: task.id}}
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq "unauthorized"
      end
    end
  end


  describe 'delete' do
    let(:pro_language) { FactoryBot.create :ProLanguage }
    context '正常に動いている' do
      it 'messageをリダイレクトする' do
        delete "/api/pro_languages/#{pro_language.id}", headers: headers
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq "削除しました"
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        delete "/api/pro_languages/#{pro_language.id}"
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq "unauthorized"
      end
    end
  end
end

