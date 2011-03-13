class SitemapController < ApplicationController
  layout nil

  def index
    @articles = Article.by_created_at :descending => true
    respond_to do |format|
      format.xml
    end
  end
end
