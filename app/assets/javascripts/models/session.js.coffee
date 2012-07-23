window.Session = Backbone.Model.extend

  # defaults:
  #   user :
  #     email  : "winfield301@gmail.com"
  #     password  : ""
  #     remember_me : "1"
  idAttribute: "_id"

  # url: ->
  #   if @isAuthorized
  #     "/users/sign_out"
  #   else
  #     "/users/sign_in"

  isAuthorized: ->
    @get("_id")
