window.Article = Backbone.Model.extend

  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    if $(location).attr('pathname') is "/"
      @set "articleLink" : "articles/" + @get("slug")
    else
      @set "articleLink" : ""
