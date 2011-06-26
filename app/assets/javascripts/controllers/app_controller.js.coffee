App.Controllers.Articles = Backbone.Controller.extend
  routes:
    # "articles/:slug"  :  "edit"  
    ""  :  "index"
    "/articles/:slug"  :  "show"
    "/:year/:month/:day/:slug"  :  "show2"
    
  initialize: ->
    @articlesCollection = new App.Collections.Articles
    @articlesView = new App.Views.Articles(el:$("body"), collection:@articlesCollection)
    
  index: ->
    isInitReq = $(".is_init_req").length
    #articlesView = new App.Views.Articles({el:$("#contents"), collection:@articlesCollection})
    if isInitReq is 0
      @articlesCollection.index()
      
  show: (slug) ->
    $(".is_init_req").remove()
    @articlesCollection.show(slug)
    
  show2: (year, month, day, slug) ->
    $(".is_init_req").remove()
    @articlesCollection.show(slug)