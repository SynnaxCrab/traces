App.Views.Articles = Backbone.View.extend
  headerTemplate : JST["templates/header"].call(this)
  footerTemplate : JST["templates/footer"].call(this)  
  
  initialize: ->
    _.bindAll this, 'addAll', 'addOne'
    
    @collection
      .bind('refresh', @addAll)
      .bind('add', @addOne)
      
  addOne: (article) ->
    articleView = new App.Views.Article(model:article)
    articleRendered = articleView.render().el
    $("#contents").append(articleRendered)
    # @el.append(articleRendered)
    
    $('article h1 a').click (e) ->
      return true if e.which == 2 or e.metaKey or e.ctrlKey

      e.preventDefault()
      window.location.hash = $(e.target).attr('href')
  addAll: ->
    $("#loader").remove()
    $("header").append(@headerTemplate).fadeIn("slow")
    @collection.each(@addOne)
    $("footer").append(@footerTemplate).fadeIn("slow")
    # @el.children().remove()
    # @el.append(@headerTemplate)
    # @collection.each(@addOne)
    # @el.append(@footerTemplate)
    
  events:
    'click .comments button'  :  'showComments'
    
  showComments: (e) ->
    # commentsView = new App.Views.Comments(slug:e.target.id)
    commentsViewEl = $("##{e.target.id}").parent()
    # commentsView = new App.Views.Comments(articleId:e.target.id)
    commentsView = new App.Views.Comments(el:commentsViewEl, articleId:e.target.id)
    