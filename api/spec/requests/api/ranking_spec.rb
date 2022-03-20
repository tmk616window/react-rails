require 'rails_helper'

RSpec.describe 'Task', type: :request do
  let(:user) { FactoryBot.create :user }
  let(:payload) {  {name: user.email, id: user.id, exp: (DateTime.current + 14.days).to_i}}
  let(:api_secret) { OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key'))) }
  let(:algorithm) { 'RS256' }
  let(:token) { JWT.encode payload, api_secret, algorithm }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'GET #index' do
    context 'ユーザーが存在する場合' do
      it '正常に通る' do
        get "/api/ranking"
        expect(response).to have_http_status 200
      end
    end
  end
end
