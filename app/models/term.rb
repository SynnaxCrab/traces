class Term < ActiveRecord::Base
  has_and_belongs_to_many :posts
  
  validates_presence_of :name, :looking
  validates_uniqueness_of :name
  
  scope :tags, where("looking = 'tag'")
  scope :created, lambda { where("created_at <= ? ", Time.zone.now) }
  scope :recent, created.order("created_at desc")

  def posts_to_add=(posts_to_add)
    posts_to_add.each do |post_id|
      post = Post.find(post_id)
      posts << post
    end    
  end
  
  def to_param
    "#{slug}"
  end  
end
