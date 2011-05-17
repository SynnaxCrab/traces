  App.Views.Article = Backbone.View.extend({
    tagName: 'article',
    template: ARTICLE_TEMPLATE,
    initialize: function() {
      _.bindAll(this, 'render');
      return this.model.bind('change', this.render);
    },
    render: function() {
      var templateData;
      templateData = this.model.toJSON();
      templateData.content = Markdown.makeHtml(templateData.content);
      $(this.el).html(Mustache.to_html(this.template, templateData)).fadeIn("slow");
      return this;
    }
  });
