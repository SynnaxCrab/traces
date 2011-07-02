require 'test_helper'

class SitemapControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  
  test "should get index" do
    get :index
    assert_not_nil assigns(:articles)
    assert_redirected_to sitemap_path(:format => :xml)
  end
end