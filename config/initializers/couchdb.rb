if Rails.env.production?
  @@CouchDB = CouchRest.new("#{ENV['CLOUDANT_URL']}")
  @@CouchDB.default_database = 'traces'
else
  @@CouchDB = CouchRest.new("http://127.0.0.1:5984")
  @@CouchDB.default_database = 'traces'
end