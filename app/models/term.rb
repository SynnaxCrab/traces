class Term < ActiveRecord::Base
  has_and_belongs_to_many :posts
  
  validates_uniqueness_of :name
  
  scope :tags, where("looking = 'tag'")
  scope :created, lambda { where("created_at <= ? ", Time.zone.now) }
  scope :recent, created.order("created_at desc")
  
end
