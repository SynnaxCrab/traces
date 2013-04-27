$ ->
  $('.dropdown-toggle').on 'click', (e) ->
    e.preventDefault()
    li = $(this).parent('li')
    li.toggleClass('open')
