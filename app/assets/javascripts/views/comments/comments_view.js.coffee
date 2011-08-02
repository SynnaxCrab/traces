App.Views.Comments = Backbone.View.extend
  #template : COMMENT_HEADER
  template : JST["templates/comment_header"].call(this)
  #newCommentTemplate : NEW_COMMENT
  newCommentTemplate : JST["templates/new_comment"].call(this)
  initialize: ->
    _.bindAll this, 'addAll', 'addOne'
    
    # @el = $("##{@options.slug}").parent() 
    # @el = $("##{@options.articleId}").parent() 
    # @collection = new App.Collections.Comments(article_slug:@options.slug)
    @collection = new App.Collections.Comments(articleId:@options.articleId)
    @collection
      .bind('reset', @addAll)
      .bind('add', @addOne)
    @collection.fetch()
    
  addOne: (comment) ->
    commentView = new App.Views.Comment(model:comment, id:"comment-"+comment.get("_id"))
    commentRendered = commentView.render().el
    @el.find(".comments_list").append(commentRendered)

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
      "content"          :  $("#comment_content_" + articleId).val(),
      "email"            :  $("#comment_email_" + articleId).val(),
      "name"             :  $("#comment_name_" + articleId).val(),
      "website"          :  $("#comment_website_" + articleId).val(),
      #"couchrest-type"   :  "Comment",
      #created_at       :  new Date(),
      #updated_at       :  new Date()
    }
    }