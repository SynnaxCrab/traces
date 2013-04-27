App.Collections.Articles = Backbone.Collection.extend
  model: Article
  url: '/api/articles'

  index: ->
    @url = '/api/articles'
    @fetch()

  show: (slug)->
    if $(location).attr('pathname') is "/"
      @url = "#{ @url }/#{ slug }"
    else
      @url = "#{ slug }"
    @fetch()
