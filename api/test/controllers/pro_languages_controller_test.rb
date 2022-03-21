require 'test_helper'

class ProLanguagesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get pro_languages_index_url
    assert_response :success
  end
end
