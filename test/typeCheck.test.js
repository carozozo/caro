describe('TypeCheck', function() {
  var caro, should;
  should = require('chai').should();
  caro = require('../dist/caro.js');
  it('isBasicVal', function() {
    var r, r2;
    r = caro.isBasicVal('');
    r2 = caro.isBasicVal({});
    r.should.be.true;
    return r2.should.be.false;
  });
  it('isEmptyVal', function() {
    var r, r2;
    r = caro.isEmptyVal({}, [], null, '', void 0);
    r2 = caro.isEmptyVal('null');
    r.should.be.true;
    return r2.should.be.false;
  });
  it('isEasingTrue', function() {
    var r, r2;
    r = caro.isEasingTrue('true');
    r2 = caro.isEasingTrue(1);
    r.should.be.true;
    return r2.should.be.true;
  });
  it('isEasingFalse', function() {
    var r, r2;
    r = caro.isEasingFalse('false');
    r2 = caro.isEasingFalse(0);
    r.should.be.true;
    return r2.should.be.true;
  });
  it('isJson', function() {
    var r, r2, r3, r4;
    r = caro.isJson(null);
    r2 = caro.isJson('caro');
    r3 = caro.isJson('{"a":1}');
    r4 = caro.isJson('{"a": function(){}}');
    r.should.be.true;
    r2.should.be.false;
    r3.should.be.true;
    return r4.should.be.false;
  });
  it('isObjJson', function() {
    var r, r2, r3, r4;
    r = caro.isObjJson('{"a":1}');
    r2 = caro.isObjJson('{"a": function(){}}');
    r3 = caro.isObjJson({});
    r4 = caro.isObjJson('33');
    r.should.be.true;
    r2.should.be.false;
    r3.should.be.false;
    return r4.should.be.false;
  });
  it('isUpper', function() {
    var r, r2;
    r = caro.isUpper('CARO');
    r2 = caro.isUpper('caro');
    r.should.be.true;
    return r2.should.be.false;
  });
  return it('isLower', function() {
    var r, r2;
    r = caro.isLower('caro');
    r2 = caro.isLower('Caro');
    r.should.be.true;
    return r2.should.be.false;
  });
});