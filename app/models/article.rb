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
  
  view_by :created_at
  view_by :slug
  view_by :slug_created_at, :map => "
    function(doc) {
      if ((doc['couchrest-type'] == 'Article') && (doc['slug'] != null) && (doc['created_at'] != null)) {
        emit([doc.slug, doc.created_at.substr(0, 10)]);
      }
    }
    "
    
  def tag_attributes=(tag_attributes)
    tag_attributes.split(',').each do |tag|     
      self.tags << tag.sub(/\s/, "")
    end
  end
  
  def to_param
    #{}"#{title.gsub(/[^a-z0-9]+/i, '-')}"
    #{}"#{id}-#{title.parameterize}"
    "#{slug}"
  end
  
  private
  def timestamps!
    
  end
end
