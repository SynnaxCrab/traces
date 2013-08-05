module ArticlesHelper
  def title_content(article)
    content_for :title do
      article.title || 'Traces'
    end
  end
end
