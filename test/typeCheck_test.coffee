do ->
describe 'TypeCheck', ->
  it 'isBasicVal', ->
    r = caro.isBasicVal('');
    r2 = caro.isBasicVal({});
    r.should.be.true
    r2.should.be.false

  it 'isEmptyVal', ->
    r = caro.isEmptyVal({}, [], null, '', undefined);
    r2 = caro.isEmptyVal('null');
    r.should.be.true
    r2.should.be.false

  it 'isEasingTrue', ->
    r = caro.isEasingTrue('true');
    r2 = caro.isEasingTrue(1);
    r.should.be.true
    r2.should.be.true

  it 'isEasingFalse', ->
    r = caro.isEasingFalse('false');
    r2 = caro.isEasingFalse(0);
    r.should.be.true
    r2.should.be.true

  it 'isInteger', ->
    r = caro.isInteger(123);
    r2 = caro.isInteger(333.456);
    r.should.be.true;
    r2.should.be.false;

  it 'isJson', ->
    r = caro.isJson(null);
    r2 = caro.isJson('caro');
    r3 = caro.isJson('{"a":1}')
    r4 = caro.isJson('{"a": function(){}}')
    r.should.be.true
    r2.should.be.false
    r3.should.be.true
    r4.should.be.false

  it 'isObjJson', ->
    r = caro.isObjJson('{"a":1}');
    r2 = caro.isObjJson('{"a": function(){}}');
    r3 = caro.isObjJson({});
    r4 = caro.isObjJson('33');
    r.should.be.true
    r2.should.be.false
    r3.should.be.false
    r4.should.be.false