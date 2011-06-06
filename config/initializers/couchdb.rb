if Rails.env.production?
  #@@CouchDB = CouchRest.new("#{ENV['CLOUDANT_URL']}")
  @@CouchDB = CouchRest.new("#{ENV['COUCHONE_URL']}")
  @@CouchDB.default_database = 'traces'
elsif Rails.env.development?
  @@CouchDB = CouchRest.new("http://127.0.0.1:5984")
  @@CouchDB.default_database = 'traces_dev'
else
  @@CouchDB = CouchRest.new("http://127.0.0.1:5984")
  @@CouchDB.default_database = 'traces_test'
end

CouchRest::Model::Base.configure do |config|
  config.model_type_key = 'couchrest-type'
end
