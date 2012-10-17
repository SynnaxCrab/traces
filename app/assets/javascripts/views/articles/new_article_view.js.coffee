App.Views.NewArticle = Backbone.View.extend
  tagName  : 'div'
  id       : 'new_post'
  template : JST["templates/new_article"].call(this)

  initialize: ->
    _.bindAll this, 'render', 'afterSave'
    @collection
      .bind('add', @afterSave)
    @render()

  events:
    'click .save_post' : 'save'

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

