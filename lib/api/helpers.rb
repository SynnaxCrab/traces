module API
  module Helpers
    def core_class(api_version)
      Object.const_get(:API).const_get("V#{api_version}").const_get(:Core).new
    end

    def view_path(api_version)
      "#{File.expand_path File.dirname(__FILE__)}/v#{api_version}/views"
    end

    def warden
      env['warden']
    end

    def authenticated?
      return true if warden.authenticated?
      false
    end

    def current_user
      warden.user
    end
  end
end
