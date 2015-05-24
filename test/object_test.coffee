do ->
describe 'Object', ->
  it 'coverFnToStrInObj', ->
    arg = {
      a: 1, b: 2, c: (a) ->
        return a
    };
    arg2 = {
      a: 1, b: 2, c: (a) ->
        return a
    };
    r = caro.coverFnToStrInObj(arg);
    r2 = caro.coverFnToStrInObj(arg2, false);
    r.should.eql {a: 1, b: 2, c: 'function (a) {return a;}'}
    r2.should.eql {a: 1, b: 2, c: 'function (a) {\n return a;\n }'}

  it 'objToArr', ->
    fn = (a, b) ->
      args = caro.objToArr(arguments);
      args.should.be.an.Array
      args[0].should.eq 1
      args[1].should.eq 2
    fn(1, 2);