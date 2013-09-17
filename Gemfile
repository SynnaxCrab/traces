source 'http://rubygems.org'

ruby '2.0.0'

gem 'rails'

# API
gem 'sinatra', require: false
gem 'sinatra-contrib', require: false
gem 'rabl'

gem 'sass-rails'
gem 'coffee-rails'
gem 'uglifier'
gem 'twitter-bootstrap-rails'
gem 'less-rails'
gem 'therubyracer'

# JavaScript libs
gem 'ejs'
gem 'jquery-rails'
gem 'backbone-rails'

# markdown
# TODO: since Heroku already support C extensions gem, replace it.
gem 'kramdown'

# auth
gem 'devise'

# CouchDB Related
gem 'couchrest_model', git: 'https://github.com/couchrest/couchrest_model.git'
gem 'orm_adapter'
gem 'orm_adapter_couchrest_model', '~> 0.0.1'
gem 'devise_couchrest_model', '~> 0.0.2'

# anti-spam
gem 'rakismet'

# memcached
gem 'dalli'

group :development, :test do
  gem 'thin'
  gem 'foreman'
  gem 'pry-rails'
  gem 'pry-doc'
  gem 'quiet_assets'
  gem 'fabrication'
  gem 'turn', :require => false
  gem 'rb-fsevent', :require => false

  # test js with mocha
  gem 'konacha'
  gem 'poltergeist'
  gem 'selenium-webdriver'

  # guard
  gem 'guard'
  gem 'guard-minitest'
  gem 'guard-konacha'
  gem 'terminal-notifier-guard', :require => false
end

group :production do
  gem 'rails_12factor'
  gem 'unicorn'
  gem 'newrelic_rpm'
end
