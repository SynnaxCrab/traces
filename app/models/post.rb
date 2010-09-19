class Post < ActiveRecord::Base
  has_many :comments, :dependent => :destroy
  has_and_belongs_to_many :terms
  
  validates_presence_of :title, :content
  #validates_uniqueness_of :slug
  
  scope :created, lambda { where("created_at <= ? ", Time.zone.now) }
  scope :recent, created.order("created_at desc")
  def to_param
    #{}"#{title.gsub(/[^a-z0-9]+/i, '-')}"
    "#{id}-#{title.parameterize}"
  end
end
