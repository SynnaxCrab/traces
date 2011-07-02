require 'test_helper'

class ArticlesControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  
  def setup
    @request.env["devise.mapping"] = Devise.mappings[:user]
    @user = Factory.create(:user)
    sign_in @user
    @user_is_destroyed = false
  end
  
  def teardown
    @user.destroy unless @user_is_destroyed
  end
  
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns("articles")
  end
  
  # test "should show article" do
  #   get :show, :id => "hi"
  #   assert_response :success
  #   assert_not_nil assigns("article")
  # end

  test "should create article" do
    assert_difference('Article.count') do
      post :create, :article => { :title => 'Hi', :slug => "hi-article", :content => 'This is my first article.' }
    end
    assert_redirected_to article_path(assigns(:article))
    assert_equal "Article was successfully created !", flash[:notice]
  end
  
  test "should update article" do
    put :update, :id => "hi-article", :article => { :title => 'Hi', :slug => "hi-article", :content => 'This is not my first article.'}
    assert_redirected_to article_path(assigns(:article))
    assert_equal "Article was successfully updated !", flash[:notice]
  end
  
  test "should redirect articles/:slug to :year/:month/:day/:slug" do
    get :show, :id => "hi-article"
    assert_redirected_to article_slug(assigns(:article))
  end
  
  test "should redirect :year/:month/:slug to :year/:month/:day/:slug" do
    get :show_redirect, :year => "2010", :month => "09", :slug => "hi-article"
    assert_redirected_to article_slug(assigns(:article))
  end
  
  test "should redirect :year/:slug to :year/:month/:day/:slug" do
    get :show_redirect, :year => "2010", :slug => "hi-article"
    assert_redirected_to article_slug(assigns(:article))
  end
  
  test "should get articles according to year month day if slug is not present" do
    get :show_all, :year => "2011"
    assert_not_nil assigns(:articles)
  end

  test "should get drafts" do
    get :drafts
    assert_not_nil assigns(:articles)
  end
  
  test "should get feed" do
    get :feed
    assert_not_nil assigns(:articles)
    assert_redirected_to feed_path(:format => :atom)
  end
end
