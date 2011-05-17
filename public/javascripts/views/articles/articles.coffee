App.Views.Articles = Backbone.View.extend
  el: $("#contents")
  
  initialize: ->
    _.bindAll this, 'addAll', 'addOne'
    
    @collection
      .bind('refresh', @addAll)
      .bind('add', @addone)
      
  addOne: (article) ->
    articleView = new ArticleView(model:article)
    articleRendered = articleView.render().el
    @el.append(articleRendered)
    
  addAll: ->
    @el.children().remove()
    @collection.each(@addOne)  