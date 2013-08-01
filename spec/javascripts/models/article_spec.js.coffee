#= require spec_helper
#= require models/article

describe 'Article', ->
  beforeEach ->
    @article = new Article()

  it 'should have a correct urlRoot', ->
    @article.urlRoot.should.be.equal '/api/articles'

  context 'Initialize with nothing', ->
    it 'should not set articleLink', ->
      should.not.exist(@article.get('articleLink'))

  context 'Initialize with slug', ->
    beforeEach ->
      @article = new Article(slug: 'winter-is-coming')

    it 'should set articleLink correctly', ->
      @article.get('articleLink').should.be.equal '/articles/winter-is-coming'
