do ->
describe 'Object', ->
  it 'upperCaseByObjKey', ->
    arg = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': 1};
    arg2 = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': 1};
    caro.upperCaseByObjKey(arg, 'aa,bb');
    caro.upperCaseByObjKey(arg2);
    arg.should.eql {aa: 'CARO', bb: 'PIKA', cc: 'doraemon', dd: 1}
    arg2.should.eql {aa: 'CARO', bb: 'PIKA', cc: 'DORAEMON', dd: 1}

  it 'lowerCaseByObjKey', ->
    arg = {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon', 'dd': 1};
    arg2 = {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon', 'dd': 1};
    caro.lowerCaseByObjKey(arg, 'aa,bb');
    caro.lowerCaseByObjKey(arg2);
    arg.should.eql {aa: 'caro', bb: 'pika', cc: 'Doraemon', dd: 1}
    arg2.should.eql {aa: 'caro', bb: 'pika', cc: 'doraemon', dd: 1}

  it 'upperFirstByObjKey', ->
    arg = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', dd: 1};
    arg2 = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', dd: 1};
    caro.upperFirstByObjKey(arg, 'aa,bb');
    caro.upperFirstByObjKey(arg2);
    arg.should.eql {aa: 'Caro', bb: 'Pika', cc: 'doraemon', dd: 1};
    arg2.should.eql {aa: 'Caro', bb: 'Pika', cc: 'Doraemon', dd: 1};

  it 'trimByObjKey', ->
    arg = {'aa': ' caro ', 'bb': ' pika ', 'cc': ' doraemon ', dd: 1};
    arg2 = {'aa': ' caro ', 'bb': ' pika ', 'cc': ' doraemon ', dd: 1};
    caro.trimByObjKey(arg, ['aa', 'cc']);
    caro.trimByObjKey(arg2);
    arg.should.eql {'aa': 'caro', 'bb': ' pika ', 'cc': 'doraemon', dd: 1};
    arg2.should.eql {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', dd: 1};

  it 'keysInObj', ->
    arg = {aa: ' caro ', bb: ' pika ', cc: ' doraemon '};
    r = caro.keysInObj(arg, 'aa,bb');
    r2 = caro.keysInObj(arg, ['aa', 'ee']);
    r.should.be.true
    r2.should.be.false

  it 'getKeysInObj', ->
    arg = {a: 1, b: 2, c: {d: 3, e: {f: 4}}};
    r = caro.getKeysInObj(arg);
    r2 = caro.getKeysInObj(arg, 2);
    r3 = caro.getKeysInObj(arg, 0);
    r.should.eql ['a', 'b', 'c']
    r2.should.eql ['a', 'b', 'c', 'd', 'e']
    r3.should.eql ['a', 'b', 'c', 'd', 'e', 'f']

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