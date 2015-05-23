do ->
describe 'TypeCheck', ->
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