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
    
    #if @comment.save
    #  redirect_to post_url(@comment.post_id)
    #else
    #  redirect_to post_url(@comment.post_id)
    #end      
    
  end
end
