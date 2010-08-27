class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(params[:comment])
    
    if @comment.save
      redirect_to post_url(@comment.post_id)
    else
      redirect_to post_url(@comment.post_id)
    end      
  end
end
