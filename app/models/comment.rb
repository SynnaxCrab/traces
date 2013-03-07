class Comment < CouchRest::Model::Base
  use_database @@CouchDB.default_database
  include Rakismet::Model

  belongs_to :article

  property :email
  property :website
  property :name
  property :content

  timestamps!

  rakismet_attrs :author => :name, :author_email => :email, :author_url => :website, :content => :content

  def type
    self["couchrest-type"]
  end

  design do
    view :by__id
    view :by_article_created_at, :map => "
      function(doc) {
        if ((doc['couchrest-type'] == 'Comment')) {
          emit([doc.article_id, doc.created_at]);
        }
      }
    "
  end

  validates_presence_of :email, :name, :content
  validates_format_of :email, :with => /^([^\s]+)((?:[-a-z0-9]\.)[a-z]{2,})$/i
  validates_format_of :website, :with => /(^$)|^((http|ftp|https?):\/\/((?:[-a-z0-9]+\.)+[a-z]{2,}))/

  def self.new_by_article(params)
    params = params.with_indifferent_access
    unless params[:article_id].nil?
      article = Article.by__id(:key => params[:article_id]).first
      if article.nil?
        article = Article.by_slug(:key => params[:article_id]).first
      end
      comment = Comment.new(params[:comment])
      comment.article_id = article.id
    else
      comment = Comment.new(params[:comment])
      comment.article_id = params[:comment][:article_id]
    end
    comment
  end
end
