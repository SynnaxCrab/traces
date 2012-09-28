window.Markdown = new Showdown.converter()

window.App =
  Views: {}
  Routers: {}
  Collections: {}
  initialize: ->
    new App.Routers.Articles()
    Backbone.history.start({pushState: true})
