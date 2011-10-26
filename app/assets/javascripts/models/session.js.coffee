window.Session = Backbone.Model.extend
    
  default:
    sessionId : ""
    userName  : ""
    password  : ""
    userId    : ""
  
  url: ->
    if @isAuthorized
      "/users/sign_in"
    else
      "/users/sign_out"
       
  isAuthorized: ->
    Boolean @get("sessionId")