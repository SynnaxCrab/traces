window.App =
  Views: {}
  Collections: {}
  initialize: ->
    new App.Router()
    Backbone.history.start({pushState: true})

    timer = 0
    $(document)
      .on 'focus', '[contenteditable]', ->
        $this = $(this)
        $this.data 'before', $this.html()
        return $this
      .on 'blur keyup paste', '[contenteditable]', ->
        $this = $(this)
        if $this.data('before') isnt $this.html()
          $this.data 'before', $this.html()
          clearInterval(timer)
          timer = setTimeout ( ->
            $this.trigger('change')
          ), 1000
          return $this

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
