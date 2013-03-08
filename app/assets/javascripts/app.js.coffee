window.Markdown = new Showdown.converter()

window.App =
  Views: {}
  Routes: {}
  Collections: {}
  initialize: ->
    new App.Routes.Articles()
    Backbone.history.start({pushState: true})

    # All navigation that is relative should be passed through the navigate
    # method, to be processed by the router. If the link has a `data-bypass`
    #  attribute, bypass the delegation completely.
    $(document).on "click", "a[href]:not([data-bypass])", (e) ->
      root = '/' # TODO: add this to config
      # Get the absolute anchor href.
      href = { prop: $(this).prop("href"), attr: $(this).attr("href") }
      # Get the absolute root.
      root = location.protocol + "//" + location.host + root

      # Ensure the root is part of the anchor href, meaning it's relative.
      if (href.prop.slice(0, root.length) is root)
        # Stop the default event to ensure the link will not cause a page refresh.
        e.preventDefault()

        # `Backbone.history.navigate` is sufficient for all Routers and will
        # trigger the correct events. The Router's internal `navigate` method
        #  calls this anyways.  The fragment is sliced from the root.
        _gaq.push(['_trackPageview', href.attr])
        Backbone.history.navigate(href.attr, {trigger: true})
