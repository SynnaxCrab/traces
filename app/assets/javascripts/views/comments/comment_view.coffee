App.Views.Comment = Backbone.View.extend
  tagName  :  "li"
  template :  COMMENT_TEMPLATE
  
  initialize: ->
    _.bindAll this, 'render'
    @model.bind 'change', @render
    
  render: ->
    templateData = @model.toJSON()
    templateData.content = Markdown.makeHtml(templateData.content)
    $(@el).html(Mustache.to_html(@template, templateData)).fadeIn("slow")
    return this