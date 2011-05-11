class CommentsController < ApplicationController
  # def create
  #   @post = Post.find(params[:post_id])
  #   @comment = @post.comments.build(params[:comment])
  #   
  #   respond_to do |format|
  #     if @comment.save
  #       format.html { redirect_to @post}
  #       format.js
  #     else
  #       format.html { redirect_to @post}
  #     end
  #   end    
  #   
  # end
  def create
    @article = Article.by_slug(:key => params[:article_id]).first
    @comment = Comment.new(params[:comment])
    @comment.article_id = @article.id
    
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @article }
        format.js
      else
        format.js
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
