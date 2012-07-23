App.Collections.Comments = Backbone.Collection.extend
  model: Comment

  initialize: (options)->
    @url = "/articles/#{options.articleId}/comments"
