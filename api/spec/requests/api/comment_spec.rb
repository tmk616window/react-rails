require 'rails_helper'

RSpec.describe 'Comment', type: :request do
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
          post '/api/comments', headers: headers,
                                params: { comment: { text: 'test', task_id: task.id, user_id: user.id } }
        end.to change(Comment, :count).by(+1)
        expect(response.status).to eq 200
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        post '/api/comments', params: { comment: { text: 'test', task_id: task.id, user_id: user.id } }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end

  describe 'PATCH #update' do
    let(:comment) { FactoryBot.create(:comment) }

    context '正常に通るか' do
      it '期待通りに編集さてれているか' do
        patch "/api/comments/#{comment.id}", headers: headers,
                                             params: { comment: { text: 'comment', task_id: task.id, user_id: user.id } }
        comment.reload
        expect(comment.text).to eq('comment')
        expect(response.status).to eq 200
      end
    end

    context '失敗する' do
      it 'editをレンダリングする' do
        patch "/api/comments/#{comment.id}", headers: headers,
                                             params: { comment: { text: nil, task_id: task.id, user_id: user.id } }
        comment.reload
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '更新できませんでした'
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        patch "/api/comments/#{comment.id}", params: { comment: { text: nil, task_id: task.id, user_id: user.id } }
        comment.reload
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        patch "/api/comments/#{comment.id}"
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end

  describe 'delete' do
    let(:comment) { FactoryBot.create :comment }
    context '正常に動いている' do
      it 'messageをリダイレクトする' do
        delete "/api/comments/#{comment.id}", headers: headers
        expect(response.status).to eq 200
      end
    end

    context 'トークンがない' do
      it 'messageをリダイレクトする' do
        delete "/api/comments/#{comment.id}"
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end
end
