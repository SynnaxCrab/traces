Article = Backbone.Model.extend
  url: ->
    base = 'articles'
    if @isNew()
      base
    else
      base