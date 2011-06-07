App.Views.Article = Backbone.View.extend
  tagName  :  'article'
  #template :  ARTICLE_TEMPLATE
  template :  JST["templates/article"].call(this)
  
  initialize: ->
    _.bindAll this, 'render'
    @model.bind 'change', @render
    
  render: ->
    templateData = @model.toJSON()
    templateData.content = Markdown.makeHtml(templateData.content)
    $(@el).html(Mustache.to_html(@template, templateData)).fadeIn("slow")
    return this