window.Article = Backbone.Model.extend

  idAttribute: "_id"
  
  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    if $(location).attr('pathname') is "/"
      @set "articleLink" : "articles/" + @get("slug")
    else
      @set "articleLink" : ""
      
  
