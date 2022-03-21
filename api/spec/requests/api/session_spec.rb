require 'rails_helper'

RSpec.describe 'Session', type: :request do
  let(:user) { FactoryBot.create :user }
  let(:payload) {  { name: user.email, id: user.id, exp: (DateTime.current + 14.days).to_i } }
  let(:api_secret) { OpenSSL::PKey::RSA.new(File.read(Rails.root.join('auth/service.key'))) }
  let(:algorithm) { 'RS256' }
  let(:token) { JWT.encode payload, api_secret, algorithm }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'create' do
    describe 'response status' do
      subject do
        get '/api/session', headers: headers
        expect(response.status).to eq 200
      end
    end
  end
end
