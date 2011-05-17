App.Views.Comments = Backbone.View.extend
  template : COMMENT_HEADER
  newCommentTemplate : NEW_COMMENT
  initialize: ->
    _.bindAll this, 'addAll', 'addOne'
    
    # @el = $("##{@options.slug}").parent() 
    # @el = $("##{@options.articleId}").parent() 
    # @collection = new App.Collections.Comments(article_slug:@options.slug)
    @collection = new App.Collections.Comments(articleId:@options.articleId)
    @collection
      .bind('refresh', @addAll)
      .bind('add', @addOne)
    @collection.fetch()
    
  addOne: (comment) ->
    commentView = new App.Views.Comment(model:comment, id:"comment-"+comment.get("_id"))
    commentRendered = commentView.render().el
    @el.find("#comments_list").append(commentRendered)

  addAll: ->
    @el.children().remove()
    templateData = comments_count:@collection.length
    @el.append(Mustache.to_html(@template, templateData)).fadeIn("fast")
    @collection.each(@addOne)
    @el.append(Mustache.to_html(@newCommentTemplate, {articleId:@options.articleId})).fadeIn("slow")
    #alert(@el.data("events"))
    
  events:
    'click input:submit'   :  'newComment'
    
  newComment: (e) ->
    targetId = e.target.id
    articleId = targetId.split("_")[2]
    #alert(articleId)
    @collection.create(@newCommentAttributes(articleId))  
  
  newCommentAttributes: (articleId) ->
    #alert(articleId)
    return { comment: {
      "article_id"       :  articleId
      "content"          :  $("#comment_content").val(),
      "email"            :  $("#comment_email").val(),
      "name"             :  $("#comment_name").val(),
      "website"          :  $("#comment_website").val(),
      #"couchrest-type"   :  "Comment",
      #created_at       :  new Date(),
      #updated_at       :  new Date()
    }
    }