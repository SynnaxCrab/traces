require 'api/core'
require 'test/unit'
require 'rack/test'
require 'test_helper'

class ApiCoreTest < ActiveSupport::TestCase
  include Rack::Test::Methods

  def app
    API::Core
  end

  def setup
    @article = create(:article)
    @comment = create(:comment, {:article_id => @article.id})
  end

  def teardown
    @comment.destroy
    @article.destroy
  end

  def test_root
    get '/'
    assert_equal "Hello, This is Traces Sinatra API", last_response.body
  end

  def test_articles_url_format
    get '/articles'
    assert last_response.ok?
    get '/articles.json'
    assert last_response.ok?
    get '/articles.xml'
    assert !last_response.ok?
  end

  def test_articles_output_format
    get '/articles'
    assert_equal "application/json;charset=utf-8", last_response.headers["Content-Type"]
    get '/articles.json'
    assert_equal "application/json;charset=utf-8", last_response.headers["Content-Type"]
  end

  def test_articles_output_result
    get '/articles'
    output = JSON.parse(last_response.body)
    assert_equal "Fuck GFW", output[0]["title"]
    assert_equal "Freedom!", output[0]["content"]
  end

  def test_single_article_url_format
    get '/articles/fuck-gfw'
    assert last_response.ok?
    get '/articles/fuck-gfw.json'
    assert last_response.ok?
    get '/articles/fuck-gfw.xml'
    assert !last_response.ok?
  end

  def test_single_article_output_format
    get '/articles/fuck-gfw'
    assert_equal "application/json;charset=utf-8", last_response.headers["Content-Type"]
    get '/articles/fuck-gfw.json'
    assert_equal "application/json;charset=utf-8", last_response.headers["Content-Type"]
  end

  def test_single_article_output_result
    get '/articles/fuck-gfw'
    output = JSON.parse(last_response.body)
    assert_equal "Fuck GFW", output["title"]
    assert_equal "Freedom!", output["content"]
  end

  def test_comments_url_format
    article_id = @article.id
    get "/articles/#{article_id}/comments"
    assert last_response.ok?
    get "/articles/#{article_id}/comments.json"
    assert last_response.ok?
    get "/articles/#{article_id}/comments.xml"
    assert !last_response.ok?
  end

  def test_comments_output_format
    article_id = @article.id
    get "/articles/#{article_id}/comments"
    assert_equal "application/json;charset=utf-8", last_response.headers["Content-Type"]
    get "/articles/#{article_id}/comments.json"
    assert_equal "application/json;charset=utf-8", last_response.headers["Content-Type"]
  end

  def test_comments_output_result
    article_id = @article.id
    get "/articles/#{article_id}/comments"
    output = JSON.parse(last_response.body)
    assert_equal "lainuo@outlook.com", output[0]["email"]
    assert_equal "http://lainuo.info", output[0]["website"]
    assert_equal "lainuo", output[0]["name"]
    assert_equal "f7u12", output[0]["content"]
  end
end
