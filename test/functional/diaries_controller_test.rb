require 'test_helper'

class DiariesControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  def setup
    @request.env["devise.mapping"] = Devise.mappings[:user]
    @user = create(:user)
    sign_in @user
    @user_is_destroyed = false
  end

  def teardown
    @user.destroy unless @user_is_destroyed
  end

  test "should not get accessed if not authenticated" do
    @user_is_destroyed = @user.destroy
    get :index
    assert_response :redirect
    assert_redirected_to new_user_session_path
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns("diaries")
  end

  test "should show diary" do
    get :show, :id => "hi"
    assert_response :success
    assert_not_nil assigns("diary")
  end

  test "should create diary" do
    assert_difference('Diary.count') do
      post :create, :diary => { :title => 'Hi', :slug => "hi", :content => 'This is my first diary.' }
    end
    assert_redirected_to diary_path(assigns(:diary))
    assert_equal "Diary was successfully created !", flash[:notice]
  end

  test "should also create the article" do
    assert_difference('Article.count') do
      post :create,
      { :is_also_article => 1,
        :diary =>
        { :title => 'Hi there',
          :slug => "hi-there",
          :content => 'This is my first diary.'
        }
      }
    end
    assert_redirected_to article_path(assigns(:diary))
    assert_equal "Both Diary and Article was successfully created !", flash[:notice]
  end

  test "should update diary" do
    put :update, :id => "hi", :diary => { :title => 'Hi', :slug => "hi", :content => 'This is not my first diary.'}
    assert_redirected_to diary_path(assigns(:diary))
    assert_equal "Diary was successfully updated !", flash[:notice]
  end
end
