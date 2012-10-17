require 'sinatra'
require 'sinatra/namespace'
require 'rabl'
require 'json'
require 'rack/rest_api_versioning'
require 'api/helpers'
require 'api/v1/core'

module API
  class Traces < Sinatra::Base
    include API::Helpers
    use Rack::RestApiVersioning, :default_version => '1'
    Rabl.register!
    register Sinatra::Namespace

    namespace '/testbox' do
      get do
        "Welcome to Test Box!"
      end

      get '/index' do
        "Test Box Index"
      end
    end

    get '/' do
      "Hello, This is Traces Sinatra API"
    end

    get %r{^\/articles(\.json)?$} do
      content_type :json
      render_articles(env['api_version'], params)
    end

    # match /article/:id.?:format? for reference
    # get %r{^\/articles\/([^\/?#\.]+)(?:\.|%2E)?([^\/?#]+)?} do
    get %r{^\/articles\/([^\/?#\.]+)(?:\.json|%2Ejson)?$} do
      content_type :json
      render_article(env['api_version'], params)
    end

    get %r{^\/articles\/([^\/?#\.]+)\/comments(?:\.json)?$} do
      content_type :json
      render_comments(env['api_version'], params)
    end

    post %r{^\/articles(\.json)?$} do
      params[:article] = JSON.parse(request.env["rack.input"].read)
      content_type :json
      render_articles_new(env['api_version'], params)
    end

    post %r{^\/articles\/([^\/?#\.]+)\/comments(?:\.json)?$} do
      content_type :json
      params[:comment] = JSON.parse(request.env["rack.input"].read)
      render_comments_new(env['api_version'], params)
    end

    def render_articles(api_version, params)
      Rabl.render(
        core_class(api_version).articles(params),
        'articles',
        :view_path => view_path(api_version),
        :format => :json
      )
    end

    def render_article(api_version, params)
      Rabl.render(
        core_class(api_version).article(params),
        'article',
        :view_path => view_path(api_version),
        :format => :json
      )
    end

    def render_comments(api_version, params)
      Rabl.render(
        core_class(api_version).comments(params),
        'comments',
        :view_path => view_path(api_version),
        :format => :json
      )
    end

    def render_articles_new(api_version, params)
      unless authenticated?
        status 401
        response = {:error => '401 Unauthorized'}.to_json
        return
      end

      article = core_class(api_version).articles_create(params, current_user)
      if article.class == Hash
        status 400
        response = article.to_json
      else
        status 201
        response = Rabl.render(
          article,
          'article',
          :view_path => view_path(api_version),
          :format => :json
        )
      end
    end

    def render_comments_new(api_version, params)
      comment = core_class(api_version).comments_create(params)
      if comment.class == Hash
        status 400
        response = comment.to_json
      else
        status 201
        response = Rabl.render(
          comment,
          'comment',
          :view_path => view_path(api_version),
          :format => :json
        )
      end
      response
    end

  end
end
