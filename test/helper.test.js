describe('Helper', function() {
  var caro, should;
  should = require('chai').should();
  caro = require('../dist/caro.js');
  it('checkIfPass', function() {
    var r, r2;
    r = caro.checkIfPass([1, 2, 3], function(val) {
      return val === 1;
    });
    r2 = caro.checkIfPass([1, 2, 3], function(val) {
      return val > 2;
    }, false);
    r.should.be.false;
    return r2.should.be.true;
  });
  it('executeIfFn', function() {
    var arg, r, r2;
    arg = function(i) {
      return ++i;
    };
    r = caro.executeIfFn(arg, 12);
    r2 = caro.executeIfFn(null);
    r.should.eq(13);
    return should.equal(r2, void 0);
  });
  it('formatMoney', function() {
    var arg, arg2, arg3, r, r2, r3, r4, r5;
    arg = null;
    arg2 = '12003000.923';
    arg3 = 12003000.923;
    r = caro.formatMoney(arg);
    r2 = caro.formatMoney(arg2, 'int');
    r3 = caro.formatMoney(arg3, 'sInt');
    r4 = caro.formatMoney(arg3, {
      float: 0,
      separated: ',',
      decimal: '.',
      prefix: '',
      forceFloat: false
    });
    r5 = caro.formatMoney(arg3, {
      float: 5,
      forceFloat: true
    });
    r.should.eq('0');
    r2.should.eq('12,003,000');
    r3.should.eq('$12,003,000');
    r4.should.eq('12,003,000');
    return r5.should.eq('12,003,000.92300');
  });
  it('getFnName', function() {
    var arg, r;
    arg = function(i) {
      return ++i;
    };
    r = caro.getFnName(arg);
    return r.should.be.a('string');
  });
  it('getFnBody', function() {
    var arg, r;
    arg = function(i) {
      return ++i;
    };
    r = caro.getFnBody(arg);
    return r.should.be.a('string');
  });
  it('getStackList', function() {
    var r, r2;
    r = caro.getStackList();
    r2 = caro.getStackList(0, 2);
    r = r[0].file;
    r2 = r2[0].file;
    r.should.be.eql('helper.test.js');
    return r2.should.be.eql('helper.test.js');
  });
  it('setInterval', function(done) {
    var countA, countB;
    this.timeout(1000);
    countA = 0;
    countB = 0;
    caro.setInterval(function() {
      return ++countA;
    }, 1, 3);
    return caro.setInterval(function() {
      if (countB === 5) {
        done();
        return false;
      }
      return ++countB;
    }, 1);
  });
  it('random', function() {
    var r, r2;
    r = caro.random(15);
    r2 = caro.random(15, {
      lower: true,
      upper: false,
      num: true,
      exclude: 'a,b,c,d,e,f,g,1,2,3,4,5'
    });
    r.should.be.a('string');
    return r2.should.be.a('string');
  });
  it('randomInt', function() {
    var r, r2, r3;
    r = caro.randomInt(3);
    r2 = caro.randomInt(3, -3);
    r3 = caro.randomInt();
    (r >= 0 && r <= 3).should.be.true;
    caro.isInteger(r).should.be.true;
    (r2 >= -3 && r2 <= 3).should.be.true;
    caro.isInteger(r2).should.be.true;
    return r3.should.be.eq(0);
  });
  it('randomNum', function() {
    var r, r2, r3;
    r = caro.randomNum(3);
    r2 = caro.randomNum(3, -3);
    r3 = caro.randomNum();
    (r >= 0 && r <= 3).should.be.true;
    (r2 >= -3 && r2 <= 3).should.be.true;
    return r3.should.be.eq(0);
  });
  return it('serializeUrl', function() {
    var arg, obj, r, r2;
    arg = 'http://localhost';
    obj = {
      a: 1,
      b: 2,
      c: null
    };
    r = caro.serializeUrl(arg, obj);
    r2 = caro.serializeUrl(arg, obj, true);
    r.should.eq('http://localhost?a=1&b=2');
    return r2.should.eq('http://localhost?a=1&b=2&c=');
  });
});
