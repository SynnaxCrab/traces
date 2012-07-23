class DiariesController < ArticlesController
  before_filter :authenticate_user!

  def index
    @diaries = Diary.by_created_at :descending => true, :limit => 5
  end

  def new
    @diary = Diary.new
  end

  def create
    @diary = Diary.new_by_user(params[:diary], params[:commit], current_user)

    if params[:is_also_article]
      @article = Article.new_by_user(params[:diary], params[:commit], current_user)
        if @diary.save and @article.save
          flash[:notice] = "Both Diary and Article was successfully created !"
          redirect_to @article
        else
          flash[:error] = "Oops... Somthing goes wrong... :( "
          render :new
        end
    else
      if @diary.save
        flash[:notice] = "Diary was successfully created !"
        redirect_to @diary
      else
        flash[:error] = "Diary creation failed :( "
        render :new
      end
    end
  end

  def edit
    @diary = Diary.by_slug(:key => params[:id]).first
  end

  def update
    @diary = Diary.by_slug(:key => params[:id]).first

    if @diary.update_attributes(params[:diary])
      flash[:notice] = "Diary was successfully updated !"
      redirect_to @diary
    else
      render :edit
    end
  end

  def show
    @diary = Diary.by_slug(:key => params[:id]).first
  end
end
