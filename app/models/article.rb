class Article < CouchRest::Model::Base

  property :slug
  property :title
  property :content
  property :author
  property :is_draft, TrueClass, default: false
  property :format,   String,    default: 'Markdown'
  property :tags,     [String]

  timestamps!

  validates_presence_of :title, :slug
  validates_uniqueness_of :slug

  def type
    self["couchrest-type"]
  end

  design do
    view :by_published_at,
      map: "
        function(doc) {
          if ((doc['couchrest-type'] == 'Article') && (doc['is_draft'] != true) && (doc['created_at'] != null)) {
            emit(doc['created_at'], 1);
          }
        }",
      reduce: "_sum"

    view :by_title
    view :by__id
    view :by_slug
    view :by_slug_and_published_at,
      map: "
        function(doc) {
          if ((doc['couchrest-type'] == 'Article') && (doc['is_draft'] != true) && (doc['slug'] != null) && (doc['created_at'] != null)) {
            emit([doc.slug, doc.created_at.substr(0, 10)], 1);
          }
        }",
      reduce: "_sum"

    view :article_comments,
      map: "
        function(doc) {
          if ((doc['couchrest-type'] == 'Comment')) {
            emit([doc.article_id, doc.created_at], 1);
          }
        }",
      reduce: "_sum"
  end

  def self.parse_time(params = { year: 0 })
    year = params[:year].to_i
    # only year param available
    if params[:month].blank?
      begin_time = Date.new(year)
      end_time = Date.new(year + 1)
    else
      month = params[:month].to_i

      if params[:day].blank?
        begin_time = Date.new(year, month)
        end_time = month == 12 ? Date.new(year + 1) : Date.new(year, month + 1)
      else
        begin_time = end_time = Date.new(year, month, params[:day].to_i)
      end
    end

    [begin_time, end_time]
  end

  def self.create_by_user(params, user)
    article = new(params[:article])
    article.author = user.id
    article.is_draft = params[:commit] == "Save" ? true : false
    article.save!
    article
  end

  def self.articles_by_time_slug(params)
    begin_time, end_time = self.parse_time(params)

    if params[:slug]
      articles = self.by_slug_and_published_at.
        startkey([params[:slug], begin_time]).
        endkey([params[:slug], end_time])
    else
      articles = self.by_published_at.
        startkey(begin_time).
        endkey(end_time)
    end
  end

  def attachments=(attachments)
    attachments.each do |attachment|
      self.create_attachment(:file => attachment, :name => attachment.original_filename)
    end
  end

  def tag_attributes=(tag_attributes)
    tag_attributes.split(/,\s*/).each do |tag|
      tags << tag unless tags.include?(tag)
    end
  end

  def to_param
    slug
  end

end
