class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(params[:comment])
    
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @post}
        format.js
      else
        format.html { redirect_to @post}
      end
    end    
    
  end
end
