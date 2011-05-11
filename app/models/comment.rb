class Comment < CouchRest::Model::Base
  use_database @@CouchDB.default_database
  
  belongs_to :article
  
  property :email
  property :website
  property :name
  property :content
  
  timestamps!
  
  view_by :_id
  validates_presence_of :email, :name, :content
  validates_format_of :email, :with => /^([^\s]+)((?:[-a-z0-9]\.)[a-z]{2,})$/i
  validates_format_of :website, :with => /^((http|ftp|https?):\/\/((?:[-a-z0-9]+\.)+[a-z]{2,}))/
end
