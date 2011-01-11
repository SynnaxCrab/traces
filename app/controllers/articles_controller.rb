class ArticlesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show, :show_redirect, :show_all, :feed]

   def index
     @articles = Article.by_created_at :descending => true, :limit => 5
   end
   
   def new
     @article = Article.new
   end
   
   def create
     @article = Article.new(params[:article])
     @article.author = current_user.name
     if @article.save
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
       redirect_to @article
     else
       render :edit
     end   
   end
   
   def show
     @article = Article.by_slug(:key => params[:id]).first
     redirect_to article_slug(@article)
   end
   
   def show_redirect
     @article = Article.where("id = ?", params[:title].to_i)
     redirect_to article_slug(@article)
   end

   def show_all
     
     parse_time

     unless params[:slug].nil?
       @article = Article.by_slug(:key => params[:slug])
     else
       @articles = Article.by_created_at(:startkey => @begin_time, :endkey => @end_time)
     end
     
   end
   
   def feed
    
   end
   
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
end
