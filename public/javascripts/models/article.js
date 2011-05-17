  var Article;
  Article = Backbone.Model.extend({
    url: function() {
      var base;
      base = 'articles';
      if (this.isNew()) {
        return base;
      } else {
        return base;
      }
    }
  });
