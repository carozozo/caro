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

  it 'extendObj', ->
    arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}}
    arg2 = ['a', 'b', 'c']
    r = caro.extendObj(arg, arg2);
    r2 = caro.extendObj(arg, arg2, true);
    r3 = caro.extendObj(arg2,arg);
    arg.cc.c1 = 5;

    console.log r
    console.log r2
    console.log r3
    r.should.be.a('object')


  it 'cloneObj', ->
    arg = ['a', 'b', 'c']
    r = caro.getObjLength(arg);
    #    console.log r
    r.should.eq 3