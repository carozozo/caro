describe('Helper', function () {
  var should = require('chai').should();
  var caro = require('../dist/caro.js');

  it('executeIfFn', function () {
    var arg = function (i) {
      return ++i;
    };
    var r = caro.executeIfFn(arg, 12);
    var r2 = caro.executeIfFn(null);

    r.should.eq(13);
    should.equal(r2, undefined);
  });
  it('formatMoney', function () {
    var arg = null;
    var arg2 = '12003000.923';
    var arg3 = 12003000.923;
    var r = caro.formatMoney(arg);
    var r2 = caro.formatMoney(arg2, 'int');
    var r3 = caro.formatMoney(arg3, 'sInt');
    var r4 = caro.formatMoney(arg3, {
      float: 0,
      separated: ',',
      decimal: '.',
      prefix: '',
      forceFloat: false
    });
    var r5 = caro.formatMoney(arg3, {
      float: 5,
      forceFloat: true
    });

    r.should.eq('0');
    r2.should.eq('12,003,000');
    r3.should.eq('$12,003,000');
    r4.should.eq('12,003,000');
    r5.should.eq('12,003,000.92300');
  });
  it('getFnName', function () {
    var arg = function (i) {
      return ++i;
    };
    var r = caro.getFnName(arg);

    return r.should.be.a('string');
  });
  it('getFnBody', function () {
    var arg = function (i) {
      return ++i;
    };
    var r = caro.getFnBody(arg);

    return r.should.be.a('string');
  });
  it('getStackList', function () {
    var r = caro.getStackList();
    var r2 = caro.getStackList(0, 2);
    var r = r[0].file;
    var r2 = r2[0].file;

    r.should.be.eql('helper.test.js');
    return r2.should.be.eql('helper.test.js');
  });
  it('setInterval', function (done) {
    this.timeout(1000);
    var countA = 1;
    var countB = 1;

    caro.setInterval(function (i) {
      i.should.be.eql(countA);
      countA++;
    }, 1, 3);

    caro.setInterval(function (i) {
      i.should.be.eql(countB);
      if (countB === 5) {
        done();
        return false;
      }
      countB++;
    }, 1);
  });
  it('random', function () {
    var r = caro.random(15);
    var r2 = caro.random(15, {
      lower: true,
      upper: false,
      num: true,
      exclude: 'a,b,c,d,e,f,g,1,2,3,4,5'
    });

    r.should.be.a('string');
    r2.should.be.a('string');
  });
  it('randomInt', function () {
    var r = caro.randomInt(3);
    var r2 = caro.randomInt(3, -3);
    var r3 = caro.randomInt();

    (r >= 0 && r <= 3).should.be.true;
    r.should.be.eq(Math.round(r));
    (r2 >= -3 && r2 <= 3).should.be.true;
    r2.should.be.eq(Math.round(r2));
    r3.should.be.eq(0);
  });
  it('randomNum', function () {
    var r = caro.randomNum(3);
    var r2 = caro.randomNum(3, -3);
    var r3 = caro.randomNum();

    (r >= 0 && r <= 3).should.be.true;
    (r2 >= -3 && r2 <= 3).should.be.true;
    r3.should.be.eq(0);
  });
  it('serializeUrl', function () {
    var arg = 'http://localhost';
    var obj = {
      a: 1,
      b: 2,
      c: null
    };
    var r = caro.serializeUrl(arg, obj);
    var r2 = caro.serializeUrl(arg, obj, true);

    r.should.eq('http://localhost?a=1&b=2');
    r2.should.eq('http://localhost?a=1&b=2&c=');
  });
});
