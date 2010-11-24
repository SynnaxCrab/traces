class ApplicationController < ActionController::Base
  protect_from_forgery
  
  USERNAME, PASSWORD = "lainuo", "h123456" 
  
  def post_slug(post)
    date_array = post.created_at.to_time.to_formatted_s(:db).split(' ').first.split('-')
    "/" + date_array.join("/") + "/" + post.id.to_s + "-" + post.slug #title.parameterize
  end
  
  # protected
  
  # def authenticate 
  #   authenticate_or_request_with_http_basic do |username, password| 
  #     username == USERNAME &&  
  #     password == PASSWORD 
  #     end 
  # end 
end
