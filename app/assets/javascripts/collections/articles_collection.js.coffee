App.Collections.Articles = Backbone.Collection.extend
  model: Article
  url: 'articles'
  
  index: ->
    @url = 'articles'
    @fetch()
    
  show: (slug)->
    @url = "#{ @url }/#{ slug }"
    @fetch()    
  