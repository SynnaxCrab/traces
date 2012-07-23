window.Comment = Backbone.Model.extend

  idAttribute: "_id"

  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    @set "commentId":@get("_id")
