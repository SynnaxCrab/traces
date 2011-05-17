App.Controllers.Articles = Backbone.Controller.extend
  routes:
    'articles/:slug'  :  "edit"  
    ''                :  "index"
    'articles/new'    :  "new"
  
  