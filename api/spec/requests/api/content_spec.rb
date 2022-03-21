require 'rails_helper'

RSpec.describe 'Content', type: :request do
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
          post '/api/contents', headers: headers, params: { content: { title: 'test', text: 'test', task_id: task.id } }
        end.to change(Content, :count).by(+1)
        expect(response.status).to eq 200
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        post '/api/contents', params: { content: { title: 'test', text: 'test', task_id: task.id } }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end

  describe 'PATCH #update' do
    let(:content) { FactoryBot.create(:content) }
    context '正常に通るか' do
      it '期待通りに編集さてれているか' do
        patch "/api/contents/#{content.id}", headers: headers,
                                             params: { content: { title: 'title', text: 'text', task_id: task.id } }
        content.reload
        expect(content.title).to eq('title')
        expect(content.text).to eq('text')
        expect(response.status).to eq 200
      end
    end

    context 'paramsが空' do
      it 'editをレンダリングする' do
        patch "/api/contents/#{content.id}", headers: headers,
                                             params: { content: { title: nil, text: nil, task_id: task.id } }
        content.reload
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '作成に失敗しました'
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        patch "/api/contents/#{content.id}", params: { content: { text: nil, task_id: task.id, user_id: user.id } }
        content.reload
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        patch "/api/contents/#{content.id}"
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end

  describe 'delete' do
    let(:content) { FactoryBot.create :content }
    context '正常に動いている' do
      it 'messageをリダイレクトする' do
        delete "/api/contents/#{content.id}", headers: headers
        expect(response.status).to eq 200
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        delete "/api/contents/#{content.id}"
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end
end
