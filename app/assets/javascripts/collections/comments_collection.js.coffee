App.Collections.Comments = Backbone.Collection.extend
  model: Comment

  initialize: (options)->
    @url = "/api/articles/#{options.articleId}/comments"
