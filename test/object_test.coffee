do ->
describe 'Object', ->
  it 'eachObj', ->
    arg = ['a', 'b', 'c']
    r = caro.eachObj(arg, (i, val)->
#      console.log 'i,', i
#      console.log 'val=', val
    );

  it 'getObjLength', ->
    arg = ['a', 'b', 'c']
    r = caro.getObjLength(arg);
    #    console.log r
    r.should.eq 3

  it 'cloneObj', ->
    arg = ['a', 'b', 'c'];
    arg2 = {'a': 1, 'b': 2};
    r = arg;
    r2 = arg2;
    r3 = caro.cloneObj(arg);
    r4 = caro.cloneObj(arg2);
    arg[0] = 'g';
    arg2.a = 3;
    r.should.eql ['g', 'b', 'c']
    r2.should.eql {a: 3, b: 2}
    r3.should.eql ['a', 'b', 'c']
    r4.should.eql {a: 1, b: 2}

  it 'extendObj', ->
    arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}}
    arg2 = ['a', 'b', 'c']
    arg3 = ['d']
    r = caro.extendObj(arg, arg2);
    r2 = caro.extendObj(arg, arg2, true);
    r3 = caro.extendObj(arg2, arg);
    r4 = caro.extendObj(arg2, arg3);
    arg.cc.c1 = 5;
    r.should.eql({'0': 'a', '1': 'b', '2': 'c', aa: 1, bb: 2, cc: {c1: 5}})
    r2.should.eql({'0': 'a', '1': 'b', '2': 'c', aa: 1, bb: 2, cc: {c1: 3}})
    r3.should.eql(['a', 'b', 'c', 1, 2, {c1: 5}])
    r4.should.eql(['a', 'b', 'c', 'd'])

  it 'replaceObjKey', ->
    arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}}
    caro.replaceObjKey(arg, (key)->
      return 'dd' if key == 'cc'
    );
    r = caro.replaceObjKey(arg, (key)->
      return 'ee' if key == 'bb'
    , true);
    arg.should.eql({aa: 1, bb: 2, dd: {c1: 3}})
    r.should.eql({aa: 1, dd: {c1: 3}, ee: 2})

  it 'replaceObjVal', ->
    arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}}
    caro.replaceObjVal(arg, (val)->
      return 4 if val == 1
    );
    r = caro.replaceObjVal(arg, (val)->
      return '5' if val == 2
    ,
      deep: true
      clone: true
    );
    arg.should.eql({aa: 4, bb: 2, cc: {c1: 3}})
    r.should.eql({aa: 4, bb: '5', cc: {c1: 3}})

  it 'upperCaseByObjKey', ->
    arg = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': 1};
    arg2 = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': 1};
    caro.upperCaseByObjKey(arg, 'aa,bb');
    r = caro.upperCaseByObjKey(arg2, null, true);
    arg.should.eql {aa: 'CARO', bb: 'PIKA', cc: 'doraemon', dd: 1}
    arg2.should.eql {aa: 'caro', bb: 'pika', cc: 'doraemon', dd: 1}
    r.should.eql {aa: 'CARO', bb: 'PIKA', cc: 'DORAEMON', dd: 1}

  it 'lowerCaseByObjKey', ->
    arg = {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon', 'dd': 1};
    arg2 = {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon', 'dd': 1};
    caro.lowerCaseByObjKey(arg, 'aa,bb');
    r = caro.lowerCaseByObjKey(arg2, null, true);
    arg.should.eql {aa: 'caro', bb: 'pika', cc: 'Doraemon', dd: 1}
    arg2.should.eql {aa: 'Caro', bb: 'Pika', cc: 'Doraemon', dd: 1}
    r.should.eql {aa: 'caro', bb: 'pika', cc: 'doraemon', dd: 1}

  it 'upperFirstByObjKey', ->
    arg = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': ['dd_1']};
    arg2 = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': ['dd_1']};
    caro.upperFirstByObjKey(arg, 'aa,bb');
    r = caro.upperFirstByObjKey(arg2, null, true);
    arg.should.eql {aa: 'Caro', bb: 'Pika', cc: 'doraemon', dd: ['dd_1']};
    arg2.should.eql {aa: 'caro', bb: 'pika', cc: 'doraemon', dd: ['dd_1']};
    r.should.eql {aa: 'Caro', bb: 'Pika', cc: 'Doraemon', dd: ['dd_1']};

  it 'trimObjVal', ->
    arg = {'aa': ' caro ', 'bb': ' pika ', 'cc': ' doraemon ', 'dd': [' dd_1 ']};
    arg2 = {'aa': ' caro ', 'bb': ' pika ', 'cc': ' doraemon ', 'dd': [' dd_1 ']};
    caro.trimObjVal(arg);
    r = caro.trimObjVal(arg2, {
      deep: false
      clone: true
    });
    arg.should.eql {aa: 'caro', bb: 'pika', cc: 'doraemon', dd: ['dd_1']}
    arg2.should.eql {aa: ' caro ', bb: ' pika ', cc: ' doraemon ', dd: [' dd_1 ']}
    r.should.eql {aa: 'caro', bb: 'pika', cc: 'doraemon', dd: [' dd_1 ']}

  it 'keysInObj', ->
    arg = {aa: ' caro ', bb: ' pika ', cc: ' doraemon '};
    r = caro.keysInObj(arg, 'aa,bb'); # true
    r2 = caro.keysInObj(arg, ['aa', 'ee']); # false
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
    r.should.eql { a: 1, b: 2, c: 'function (a) {return a;}' }
    r2.should.eql { a: 1, b: 2, c: 'function (a) {\n return a;\n }' }