do ->
describe 'TypeCheck', ->
  it 'isBool', ->
    r = caro.isBool(true);
    r2 = caro.isBool(false, undefined);
    r.should.be.true;
    r2.should.be.false;

  it 'isStr', ->
    r = caro.isStr('caro');
    r2 = caro.isStr(undefined, 'caro');
    r.should.be.true;
    r2.should.be.false;

  it 'isFn', ->
    r = caro.isFn(->);
    r2 = caro.isFn(undefined, ->);
    r.should.be.true;
    r2.should.be.false;

  it 'isUndef', ->
    r = caro.isUndef(undefined);
    r2 = caro.isUndef(undefined, null);
    r.should.be.true
    r2.should.be.false

  it 'isNum', ->
    r = caro.isNum(123, 33.56);
    r2 = caro.isNum(333, 'caro');
    r.should.be.true;
    r2.should.be.false;

  it 'isInt', ->
    r = caro.isInt(123);
    r2 = caro.isInt(333.456, 12);
    r.should.be.true;
    r2.should.be.false;

  it 'isArr', ->
    r = caro.isArr([]);
    r2 = caro.isArr([], {});
    r.should.be.true;
    r2.should.be.false;

  it 'isNull', ->
    r = caro.isNull(null);
    r2 = caro.isNull(null, {});
    r.should.be.true;
    r2.should.be.false;

  it 'isJson', ->
    r = caro.isJson(null);
    r2 = caro.isJson('caro');
    r3 = caro.isJson(123, '{"a":1}')
    r4 = caro.isJson('{"a": function(){}}')
    r.should.be.true
    r2.should.be.false
    r3.should.be.true
    r4.should.be.false

  it 'isObjJson', ->
    r = caro.isObjJson('{"a":1}');
    r2 = caro.isObjJson('{"a": function(){}}');
    r3 = caro.isObjJson({}, '{"a":1}');
    r.should.be.true
    r2.should.be.false
    r3.should.be.false

  it 'isObj', ->
    r = caro.isObj({});
    r2 = caro.isObj({}, []);
    r.should.be.true
    r2.should.be.false

  it 'isObjOrArr', ->
    r = caro.isObjOrArr({});
    r2 = caro.isObjOrArr({}, []);
    r.should.be.true
    r2.should.be.true

  it 'isRegExp', ->
    r = caro.isRegExp(/\d/g);
    r2 = caro.isRegExp(/\w/, '/\w/');
    r.should.be.true
    r2.should.be.false

  it 'isBuf', ->
    r = caro.isBuf(new Buffer(1));
    r2 = caro.isBuf(null);
    r.should.be.true
    r2.should.be.false