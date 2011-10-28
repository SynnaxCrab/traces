$ ->  
  $('header a.brand').live 'click', (e) ->
    return true if e.which == 2 or e.metaKey or e.ctrlKey

    e.preventDefault()
    Backbone.history.navigate($(e.target).attr('href'), true) 
    _gaq.push(['_trackPageview', $(location).attr('pathname')])
    
  $('#nav_home').live 'click', (e) ->
    return true if e.which == 2 or e.metaKey or e.ctrlKey

    e.preventDefault()
    Backbone.history.navigate($(e.target).attr('href'), true) 
    _gaq.push(['_trackPageview', $(location).attr('pathname')])
    # for hash style
    # window.location.hash = $(e.target).attr('href')
       
  $('article h1 a').live 'click', (e) ->
    return true if e.which == 2 or e.metaKey or e.ctrlKey
    
    e.preventDefault()
    if $(e.target).attr('href') isnt ""
      Backbone.history.navigate($(e.target).attr('href'), true)
      _gaq.push(['_trackPageview', $(location).attr('pathname')])
    # for hash style
    # window.location.hash = $(e.target).attr('href')