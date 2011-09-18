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
     @article = Article.new(params[:article])
     @article.author = current_user.username
     # if params[:commit] == "Save"
     #   @article.is_draft = true
     # else
     #   @article.is_draft = false
     # end
     params[:commit] == "Save" ? @article.is_draft = true : @article.is_draft = false
     # set format as markdown here 
     @article.format = "Markdown"
     if @article.save
       flash[:notice] = "Article was successfully created !"
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
     
     parse_time

     unless params[:slug].nil?
       @article = Article.by_slug_published_at(:startkey => [params[:slug], @begin_time], 
                                             :endkey => [params[:slug], @end_time])
       @article = @article.first
       unless @article.nil?
         @comments = Article.by_comments_article_created_at(:startkey => [@article.id], 
                                                          :endkey => [@article.id, Time.now])
       else
         @comments = []
       end
     else
       @articles = Article.by_published_at(:startkey => @begin_time, :endkey => @end_time)
     end
     
     if (@article.nil? || @article.empty?) && (@articles.nil? || @articles.empty?)
       render :file => "#{Rails.root}/public/404.html", :layout => false, :status => 404
       return
     end
     
     respond_to do |format|
       format.html
       format.json { render json: @article }
     end
     #redirect_to 404 if @article.nil? && @articles.nil?
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
   def parse_time

     if params[:month].nil?
       @begin_time = params[:year] + "-01-01"
       @end_time = (params[:year].to_i + 1).to_s + "-01-01"
     else
       @begin_time = params[:year] + "-" + params[:month]
       if (params[:month].to_i + 1 > 12)
         @end_time = (params[:year].to_i + 1).to_s + "-01"
       else
         if (params[:month].to_i + 1).to_s.length > 1
           @end_time = params[:year] + "-" + (params[:month].to_i + 1).to_s
         else
           @end_time = params[:year] + "-0" + (params[:month].to_i + 1).to_s
         end
       end

       if params[:day].nil?
         @begin_time += "-01"
         @end_time += "-01"
       else
         @begin_time = @begin_time + "-" + params[:day]
         @end_time = @begin_time.to_date.next.to_s
       end
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
