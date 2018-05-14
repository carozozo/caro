describe('TypeCover', function () {
  var should = require('chai').should();
  var caro = require('../dist/caro.js');

  it('toStr', function () {
    var r = caro.toStr('3');
    var r2 = caro.toStr(['caro', undefined]);
    var r3 = caro.toStr({
      a: false,
      b: null,
      c: 0,
      d: NaN,
      e: undefined,
      f: [],
      g: function () {}
    });
    var r4 = caro.toStr(null);
    var r5 = caro.toStr(undefined);
    var r6 = caro.toStr(function () { });

    r.should.eq('3');
    r2.should.eq('caro,');
    r3.should.eq('[object Object]');
    r4.should.eq('null');
    r5.should.eq('undefined');
    r6.should.eq('function () { }');
  });
  it('toInt', function () {
    var r = caro.toInt('3');
    var r2 = caro.toInt('3.2');
    var r3 = caro.toInt('caro');
    var r4 = caro.toNum({});
    var r5 = caro.toInt(null);
    var r6 = caro.toInt(undefined);
    var r7 = caro.toInt(function () { });

    r.should.eq(3);
    r2.should.eql(3);
    r3.should.eql(NaN);
    r4.should.eql(NaN);
    r5.should.eql(NaN);
    r6.should.eql(NaN);
    r7.should.eql(NaN);
  });
  it('toNum', function () {
    var r = caro.toNum('3');
    var r2 = caro.toNum('3.2');
    var r3 = caro.toNum('caro');
    var r4 = caro.toNum({});
    var r5 = caro.toNum(null);
    var r6 = caro.toNum(undefined);
    var r7 = caro.toNum(function () { });

    r.should.eq(3);
    r2.should.eql(3.2);
    r3.should.eql(NaN);
    r4.should.eql(NaN);
    r5.should.eql(0);
    r6.should.eql(NaN);
    r7.should.eql(NaN);
  });
  it('toFixedNum', function () {
    var r = caro.toFixedNum('3.4355', 2);
    var r2 = caro.toFixedNum(2.12345, 3);
    var r3 = caro.toFixedNum('caro', 3);

    r.should.eq(3.44);
    r2.should.eq(2.123);
    r3.should.eql(NaN);
  });
  it('toJson', function () {
    var r = caro.toJson(3.4);
    var r2 = caro.toJson({
      a: 3,
      b: 5
    }, function (key, val) {
      if (key === '') {
        return val;
      }
      return val + 1;
    });
    var r3 = caro.toJson(undefined);

    r.should.eq('3.4');
    r2.should.eq('{"a":4,"b":6}');
    should.equal(r3, undefined);
  });
});