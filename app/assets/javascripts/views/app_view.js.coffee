App.Views.Articles = Backbone.View.extend  
  initialize: ->
    _.bindAll this, 'addAll', 'addOne'
    
    @collection
      .bind('refresh', @addAll)
      .bind('add', @addOne)
      
  addOne: (article) ->
    articleView = new App.Views.Article(model:article)
    articleRendered = articleView.render().el
    @el.append(articleRendered)
    # article.comments.fetch()
    
    $('article h1 a').click (e) ->
      return true if e.which == 2 or e.metaKey or e.ctrlKey

      e.preventDefault()
      window.location.hash = $(e.target).attr('href')
  addAll: ->
    @el.children().remove()
    @collection.each(@addOne)
    #alert(@el.data("events"))
  
  events:
    'click .comments button'  :  'showComments'
    
  showComments: (e) ->
    # commentsView = new App.Views.Comments(slug:e.target.id)
    commentsViewEl = $("##{e.target.id}").parent()
    # commentsView = new App.Views.Comments(articleId:e.target.id)
    commentsView = new App.Views.Comments(el:commentsViewEl, articleId:e.target.id)
    