do ->
describe.only 'Loop', ->
  it 'each', ->
    caro.each(['a', 'b', 'c'], (key, val)->
    );
    caro.each({a: 1, b: 2, c: 3}, (key, val)->
    );

  it 'eachArgs', ->
    fn = (a, b) ->
      caro.eachArgs(arguments, (key, val) ->
        key.should.be.a('number')
      );
    fn(1, 2);