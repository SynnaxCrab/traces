App.Routers.Articles = Backbone.Router.extend
  routes:
    ""  :  "index"
    "articles/:slug"  :  "show"
    "/:year/:month/:day/:slug"  :  "show2"

  initialize: ->
    @session = new window.Session
    @session.fetch url: 'users/signed_in_check'
    @articlesCollection = new App.Collections.Articles
    @articlesView = new App.Views.Articles(el:$("body"), collection:@articlesCollection, session: @session)
    @articlesCollection.fetch()

  index: ->
    $('article').fadeIn(500)
    $('#show-more-articles').fadeIn(550)
    document.title = "Traces"
    @articlesCollection.each (article) ->
      article.set 'articleLink' : 'articles/' + article.get('slug')

  show: (slug) ->
    # @articlesCollection.show(slug)

  show2: (year, month, day, slug) ->
    @articlesCollection.show(slug)
