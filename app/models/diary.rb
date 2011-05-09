class Diary < Article
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
end