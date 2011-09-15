class Article < CouchRest::Model::Base
  
  class ArticleNotFound < StandardError
  end
  
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
  
  def attachments=(attachments)
    attachments.each do |attachment|
      #raise "#{attachment.class}"
      self.create_attachment(:file => attachment, :name => attachment.original_filename)
    end
  end 
  
  def tag_attributes=(tag_attributes)
    tag_attributes.split(%r{,\s*}).each do |tag|     
      self.tags << tag
    end
  end
  
  def to_param
    #{}"#{title.gsub(/[^a-z0-9]+/i, '-')}"
    #{}"#{id}-#{title.parameterize}"
    "#{slug}"
  end
  
  private

end
