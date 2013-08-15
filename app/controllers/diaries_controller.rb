class DiariesController < ArticlesController
  before_action :authenticate_user!
  before_action :set_diary, only: [:show, :edit, :update, :destroy]

  def index
    @diaries = Diary.by_created_at.descending.limit(5)
  end

  def new
    @diary = Diary.new
  end

  def create
    @diary = Diary.create_by_user(params, current_user)

    respond_with(@diary)
  end

  def edit
  end

  def update
    @diary.update_attributes(params[:diary])
    respond_with(@diary)
  end

  def show
  end

  private
    def set_diary
      @diary = Diary.by_slug.key(params[:id]).first
    end
end
