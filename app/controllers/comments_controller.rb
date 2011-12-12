class CommentsController < ApplicationController

  def index
    # @article = Article.by_slug(:key => params[:article_id]).first
    # @comments = Comment.by_article_created_at(:startkey => @article.id)
    @comments = Comment.by_article_created_at(:startkey => [params[:article_id]],
                                              :endkey => [params[:article_id], Time.now])
    respond_to do |format|
      format.json { render json: @comments }
    end
  end

  def create
    @comment = Comment.new_by_article(params)

    respond_to do |format|
      unless @comment.spam?
        if @comment.save!
          format.html { redirect_to @article }
          format.json { render json: @comment }
          format.js
        else
          format.js
        end
      else
        format.json { render json: "Go hell, Spammer!"}
      end
    end

  end

  def destroy
    @comment = Comment.by__id(:key => params[:id]).first
    @comment_id = @comment.id

    respond_to do |format|
      if @comment.destroy
        format.js
      else
        flash[:error] = "something goes wrong"
      end
    end

  end
end
