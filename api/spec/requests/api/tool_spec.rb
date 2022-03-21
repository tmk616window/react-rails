require 'rails_helper'

RSpec.describe 'Tool', type: :request do
  let(:user) { FactoryBot.create :user }
  let(:task) { FactoryBot.create :task }
  let(:payload) {  { name: user.email, id: user.id, exp: (DateTime.current + 14.days).to_i } }
  let(:api_secret) { OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key'))) }
  let(:algorithm) { 'RS256' }
  let(:token) { JWT.encode payload, api_secret, algorithm }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'create' do
    context '正常に動いている' do
      it 'toolをリダイレクトする' do
        expect do
          post '/api/tools', headers: headers, params: { tool: { name: 'test', task_id: task.id } }
        end.to change(Tool, :count).by(+1)
        expect(response.status).to eq 200
      end
    end

    context '作成できない' do
      it 'messageをリダイレクトする' do
        post '/api/tools', headers: headers, params: { tool: { name: nil, task_id: task.id } }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '作成に失敗しました'
      end

      it 'messageをリダイレクトする' do
        post '/api/tools', headers: headers, params: { tool: { name: 'test', task_id: nil } }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '作成に失敗しました'
      end
    end

    context 'トークンがない' do
      it 'taskをリダイレクトする' do
        post '/api/tools', params: { tool: { name: 'test', task_id: task.id } }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end

  describe 'delete' do
    let(:tool) { FactoryBot.create :tool }
    context '正常に動いている' do
      it 'messageをリダイレクトする' do
        delete "/api/tools/#{tool.id}", headers: headers
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '削除しました'
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        delete "/api/tools/#{tool.id}"
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end
end
