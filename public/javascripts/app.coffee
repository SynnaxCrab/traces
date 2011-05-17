App =
  Views: {}
  Controlllers: {}
  Collections: {}
  initialize: ->
    new App.Controllers.Articles
    Backbone.history.start()