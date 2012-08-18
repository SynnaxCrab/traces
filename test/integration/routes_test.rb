require 'test_helper'

class RoutesTest < ActionDispatch::IntegrationTest
  test "/:year should be valid" do
    assert_routing '/2012', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012" }
  end

  test "/:year/:month should be valid" do
    assert_routing '/2012/09', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :month => "09" }
  end

  test "/:year/:month/:day should be valid" do
    assert_routing '/2012/09/12', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :month => "09",
      :day => "12" }
  end

  test "/:year/:month/:day/:slug should be valid" do
    assert_routing '/2012/09/12/12', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :month => "09",
      :day => "12",
      :slug => "12" }
  end

  test "/:year/:slug should be valid" do
    assert_routing '/2012/13', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :slug => "13" }
    assert_routing '/2012/099', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :slug => "099" }
    assert_routing '/2012/abc', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :slug => "abc" }
  end

  test "/:year/:month/:slug should be valid" do
    assert_routing '/2012/09/32', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :month => "09",
      :slug => "32" }
    assert_routing '/2012/09/099', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :month => "09",
      :slug => "099" }
    assert_routing '/2012/09/abc', {
      :controller => "articles",
      :action => "show_all",
      :year => "2012",
      :month => "09",
      :slug => "abc" }
  end
end
