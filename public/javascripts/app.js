  var ARTICLE_TEMPLATE = "<section id=\"post_meta\">\n    <p>\n    Created @ \n    <time datetime=\"{{datetime}}\">\n      {{datetime}}\n    </time>\n    </p>\n  </section>\n      <section id=\"post_content\">\n    <h1><a href=\"{{ articleLink }}\">{{title}}</a></h1>\n    {{{content}}}\n  </section>";
  var Markdown = new Showdown.converter();
  var App;
  App = {
    Views: {},
    Controllers: {},
    Collections: {},
    initialize: function() {
      var articlesList = new App.Collections.Articles;
      new App.Views.Articles({el:$("#contents"), collection:articlesList});
      //new App.Views.Articles({collection:articlesList});
      new App.Controllers.Articles({collection:articlesList});
      //alert(Backbone.history)
      //Backbone.history.start();
    }
  };