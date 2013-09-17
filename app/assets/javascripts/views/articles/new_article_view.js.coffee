App.Views.NewArticle = Backbone.View.extend
  tagName                    : 'div'
  id                         : 'post-editor'
  template                   : JST["templates/articles/article_editor"].call(this)
  titlePlaceholderTemplate   : JST["templates/articles/title_placeholder"].call(this)
  contentPlaceholderTemplate : JST["templates/articles/content_placeholder"].call(this)

  initialize: ->
    _.bindAll this, 'render', 'afterSave'
    @collection
      .on('add', @afterSave)
    @render()

  events:
    'change [contenteditable]' : 'doSave'

  render: ->
    @$el.html(@template)
    $("#contents").hide().html(@$el).fadeIn("slow")

  afterSave: ->
    Backbone.history.navigate('/articles/' + @slug, true)

  save: (e) ->
    e.preventDefault()
    newArticle = @newArticleAttributes()
    @slug = newArticle.slug
    @collection.create(newArticle)

  newArticleAttributes: ->
    {
      'title'   : $('#new_post_title').val(),
      'slug'    : $('#new_post_slug').val(),
      'content' : $('#new_post_content').val()
    }

