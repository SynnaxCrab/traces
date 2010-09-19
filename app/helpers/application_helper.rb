module ApplicationHelper
  
  def post_slug(post)
    date_array = post.created_at.to_time.to_formatted_s(:db).split(' ').first.split('-')
    date_array.join("/") + "/" + post.id.to_s + "-" + post.title.parameterize
  end
end
