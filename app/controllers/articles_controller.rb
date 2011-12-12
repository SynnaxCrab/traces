class ArticlesController < ApplicationController
  layout :determine_layout
  before_filter :authenticate_user!, :except => [:index, :show, :show_redirect, :show_all, :feed, :more]

  def index
    skip = params[:skip].nil? ? 0 : params[:skip]
    @articles = Article.by_published_at :descending => true, :limit => 5, :skip => skip
    respond_to do |format|
      format.html
      format.json { render json: @articles}
    end
    #render :json => @articles
  end

  def drafts
    @articles = Article.by_saved_at :descending => true, :limit => 5
    respond_to do |format|
      format.html
      format.json { render json: @articles}
    end
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new_by_user(params[:article], params[:commit], current_user)
    if @article.save
      flash[:notice] = "Article was successfully created !"
      #TODO save as draft should not just redirect to @article
      redirect_to @article
    else
      render :new
    end
  end

  def edit
    @article = Article.by_slug(:key => params[:id]).first
  end

  def update
    @article = Article.by_slug(:key => params[:id]).first

    if @article.update_attributes(params[:article])
      flash[:notice] = "Article was successfully updated !"
      redirect_to @article
    else
      render :edit
    end
  end

  def show
    @article = Article.by_slug(:key => params[:id]).first
    #redirect_to article_slug(@article)
    respond_to do |format|
      format.html { redirect_or_render_404(@article) }
      format.json { render json: @article }
    end
  end

  def show_redirect
    @article = Article.by_slug(:key => params[:slug]).first
    #redirect_to article_slug(@article)
    redirect_or_render_404(@article)
  end

  def show_all

    @articles = Article.articles_by_time_slug(params, @begin_time, @end_time)

    if @articles.size == 1
      @article = @articles.first
      @comments = Article.by_comments_article_created_at(:startkey => [@article.id],
                                                         :endkey   => [@article.id, Time.now])
    end

    if (@article.nil? || @article.empty?) && (@articles.nil? || @articles.empty?)
      render :file => "#{Rails.root}/public/404.html", :layout => false, :status => 404
      return
    end

    respond_to do |format|
      format.html
    end
  end

  def feed
    @articles = Article.by_published_at :descending => true, :limit => 1

    respond_to do |format|
     format.html do
       redirect_to feed_path(:format => :atom), :status => :moved_permanently
     end
     format.xml do
       redirect_to feed_path(:format => :atom), :status => :moved_permanently
     end
     format.atom
    end
  end

  protected
  def redirect_or_render_404(article)
    if article.nil?
      render :file => "#{Rails.root}/public/404.html", :layout => false, :status => 404
    else
      redirect_to article_slug(article)
    end
  end

  def determine_layout
    if action_name == 'new' or action_name == 'edit'
      "articles_without_ga"
    else
      "articles"
    end
  end
end
