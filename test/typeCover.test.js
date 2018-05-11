describe('TypeCover', function() {
  var caro, should;
  should = require('chai').should();
  caro = require('../dist/caro.js');
  it('toString', function() {
    var r, r2, r3;
    r = caro.toString('3');
    r2 = caro.toString(['caro', void 0]);
    r3 = caro.toString({
      a: false,
      b: null,
      c: 0,
      d: NaN,
      e: void 0,
      f: [],
      g: function() {}
    });
    r.should.eq('3');
    r2.should.eq('caro,');
    return r3.should.eq('[object Object]');
  });
  it('toInteger', function() {
    var r, r2, r3;
    r = caro.toInteger('3');
    r2 = caro.toInteger('caro');
    r3 = caro.toInteger(null);
    r.should.eq(3);
    r2.should.eql(NaN);
    return r3.should.eql(NaN);
  });
  it('toNumber', function() {
    var r, r2, r3;
    r = caro.toNumber('3.4');
    r2 = caro.toNumber('caro');
    r3 = caro.toNumber({});
    r.should.eq(3.4);
    r2.should.eql(NaN);
    return r3.should.eql(NaN);
  });
  it('toFixedNumber', function() {
    var r, r2, r3;
    r = caro.toFixedNumber('3.4355', 2);
    r2 = caro.toFixedNumber(2.12345, 3);
    r3 = caro.toFixedNumber('caro', 3);
    r.should.eq(3.44);
    r2.should.eq(2.123);
    return r3.should.eql(NaN);
  });
  return it('toJson', function() {
    var r, r2, r3;
    r = caro.toJson(3.4);
    r2 = caro.toJson({
      a: 3,
      b: 5
    }, function(key, val) {
      if (key === '') {
        return val;
      }
      return val + 1;
    });
    r3 = caro.toJson(void 0);
    r.should.eq('3.4');
    r2.should.eq('{"a":4,"b":6}');
    return should.equal(r3, void 0);
  });
});