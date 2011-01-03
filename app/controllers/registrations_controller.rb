# overwrite Devise default

class RegistrationsController < Devise::RegistrationsController
  #def new
  #  if Admin.all.empty?
  #    super
  #  else
  #    redirect_to root_url
  #  end
  #end
end