class Article < CouchRest::Model::Base

  use_database @@CouchDB.default_database

  property :slug
  property :title
  property :content
  property :author
  property :is_draft
  property :format
  property :tags, [String]

  timestamps!

  validates_presence_of :title, :slug
  validates_uniqueness_of :slug

  view_by :saved_at, :map => "
    function(doc) {
      if ((doc['couchrest-type'] == 'Article') && (doc['is_draft'] == true) && (doc['created_at'] != null)) {
        emit(doc['created_at'], null);
      }
    }
  "
  view_by :published_at, :map => "
    function(doc) {
      if ((doc['couchrest-type'] == 'Article') && (doc['is_draft'] != true) && (doc['created_at'] != null)) {
        emit(doc['created_at'], null);
      }
    }
  "
  view_by :title
  view_by :_id
  view_by :slug
  view_by :slug_published_at, :map => "
    function(doc) {
      if ((doc['couchrest-type'] == 'Article') && (doc['is_draft'] != true) && (doc['slug'] != null) && (doc['created_at'] != null)) {
        emit([doc.slug, doc.created_at.substr(0, 10)]);
      }
    }
  "
  view_by :comments_article_created_at, :map => "
    function(doc) {
      if ((doc['couchrest-type'] == 'Comment')) {
        emit([doc.article_id, doc.created_at]);
      }
    }
  "

  def self.parse_time(params)
    if params[:month].nil?
      begin_time = params[:year] + "-01-01"
      end_time = (params[:year].to_i + 1).to_s + "-01-01"
    else
      begin_time = params[:year] + "-" + params[:month]
      if (params[:month].to_i + 1 > 12)
        end_time = (params[:year].to_i + 1).to_s + "-01"
      else
        if (params[:month].to_i + 1).to_s.length > 1
          end_time = params[:year] + "-" + (params[:month].to_i + 1).to_s
        else
          end_time = params[:year] + "-0" + (params[:month].to_i + 1).to_s
        end
      end

      if params[:day].nil?
        begin_time += "-01"
        end_time += "-01"
      else
        begin_time = begin_time + "-" + params[:day]
        end_time = begin_time.to_date.next.to_s
      end
    end
    [begin_time, end_time]
  end

  def self.new_by_user(param_article, param_commit, user)
    article = self.new(param_article)
    article.author = user.username
    article.format = "Markdown"
    param_commit == "Save" ? article.is_draft = true : article.is_draft = false
    article
  end

  def self.articles_by_time_slug(params, begin_time, end_time)
    begin_time, end_time = self.parse_time(params)

    unless params[:slug].nil?
      articles = self.by_slug_published_at(:startkey => [params[:slug], begin_time],
                                           :endkey   => [params[:slug], end_time])
    else
      articles = self.by_published_at(:startkey => begin_time, :endkey => end_time)
    end
  end

  def attachments=(attachments)
    attachments.each do |attachment|
      self.create_attachment(:file => attachment, :name => attachment.original_filename)
    end
  end

  def tag_attributes=(tag_attributes)
    tag_attributes.split(%r{,\s*}).each do |tag|
      self.tags << tag
    end
  end

  def to_param
    "#{slug}"
  end

end
