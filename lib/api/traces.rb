require 'sinatra'
require 'sinatra/namespace'
require 'rabl'
require 'json'
require 'rack/rest_api_versioning'
require 'api/v1/core'

module API
  class Traces < Sinatra::Base
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

    def core_class(api_version)
      Object.const_get(:API).const_get("V#{api_version}").const_get(:Core).new
    end
    
    def view_path(api_version)
      "#{File.expand_path File.dirname(__FILE__)}/v#{api_version}/views"
    end
    
  end
end
