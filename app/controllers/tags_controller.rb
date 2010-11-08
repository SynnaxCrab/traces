class TagsController < ApplicationController
  def index
    @tags = Term.tags.order("created_at")
    @tag = Term.new
  end
  
  def new
    @tag = Term.new
  end
  
  def show

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
