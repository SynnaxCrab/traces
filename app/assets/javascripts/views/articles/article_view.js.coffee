App.Views.Article = Backbone.View.extend
  tagName  :  'article'
  template :  JST["templates/article"].call(this)

  initialize: ->
    _.bindAll this, 'render'
    @model.bind 'change', @render
    @$el.attr('id', @model.id)

  render: ->
    templateData = @model.toJSON()
    templateData.content = Markdown.makeHtml(templateData.content)
    $(@el).html(Mustache.to_html(@template, templateData)).fadeIn("slow")
    return this

  events:
    'click .comments button[type="button"]' :  'showComments'

  show: (e) ->
    return true if @model.get('articleLink').indexOf('article') == -1
    return true if e.which == 2 or e.metaKey or e.ctrlKey

    e.preventDefault()
    if $(e.target).attr('href') isnt ""
      Backbone.history.navigate($(e.target).attr('href'), true)
      _gaq.push(['_trackPageview', $(location).attr('pathname')])

    @model.set 'articleLink' : @model.get('slug')
    document.title = @model.get('title') + " | Traces"
    $('#show-more-articles').fadeOut()
    $('article').parent().children().fadeOut(300)
    $(@el).fadeIn(500)

  showComments: (e) ->
    commentsViewEl = $(@el).find('.comments')
    commentsView = new App.Views.Comments(el:commentsViewEl, articleId:e.target.id, session:@options.session)
