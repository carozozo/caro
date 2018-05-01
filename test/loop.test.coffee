do ->
describe 'Loop', ->
  should = require('chai').should()
  caro = require('../dist/caro.js')
  it 'loop', ->
    count = 0
    caro.loop((i) ->
      i.should.be.a('number')
      count++
    , 10, 0)
    count.should.be.eq 11

    count = 0
    caro.loop((i) ->
      a = i % 2
      a.should.be.eq 0
      count++
    , 0, 10, 2)
    count.should.be.eq 6