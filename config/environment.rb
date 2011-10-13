# Load the rails application
require File.expand_path('../application', __FILE__)
require 'rack/cache'

Traces::Application.configure do
  # Enable compression
  config.middleware.insert_before ActionDispatch::Static, Rack::Deflater
  
  # Enable Static resources Cache
  # $cache = Memcache.new
  $cache = Dalli::Client.new('localhost:11211')
  config.middleware.use Rack::Cache, :metastore => $cache, :entitystore => 'file:tmp/cache/entity'
end

# Initialize the rails application
Traces::Application.initialize!
