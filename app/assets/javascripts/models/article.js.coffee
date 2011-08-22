window.Article = Backbone.Model.extend

  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    @set "articleLink":"articles/" + @get("slug")