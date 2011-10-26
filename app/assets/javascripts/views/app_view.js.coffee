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
      
  addAll: ->
    if $("#loader").length
      $("#loader").remove()
    $("#contents").children().remove()
    unless $("header").children().length
      $("header").append(@headerTemplate).fadeIn("slow")
    @collection.each(@addOne)
    unless $("footer").children().length
      $("footer").append(@footerTemplate).fadeIn("slow")
    
    if @collection.size() < 2
      $('#show-more-articles').addClass('invisible')
    else
      $('#show-more-articles').removeClass('invisible')
      
    $('#nav_home').click (e) ->
      return true if e.which == 2 or e.metaKey or e.ctrlKey

      e.preventDefault()
      Backbone.history.navigate($(e.target).attr('href'), true) 
      _gaq.push(['_trackPageview', $(location).attr('pathname')])
      # for hash style
      # window.location.hash = $(e.target).attr('href')
           
    $('article h1 a').click (e) ->
      return true if e.which == 2 or e.metaKey or e.ctrlKey

      e.preventDefault()
      if $(e.target).attr('href') isnt ""
        Backbone.history.navigate($(e.target).attr('href'), true)
        _gaq.push(['_trackPageview', $(location).attr('pathname')])
      # for hash style
      # window.location.hash = $(e.target).attr('href')
      
    $('#nav_home').addClass("active")

  events:
    'click .comments button[type="button"]' :  'showComments'
    'click #show-more-articles button'      :  'addMore'
    'click #sign_in'                        :  'login'
    
  addMore: ->
    $("#more").append(@moreLoadingTemplate)
    @collection.url = "articles/?skip=" + @collection.size()
    @collection.fetch({add: true})
    @collection.url = "articles"
    $("#more_loading").remove();
    
  showComments: (e) ->
    commentsViewEl = $("##{e.target.id}").parent()
    commentsView = new App.Views.Comments(el:commentsViewEl, articleId:e.target.id)
  
  login: (e) ->
    return true if e.which == 2 or e.metaKey or e.ctrlKey

    e.preventDefault()
