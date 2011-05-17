  App.Views.Articles = Backbone.View.extend({
    el: $("#contents"),
    
    initialize: function() {
      _.bindAll(this, 'addAll', 'addOne');
      this.collection.bind('refresh', this.addAll)
      this.collection.bind('add', this.addone);      
    },
    addOne: function(article) {
      var articleRendered, articleView;
      articleView = new App.Views.Article({
        model: article
      });
      articleRendered = articleView.render().el;
      //$("#contents").append(articleRendered);
      this.el.append(articleRendered);
    },
    addAll: function() {
      this.el.children().remove();
      return this.collection.each(this.addOne);
    }
  });
