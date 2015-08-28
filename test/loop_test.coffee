do ->
describe 'Loop', ->
  it 'loop', ->
    count = 0
    caro.loop((i) ->
      i.should.be.an.Number
      count++
    , 10, 0, 1)
    count.should.be.eq 11

    count = 0
    caro.loop((i) ->
      a = i % 2
      a.should.be.eq 0
      count++
    , 0, 10, 2)
    count.should.be.eq 6