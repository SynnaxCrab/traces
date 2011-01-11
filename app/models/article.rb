class Article < CouchRest::Model::Base
  
  use_database @@CouchDB.default_database
  
  property :slug
  property :title
  property :content
  property :author
  property :format
  property :tags
  
  timestamps!
  
  view_by :created_at
  view_by :slug
  
  def to_param
    #{}"#{title.gsub(/[^a-z0-9]+/i, '-')}"
    #{}"#{id}-#{title.parameterize}"
    "#{slug}"
  end
end
