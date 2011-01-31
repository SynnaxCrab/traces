class ApplicationController < ActionController::Base
  before_filter :set_locale
  rescue_from Article::ArticleNotFound, :with => :couch_not_found
  protect_from_forgery
  
  USERNAME, PASSWORD = "lainuo", "h123456" 
  
  def post_slug(post)
    date_array = post.created_at.to_time.to_formatted_s(:db).split(' ').first.split('-')
    "/" + date_array.join("/") + "/" + post.id.to_s + "-" + post.slug #title.parameterize
  end
  
  def article_slug(article)
    date_array = article.created_at.to_time.to_formatted_s(:db).split(' ').first.split('-')
    "/" + date_array.join("/") + "/" + article.slug #title.parameterize
  end
    
  def set_locale
    # if params[:locale] is nil then I18n.default_locale will be used
    I18n.locale = params[:l]
  end
  # protected
  
  # def authenticate 
  #   authenticate_or_request_with_http_basic do |username, password| 
  #     username == USERNAME &&  
  #     password == PASSWORD 
  #     end 
  # end 
  
  private
  def couch_not_found
    flash[:error] = "You don't have access to this section."
    render :file => "#{Rails.root.to_s}/public/404.html", :layout => false, :status => 404
  end
end
