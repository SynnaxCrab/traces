source 'http://rubygems.org'

gem 'rails', '3.2.7'
# code traces vendor files gem
# TODO: seperate them individually
gem 'traces-vendor'

# API
gem 'sinatra'
gem 'sinatra-contrib'
gem 'rabl'

gem 'dynamic_form'

group :assets do
  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier'
  gem 'twitter-bootstrap-rails'
end

# JavaScript libs
gem 'ejs'
gem 'jquery-rails'
gem 'backbone-rails'

# markdown
# TODO: since Heroku already support C extensions gem, replace it.
gem 'kramdown'

# auth
gem 'devise', '1.5.2'

# CouchDB Related
gem 'couchrest_model'
gem 'orm_adapter', :git => 'git://github.com/shenoudab/orm_adapter.git'
gem 'devise_couch', :git => 'git://github.com/winfield/devise_couch.git'

# anti-spam
gem 'rakismet'

# memcached
gem 'dalli'

# deploy
gem 'capistrano'
gem 'rvm-capistrano'

group :development, :test do
  gem 'thin'
  gem 'foreman'
  gem 'pry'
  gem 'pry-doc'
  gem 'factory_girl_rails'
  gem 'turn', :require => false
  gem 'ruby-prof'
  gem 'rb-fsevent', :require => false
  gem 'jasmine'
  gem 'jasminerice'
  gem 'guard'
  gem 'guard-test'
  gem 'guard-jasmine'
end

group :production do
  gem 'unicorn'
  gem 'newrelic_rpm'
end
