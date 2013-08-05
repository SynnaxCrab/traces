class ApplicationController < ActionController::Base
  before_filter :set_locale
  layout :layout_by_devise
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

  def render_404
    raise ActionController::RoutingError.new('Not Found')
  end

  protected
  def redirect_or_render_404(article)
    if article.nil?
      render :file => "#{Rails.root}/public/404.html", :layout => false, :status => 404
    else
      redirect_to article_slug(article)
    end
  end

  def layout_by_devise
    if devise_controller?
      "devise"
    else
      "application"
    end
  end

  def layout_by_google_analytics
    if action_name == 'new' or action_name == 'edit'
      "articles_without_ga"
    else
      "articles"
    end
  end
end
