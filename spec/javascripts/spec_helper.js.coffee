#= require sinon
#= require sinon-chai
#= require underscore
#= require backbone

mocha.ignoreLeaks()

beforeEach ->
  @sandbox = sinon.sandbox.create()

afterEach ->
  @sandbox.restore()
