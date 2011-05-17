  App.Controllers.Articles = Backbone.Controller.extend({
    routes: {
      'articles/:slug': "edit",
      '': "index",
      'articles/new': "new"
    },
    
    initialize: function(options) {
      this.collection = options.collection
      this.collection.fetch();
    }
  });
