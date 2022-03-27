require 'rails_helper'

RSpec.describe 'Task', type: :request do
  let(:user) { FactoryBot.create :user }
  let(:payload) {  { name: user.email, id: user.id, exp: (DateTime.current + 14.days).to_i } }
  let(:api_secret) { OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key'))) }
  let(:algorithm) { 'RS256' }
  let(:token) { JWT.encode payload, api_secret, algorithm }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'GET #index' do
    context 'ユーザーが存在する場合' do
      it '正常に通る' do
        get '/api/tasks', headers: headers
        expect(response).to have_http_status 200
      end
    end

    context 'トークンを持っていない' do
      it '401を返す' do
        get '/api/tasks'
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end

  describe 'GET #show' do
    let(:task) { FactoryBot.create :task }
    context 'ユーザーが存在する場合' do
      it '正常に通る' do
        get "/api/tasks/#{task.id}", headers: headers
        expect(response).to have_http_status 200
      end
    end

    context 'トークンを持っていない' do
      it '401を返す' do
        get "/api/tasks/#{task.id}"
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end
  end

  describe 'POST #create' do
    context '正常に動いている' do
      it 'taskをリダイレクトする' do
        expect do
          post '/api/tasks', headers: headers,
                             params: { title: 'test', image: 'test', details: 'test', url: 'test', user_id: user.id }
        end.to change(Task, :count).by(+1)
        expect(response.status).to eq 200
      end
    end

    context 'トークンを持っていない' do
      it '401を返す' do
        post '/api/tasks', params: { title: 'test', image: 'test', details: 'test', url: 'test', user_id: user.id }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq 'unauthorized'
      end
    end

    context 'titleが空の時' do
      it 'messageをレンダリングする' do
        post '/api/tasks', headers: headers,
                           params: { title: nil, image: 'test', details: 'test', url: 'test', user_id: user.id }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '保存できませんでした'
      end
    end

    context 'imageが空の時' do
      it 'messageをレンダリングする' do
        post '/api/tasks', headers: headers,
                           params: { title: 'test', image: nil, details: 'test', url: 'test', user_id: user.id }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '保存できませんでした'
      end
    end

    context 'detailsが空の時' do
      it 'messageをレンダリングする' do
        post '/api/tasks', headers: headers,
                           params: { title: 'test', image: 'test', details: nil, url: 'test', user_id: user.id }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '保存できませんでした'
      end
    end

    context 'urlが空の時' do
      it 'messageをレンダリングする' do
        post '/api/tasks', headers: headers,
                           params: { title: 'test', image: 'test', details: 'test', url: nil, user_id: user.id }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '保存できませんでした'
      end
    end

    context 'user_idが空の時' do
      it 'messageをレンダリングする' do
        post '/api/tasks', headers: headers,
                           params: { title: 'test', image: 'test', details: 'test', url: nil, user_id: user.id }
        response_json = JSON.parse(response.body)
        expect(response_json['message']).to eq '保存できませんでした'
      end
    end
  end

  describe 'PATCH #update' do
  let(:task) { FactoryBot.create :task }
  context '正常に編集する' do
    it '期待通りに編集さてれているか' do
      patch "/api/tasks/#{task.id}", headers: headers,
                                     params: { title: 'testtest', image: 'testtest', details: 'testtest', url: 'testtest', user_id: user.id }
      task.reload
      expect(task.title).to eq('testtest')
      expect(task.image).to eq('testtest')
      expect(task.details).to eq('testtest')
      expect(task.url).to eq('testtest')
      expect(response.status).to eq 200
    end
  end

  context '編集できない' do
    it 'nameが空' do
      patch "/api/tasks/#{task.id}", headers: headers,
                                     params: { title: nil, image: 'testtest', details: 'testtest', url: 'testtest', user_id: user.id }
      response_json = JSON.parse(response.body)
      expect(response_json['message']).to eq '更新に失敗しました'
    end

    it 'imageが空' do
      patch "/api/tasks/#{task.id}", headers: headers,
                                     params: { title: 'testtest', image: nil, details: 'testtest', url: 'testtest', user_id: user.id }
      response_json = JSON.parse(response.body)
      expect(response_json['message']).to eq '更新に失敗しました'
    end

    it 'detailsが空' do
      patch "/api/tasks/#{task.id}", headers: headers,
                                     params: { title: 'testtest', image: 'testtest', details: nil, url: 'testtest', user_id: user.id }
      response_json = JSON.parse(response.body)
      expect(response_json['message']).to eq '更新に失敗しました'
    end

    it 'urlが空' do
      patch "/api/tasks/#{task.id}", headers: headers,
                                     params: { title: 'testtest', image: 'testtest', details: 'testtest', url: nil, user_id: user.id }
      response_json = JSON.parse(response.body)
      expect(response_json['message']).to eq '更新に失敗しました'
    end

    it 'user_idが空' do
      patch "/api/tasks/#{task.id}", headers: headers,
                                     params: { title: 'testtest', image: 'testtest', details: 'testtest', url: 'testtest', user_id: nil }
      response_json = JSON.parse(response.body)
      expect(response_json['message']).to eq '更新に失敗しました'
    end
  end

  context 'トークンがない' do
    it 'unauthorizedをレンダリング' do
      patch "/api/tasks/#{task.id}",
            params: { title: 'testtest', image: 'testtest', details: 'testtest', url: 'testtest', user_id: user.id }
      response_json = JSON.parse(response.body)
      expect(response_json['message']).to eq 'unauthorized'
    end
  end
 end


  describe 'delete' do
    let(:task) { FactoryBot.create :task }
    context '正常に動いている' do
      it 'taskをリダイレクトする' do
        delete "/api/tasks/#{task.id}", headers: headers
        expect(response.status).to eq 200
      end
    end

    context 'トークンがない' do
      it 'taskをリダイレクトする' do
        delete "/api/tasks/#{task.id}"
        expect(response.status).to eq 401
      end
    end
  end
end
