App.Views.Comments = Backbone.View.extend
  template : JST["templates/comment_header"].call(this)
  newCommentTemplate : JST["templates/new_comment"].call(this)
  initialize: ->
    _.bindAll this, 'addAll', 'addOne'

    @collection = new App.Collections.Comments(articleId:@options.articleId)
    @collection
      .bind('reset', @addAll)
      .bind('add', @addOne)
      .bind('create', @addOne)
    @collection.fetch()

  addOne: (comment) ->
    commentView = new App.Views.Comment(model:comment, id:"comment-"+comment.get("id"))
    commentRendered = commentView.render().el
    $(@el).find(".comments_list").append(commentRendered)

  addAll: ->
    $(@el).children().remove()
    templateData = comments_count:@collection.length
    $(@el).append(Mustache.to_html(@template, templateData)).fadeIn("fast")
    @collection.each(@addOne)
    $(@el).append(Mustache.to_html(@newCommentTemplate, {articleId:@options.articleId})).fadeIn("slow")

  events:
    'click .comments button[type="submit"]'   :  'newComment'

  newComment: (e) ->
    e.preventDefault()

    targetId = e.target.id
    articleId = targetId.split("_")[2]
    @collection.create(@newCommentAttributes(articleId))

  newCommentAttributes: (articleId) ->
    return  {
      "article_id"       :  articleId
      "content"          :  $("#comment_content_" + articleId).val(),
      "email"            :  $("#comment_email_" + articleId).val(),
      "name"             :  $("#comment_name_" + articleId).val(),
      "website"          :  $("#comment_website_" + articleId).val(),
    }
