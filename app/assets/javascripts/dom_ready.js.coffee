# $ ->  
#   $('article h1 a').click (e) ->
#     return true if e.which == 2 or e.metaKey or e.ctrlKey
# 
#     e.preventDefault()
#     window.location.hash = $(e.target).attr('href')
#     
#   $('#nav_home').click (e) ->
#     return true if e.which == 2 or e.metaKey or e.ctrlKey
# 
#     e.preventDefault()
#     window.location.hash = $(e.target).attr('href')