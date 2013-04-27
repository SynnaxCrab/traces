#= require spec_helper

describe 'Article', ->
  before ->
    @article = new Article()

  it 'should have a correct urlRoot', ->
    @article.urlRoot.should.be.equal '/api/articles'
