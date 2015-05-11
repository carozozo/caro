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
    r.should.eql [ 'g', 'b', 'c' ]
    r2.should.eql { a: 3, b: 2 }
    r3.should.eql [ 'a', 'b', 'c' ]
    r4.should.eql { a: 1, b: 2 }

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

  it 'copyByObjKey', ->
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