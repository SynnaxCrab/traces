App.Views.Articles = Backbone.View.extend
  headerTemplate      : JST["templates/header"].call(this)
  footerTemplate      : JST["templates/footer"].call(this)
  moreLoadingTemplate : JST["templates/loading"].call(this)
  
  initialize: ->
    _.bindAll this, 'addAll', 'addOne'
    
    @collection
      .bind('reset', @addAll)
      .bind('add', @addOne)
      
  addOne: (article) ->
    articleView = new App.Views.Article(model:article)
    articleRendered = articleView.render().el
    $("#contents").append(articleRendered)
    
    $('article h1 a').click (e) ->
      return true if e.which == 2 or e.metaKey or e.ctrlKey

      e.preventDefault()
      Backbone.history.navigate($(e.target).attr('href'), true); 
      # window.location.hash = $(e.target).attr('href')
      
  addAll: ->
    $("#loader").remove()
    $("header").children().remove()
    $("#contents").children().remove()
    $("footer").children().remove()
    $("header").append(@headerTemplate).fadeIn("slow")
    @collection.each(@addOne)
    $("footer").append(@footerTemplate).fadeIn("slow")
    $('#nav_home').click (e) ->
      return true if e.which == 2 or e.metaKey or e.ctrlKey

      e.preventDefault()
      Backbone.history.navigate($(e.target).attr('href'), true); 
      # window.location.hash = $(e.target).attr('href')
    
  events:
    'click .comments button'  :  'showComments'
    'click #more button'      :  'addMore'
    
  addMore: ->
    $("#more").append(@moreLoadingTemplate)
    @collection.url = "articles/?skip=" + @collection.size()
    @collection.fetch({add: true})
    @collection.url = "articles"
    $("#more_loading").remove();
    
  showComments: (e) ->
    commentsViewEl = $("##{e.target.id}").parent()
    commentsView = new App.Views.Comments(el:commentsViewEl, articleId:e.target.id)
    