class User < CouchRest::Model::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  use_database @@CouchDB.default_database

  property :username
  property :name

  timestamps!

  view_by :email
end