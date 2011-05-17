Article = Backbone.Model.extend
  url: ->
    #"articles/#{ @id }"
    "articles/#{ @get("slug") }"
    # base = 'articles'
    # if @isNew()
    #   base
    # else
    #   "#{ base }/#{ @slug }"
  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    @set "articleLink":"/articles/" + @get("slug")
    
    # @comments = new App.Collections.Comments
    # @comments.url = @url() + '/comments'