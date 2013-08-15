ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  include ActionDispatch::TestProcess
  FABRICATORS_PATH = File.join(File.dirname(__FILE__), '/fabricators')
  Article.database.recreate!
end
