class Article < CouchRest::Model::Base
  
  class ArticleNotFound < StandardError
  end
  
  use_database @@CouchDB.default_database
  
  property :slug
  property :title
  property :content
  property :author
  property :format
  property :tags, [String]
  
  timestamps!
  
  validates_presence_of :title, :slug
  validates_uniqueness_of :slug
    
  view_by :created_at
  view_by :title
  view_by :slug
  view_by :slug_created_at, :map => "
    function(doc) {
      if ((doc['couchrest-type'] == 'Article') && (doc['slug'] != null) && (doc['created_at'] != null)) {
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
