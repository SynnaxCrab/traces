window.Article = Backbone.Model.extend
  url: ->
    "articles/#{ @get("slug") }"

  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    @set "articleLink":"/articles/" + @get("slug")