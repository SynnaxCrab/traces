App.Routers.Articles = Backbone.Router.extend
  routes:
    # "articles/:slug"  :  "edit"  
    ""  :  "index"
    "articles/:slug"  :  "show"
    "/articles/:slug"  :  "show"
    "/:year/:month/:day/:slug"  :  "show2"
    
  initialize: ->
    @articlesCollection = new App.Collections.Articles
    @articlesView = new App.Views.Articles(el:$("body"), collection:@articlesCollection)
    
  index: ->
    @articlesCollection.index()
      
  show: (slug) ->
    @articlesCollection.show(slug)
    
  show2: (year, month, day, slug) ->
    @articlesCollection.show(slug)