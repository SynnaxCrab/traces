# window.ARTICLE_TEMPLATE = "<section id=\"post_meta\">\n    <p>\n    Created @ \n    <time datetime=\"{{datetime}}\">\n      {{datetime}}\n    </time>\n    </p>\n  </section>\n      <section id=\"post_content\">\n    <h1><a href=\"{{ articleLink }}\">{{title}}</a></h1>\n    {{{content}}}\n  </section> <section id=\"comments\"><button id=\"{{_id}}\">View Comments</button></section>";
# window.COMMENT_TEMPLATE = "<p><a href=\"{{website}}\">{{name}}</a> wrote: </p>\n  Created @\n  <p><a href=\"#comment-{{commentId}}\">{{datetime}}</a></p>\n  {{{content}}}"
# window.COMMENT_HEADER = "<h3>\n  <span id=\"comments_count\">{{comments_count}} Comments left to this article\n</h3>\n\n<ol id=\"comments_list\">\n</ol>"
# window.NEW_COMMENT = "<p>Leave Your Comment</p>  \n<p> \n  <input id=\"comment_name\" name=\"comment[name]\" size=\"30\" type=\"text\" /> *\n  <label for=\"comment_name\">Name</label> \n</p> \n<p> \n  <input id=\"comment_email\" name=\"comment[email]\" size=\"30\" type=\"text\" /> *\n  <label for=\"comment_mail\">Mail</label> \n</p> \n<p> \n  <input id=\"comment_website\" name=\"comment[website]\" size=\"30\" type=\"text\" /> \n  <label for=\"comment_website\">Website</label> \n</p> \n<p> \n  <textarea cols=\"60\" id=\"comment_content\" name=\"comment[content]\" rows=\"12\"></textarea> \n</p> \n<p> \n  <input id=\"comment_commit_{{articleId}}\" name=\"commit\" type=\"submit\" value=\"Leave Your Comment\" /> \n</p>"

window.Markdown = new Showdown.converter()

window.App =
  Views: {}
  Controllers: {}
  Collections: {}
  initialize: ->
    new App.Controllers.Articles()
    Backbone.history.start()