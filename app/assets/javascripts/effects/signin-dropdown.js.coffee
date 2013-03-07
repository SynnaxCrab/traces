$ ->
  $('.dropdown-toggle').on 'click', (e) ->
    e.preventDefault()
    li = $(this).parent('li')
    li.toggleClass('open')

  #   $(".dropdown-menu").live 'mouseup', (e) ->
  #   return false
  #
  # $(document).mouseup (e) ->
  #   if $(e.target).parent(".signin-fields").length is 0
  #     $('li.dropdown').removeClass('open')
