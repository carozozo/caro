do ->
describe 'Loop', ->
  it 'loop', ->
    count = 0
    caro.loop((i)->
      i.should.be.an.Number
      count++
    , 10, 0, 1)
    count.should.be.eq 11

    count = 0
    caro.loop((i)->
      a = i % 2
      a.should.be.eq 0
      count++
    , 0, 10, 2)
    count.should.be.eq 6

  it 'each', ->
    caro.each(['a', 'b', 'c'], (key, val)->
      key.should.be.an.Number
      val.should.be.an.String
    );
    caro.each({a: 1, b: 2, c: 3}, (key, val)->
    );

  it 'eachArgs', ->
    fn = (a, b) ->
      caro.eachArgs(arguments, (key, val) ->
        key.should.be.an.Number
        val.should.be.an.Number
      );
    fn(1, 2);