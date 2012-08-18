require 'sinatra'
require 'sinatra/namespace'
require 'rabl'

module Api
  class Core < Sinatra::Base
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

    get %r{/[.json]*} do
      content_type :json
      skip = params[:skip].nil? ? 0 : params[:skip]
      @articles = Article.by_published_at :descending => true, :limit => 5, :skip => skip
      render :rabl, :articles, :format => "json"
    end
  end
end
