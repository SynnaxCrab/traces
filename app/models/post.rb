class Post < ActiveRecord::Base
  
  validates_presence_of :title, :content
  
  scope :created, lambda { where("created_at <= ? ", Time.zone.now) }
  scope :recent, created.order("created_at desc")
  def to_param
    #{}"#{title.gsub(/[^a-z0-9]+/i, '-')}"
    "#{id}-#{title.parameterize}"
  end
end
