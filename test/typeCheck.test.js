describe('TypeCheck', function() {
  var should = require('chai').should();
  var caro = require('../dist/caro.js');

  it('isBasicVal', function() {
    var r = caro.isBasicVal('');
    var r2 = caro.isBasicVal({});

    r.should.be.true;
    r2.should.be.false;
  });
  it('isEmptyVal', function() {
    var r = caro.isEmptyVal({}, [], null, '', undefined);
    var r2 = caro.isEmptyVal('null');

    r.should.be.true;
    r2.should.be.false;
  });
  it('isEasingTrue', function() {
    var r = caro.isEasingTrue('true');
    var r2 = caro.isEasingTrue(1);

    r.should.be.true;
    r2.should.be.true;
  });
  it('isEasingFalse', function() {
    var r = caro.isEasingFalse('false');
    var r2 = caro.isEasingFalse(0);

    r.should.be.true;
    r2.should.be.true;
  });
  it('isJson', function() {
    var r = caro.isJson(null);
    var r2 = caro.isJson('caro');
    var r3 = caro.isJson('{"a":1}');
    var r4 = caro.isJson('{"a": function(){}}');

    r.should.be.true;
    r2.should.be.false;
    r3.should.be.true;
    r4.should.be.false;
  });
  it('isObjJson', function() {
    var r = caro.isObjJson('{"a":1}');
    var r2 = caro.isObjJson('{"a": function(){}}');
    var r3 = caro.isObjJson({});
    var r4 = caro.isObjJson('33');

    r.should.be.true;
    r2.should.be.false;
    r3.should.be.false;
    r4.should.be.false;
  });
  it('isUpper', function() {
    var r = caro.isUpper('CARO');
    var r2 = caro.isUpper('caro');

    r.should.be.true;
    r2.should.be.false;
  });
  it('isLower', function() {
    var r = caro.isLower('caro');
    var r2 = caro.isLower('Caro');

    r.should.be.true;
    r2.should.be.false;
  });
});