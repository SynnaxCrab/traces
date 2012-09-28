App.Views.NewArticle = Backbone.View.extend
  tagName  : 'div'
  template :  JST["templates/new_article"].call(this)

  initialize: ->
    _.bindAll this, 'render'
    @render()

  render: ->
    $("#contents").hide().html(Mustache.to_html(@template, {})).fadeIn("slow")
