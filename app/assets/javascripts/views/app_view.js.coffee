App.Views.Articles = Backbone.View.extend
  headerTemplate      : JST["templates/header"].call(this)
  footerTemplate      : JST["templates/footer"].call(this)
  moreLoadingTemplate : JST["templates/loading"].call(this)
  
  initialize: ->
    _.bindAll this, 'addAll', 'addOne', 'loggedIn', 'loggedOut'
    
    @collection
      .bind('reset', @addAll)
      .bind('add', @addOne)
    
    @options.session.bind('change', @loggedIn)
    @options.session.bind('loggedOut', @loggedOut)
    
  addOne: (article) ->
    articleView = new App.Views.Article(model:article, session:@options.session)
    articleRendered = articleView.render().el
    $("#contents").append(articleRendered)
      
  addAll: ->
    if $("#loader").length
      $("#loader").remove()
    $("#contents").children().remove()
    
    @addHeader()
    @collection.each(@addOne)
    @addFooter()
 
    if @collection.size() < 2
      $('#show-more-articles').addClass('invisible')
    else
      $('#show-more-articles').removeClass('invisible')
      
    $('#nav_home').addClass("active")

  events:
    'click .comments button[type="button"]' :  'showComments'
    'click #show-more-articles button'      :  'addMore'
    'click #sign-in button'                 :  'login'
    'click #sign-out a'                     :  'logout'
  
  addHeader: ->
    unless $("header").children().length
      $("header").append(@headerTemplate).fadeIn("slow")
    if @options.session.isAuthorized()
      @loggedIn()
  
  addFooter: ->
    unless $("footer").children().length
      $("footer").append(@footerTemplate).fadeIn("slow")
      
  addMore: ->
    $("#more").append(@moreLoadingTemplate)
    @collection.url = "articles/?skip=" + @collection.size()
    @collection.fetch({add: true})
    @collection.url = "articles"
    $("#more_loading").remove();
    
  showComments: (e) ->
    commentsViewEl = $("##{e.target.id}").parent()
    commentsView = new App.Views.Comments(el:commentsViewEl, articleId:e.target.id, session:@options.session)
  
  login: (e) ->
    return true if e.which == 2 or e.metaKey or e.ctrlKey

    e.preventDefault()
    
    email = $('input[name="session[email]"]').val()
    password = $('input[name="session[password]"]').val()
    rememberMe = if $('input[name="remember_me"]').is(':checked') then 1 else 0
    
    if email is "" or password is ""
      return false
    
    @options.session.set(
      user: 
        "email"       : email
        "password"    : password
        "remember_me" : rememberMe
      {silent : true})
            
    @options.session.save({}, url : 'users/sign_in')
  
  logout: (e) ->
    return true if e.which == 2 or e.metaKey or e.ctrlKey
    e.preventDefault()
    @options.session.fetch url: 'users/sign_out'
    @options.session.trigger("loggedOut")
    @options.session.unset '_id', silent : true
    
  loggedIn: ->
    $('li.dropdown').removeClass('open')
    $('#sign-in').addClass('invisible')
    $('#sign-out').removeClass('invisible')
    
  loggedOut: ->
    $('#sign-in').removeClass('invisible')
    $('#sign-out').addClass('invisible')