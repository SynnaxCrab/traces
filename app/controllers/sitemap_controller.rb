class SitemapController < ApplicationController
  layout nil

  def index
    @articles = Article.by_published_at :descending => true
    respond_to do |format|
      format.html do
         redirect_to sitemap_path(:format => :xml), :status => :moved_permanently
      end
      format.xml
    end
  end
end
