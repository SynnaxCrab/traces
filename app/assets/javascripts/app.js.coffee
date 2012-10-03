window.Markdown = new Showdown.converter()

window.App =
  Views: {}
  Routes: {}
  Collections: {}
  initialize: ->
    new App.Routes.Articles()
    Backbone.history.start({pushState: true})
