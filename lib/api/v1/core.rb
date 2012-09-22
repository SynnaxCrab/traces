module API
  module V1
    class Core
      def articles(params)
        skip = params[:skip].nil? ? 0 : params[:skip]
        # todo accept :limit as a param as well
        articles = Article.by_published_at :descending => true, :limit => 5, :skip => skip
      end

      def article(params)
        article = Article.by_slug(:key => params[:captures][0]).first
      end

      def comments(params)
        comments = Comment.by_article_created_at(
          :startkey => [params[:captures][0]],
          :endkey => [params[:captures][0], Time.now]
        )
      end

      def comments_create(params)
        comment = Comment.new_by_article(params)

        return {:spam => true, :message => "Go hell, Spammer!"} if comment.spam?
        return {:spam => false, :message => "Comment failed. Sorry!"} unless comment.save!

        comment
      end

    end
  end
end
