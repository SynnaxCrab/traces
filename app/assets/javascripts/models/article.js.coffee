window.Article = Backbone.Model.extend
  urlRoot: '/api/articles'

  initialize: ->
    @set 'datetime' : new Date(@get('created_at')) if @get('created_at')
    @set 'articleLink' : '/articles/' + @get('slug') if @get('slug')
