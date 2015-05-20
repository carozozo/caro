do ->
describe 'Object', ->
  it 'getObjLength', ->
    arg = ['a', 'b', 'c']
    r = caro.getObjLength(arg);
    r.should.eq 3

  it 'extendObj', ->
    arg = {a: {a1: 1}};
    arg2 = {a: {a1: 1}};
    arg3 = {a: {a1: 2}, b: 2, c: {c1: 1}};
    caro.extendObj(arg, arg3);
    caro.extendObj(true, arg2, arg3);

    arg.should.be.eql {a: {a1: 1}, b: 2, c: {c1: 1}}
    arg2.should.be.eql {a: {a1: 2}, b: 2, c: {c1: 1}}

    arg = [1, 2, 3];
    arg2 = [4, 5, 6];
    caro.extendObj(arg, arg2)
    arg.should.be.eql [1, 2, 3, 4, 5, 6]

  it 'cloneObj', ->
    arg = {a: 1, b: 2, c: {c1: 1}};
    r = caro.cloneObj(arg);
    r2 = caro.cloneObj(arg, true);
    arg.a = 3
    arg.c.c1 = 3
    r.should.be.eql {a: 1, b: 2, c: {c1: 3}}
    r2.should.be.eql {a: 1, b: 2, c: {c1: 1}}

  it 'replaceObjKey', ->
    arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}}
    caro.replaceObjKey(arg, (key)->
      return 'dd' if key == 'cc'
    );
    arg.should.eql({aa: 1, bb: 2, dd: {c1: 3}})

  it 'replaceObjVal', ->
    arg = {'aa': 4, 'bb': 2, 'cc': {'c1': 4}}
    caro.replaceObjVal(arg, (val)->
      return 1 if val == 4
    );
    arg.should.eql({aa: 1, bb: 2, cc: {c1: 4}})

    arg = {'aa': 4, 'bb': 2, 'cc': {'c1': 4}}
    caro.replaceObjVal(arg, (val)->
      return 1 if val == 4
    , true);
    arg.should.eql({aa: 1, bb: 2, cc: {c1: 1}})

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