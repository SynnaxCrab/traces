# overwrite Devise default

class RegistrationsController < Devise::RegistrationsController
  
  def new
    if User.all.empty?
      puts "empty"
      super
    else
      puts "not empty"
      redirect_to root_url
    end
  end
  
end