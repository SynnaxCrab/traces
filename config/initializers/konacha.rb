Konacha.configure do |config|
  config.spec_dir     = "spec/javascripts"
  config.driver       = :poltergeist
end if defined?(Konacha)
