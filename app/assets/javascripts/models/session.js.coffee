window.Session = Backbone.Model.extend

  idAttribute: "_id"

  isAuthorized: ->
    @get("_id")
