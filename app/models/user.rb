class User < CouchRest::Model::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  use_database CouchRest.database!("http://127.0.0.1:5984/devise_couch")
  
  property :name
  timestamps!
  
  view_by :email
end