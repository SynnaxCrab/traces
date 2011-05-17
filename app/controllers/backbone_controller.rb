class BackboneController < ApplicationController
  #layout nil
  layout :determine_layout
  def index
    if is_googlebot?
      @articles = Article.by_created_at :descending => true, :limit => 5
      respond_to do |format|
        format.html
        format.json { render json: @articles}
      end
    end
  end
  
  private
  def is_googlebot?
    ua = request.user_agent
    puts ua
    #ua = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    return false if ua.nil?
    return false unless ua.downcase.index('googlebot')
    
    true
  end
  
  def determine_layout
    if is_googlebot?
      "articles"
    else       
      "backbone"
    end
  end
end