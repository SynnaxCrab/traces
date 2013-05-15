#= require spec_helper
#= require models/comment

describe 'Comment', ->
  beforeEach ->
    @comment = new Comment('_id': 'randomaccessedmemories')

  it 'should have a commentId', ->
    @comment.get('commentId').should.be.equal 'randomaccessedmemories'
