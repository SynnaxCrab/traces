class TagsController < ApplicationController
  def index
    @tags = Term.tags.order("created_at")
    @tag = Term.new
    @dirs = `ls`
    
    respond_to do |format|
      format.html
      format.js
    end
  end

  def update
    @tag = Term.tags.where("name = ?", params[:id])
    
    if @tag.first.update_attributes(params[:tag])
      redirect_to tags_path
    end
  end  
  
  def show
    @tag = Term.tags.where("slug = ?", params[:id])
    @posts = Post.order("created_at DESC")
  end
  
  def create
    @tag = Term.new(params[:tag])
    @tag.looking = "tag"
    
    respond_to do |format|
      if @tag.save
        format.html { redirect_to tags_path }
        format.js
      else
        render :new
      end
    end
  end
  
end
