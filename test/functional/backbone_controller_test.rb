require 'test_helper'

class BackboneControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  
  test "should render browser suggestion page if below IE 9" do
    @request.user_agent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)"
    get :index
    assert_response :success
    assert_equal true, assigns("is_ie_9")
  end
  
  test "should get articles back if ua is Googlebot" do
    @request.user_agent = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    get :index
    assert_response :success
    assert_not_nil assigns("articles")
  end
  
  test "should not get articles back if ua neither Googlebot or below IE 9" do
    @request.user_agent = "Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US)"
    get :index
    assert_response :success
    assert_nil assigns("articles")
  end
end