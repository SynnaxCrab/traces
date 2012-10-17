describe "Traces Articles Routes", ->
  describe "Should trigger routes correctly", ->
    beforeEach ->
      mockRouter = App.Routes.Articles.extend
        index: ->
        newArticle: ->
        show: ->

      @router = new mockRouter
      @routeSpy = jasmine.createSpy('routeSpy')
      try
        Backbone.history.start({silent:true, pushState:true})
      catch error
        {}
      @router.navigate('jasmine')

    afterEach ->
      @router.navigate('jasmine')

    it "should fires the index router with a blank hash", ->
      @router.bind("route:index", @routeSpy)
      @router.navigate('', true)
      expect(@routeSpy).toHaveBeenCalled()
      expect(@routeSpy.calls.length).toEqual(1)
      expect(@routeSpy).toHaveBeenCalledWith()

    it "should fires the newArticle router with articles/new", ->
      @router.bind("route:newArticle", @routeSpy)
      @router.navigate('articles/new', true)
      expect(@routeSpy).toHaveBeenCalled()
      expect(@routeSpy.calls.length).toEqual(1)
      expect(@routeSpy).toHaveBeenCalledWith()

    it "should fires the show router with articles/:slug", ->
      @router.bind("route:show", @routeSpy)
      @router.navigate('articles/a-great-moment', true)
      expect(@routeSpy).toHaveBeenCalled()
      expect(@routeSpy.calls.length).toEqual(1)
      expect(@routeSpy).toHaveBeenCalledWith('a-great-moment')
