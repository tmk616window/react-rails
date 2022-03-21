require 'test_helper'

class Api::ToolsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get api_tools_index_url
    assert_response :success
  end
end
