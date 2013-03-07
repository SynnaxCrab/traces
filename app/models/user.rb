class User < CouchRest::Model::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  use_database @@CouchDB.default_database

  property :email,                  String
  property :encrypted_password,     String
  property :reset_password_token,   String
  property :reset_password_sent_at, String
  property :remember_created_at,    DateTime
  property :sign_in_count,          Integer
  property :current_sign_in_at,     DateTime
  property :last_sign_in_at,        DateTime
  property :current_sign_in_ip,     String
  property :last_sign_in_ip,        String

  property :username
  property :name

  timestamps!
end
