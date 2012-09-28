window.Article = Backbone.Model.extend

  # for CouchDB _id, but now we don't need it since
  # we mount Backbone App on api which generated output
  # by RABL
  # idAttribute: "_id"

  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    # below works with articles/article_view 's show function
    # @set "articleLink" : "articles/" + @get("slug")
    @set "articleLink" : "/articles/" + @get("slug")
