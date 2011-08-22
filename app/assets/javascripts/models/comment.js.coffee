window.Comment = Backbone.Model.extend
    
  initialize: ->
    @set "datetime":new Date(@get("created_at"))
    @set "commentId":@get("_id")   