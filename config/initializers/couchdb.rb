if Rails.env.production?
  @@CouchDB = CouchRest.new("#{ENV['CLOUDANT_URL']}")
  @@CouchDB.default_database = 'traces'
else
  @@CouchDB = CouchRest.new("http://127.0.0.1:5984")
  @@CouchDB.default_database = 'traces_dev'
end

CouchRest::Model::Base.configure do |config|
  config.model_type_key = 'couchrest-type'
end