CouchRest::Model::Base.configure do |config|
  config.model_type_key = 'couchrest-type'

  if Rails.env.production?
    uri = URI.parse(ENV['CLOUDANT_URL'])
    config.connection = {
      :protocol => uri.scheme,
      :host     => uri.host,
      :port     => uri.port,
      :username => uri.user,
      :password => uri.password
    }
  end
end
