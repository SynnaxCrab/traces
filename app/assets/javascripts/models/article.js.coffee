window.Article = Backbone.Model.extend

  idAttribute: "_id"
  
  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    @set "articleLink" : "articles/" + @get("slug")