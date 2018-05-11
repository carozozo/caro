describe('Array', function() {
  var caro, should;
  should = require('chai').should();
  caro = require('../dist/caro.js');
  it('cleanArr', function() {
    var arr, r;
    arr = [1, 2];
    r = caro.cleanArr(arr);
    r.should.eql([]);
    return arr.should.eql([]);
  });
  it('pushNoDuplicate', function() {
    var arr, r;
    arr = [1, 2, 3];
    r = caro.pushNoDuplicate(arr, 1, 3, {}, {}, 3);
    return r.should.eql([1, 2, 3, {}, {}]);
  });
  it('pushNoEmptyVal', function() {
    var arr, r;
    arr = [1, 2, 3];
    r = caro.pushNoEmptyVal(arr, 1, 'caro', {}, void 0, null, 0, '', []);
    return r.should.eql([1, 2, 3, 1, 'caro', 0]);
  });
  it('pullEmptyVal', function() {
    var arr, r;
    arr = [1, '', null, 'caro', void 0];
    r = caro.pullEmptyVal(arr);
    arr.should.be.eql([1, 'caro']);
    return r.should.be.eql(['', null, void 0]);
  });
  it('pullUnBasicVal', function() {
    var arr, r;
    arr = [
      1, {
        a: 1
      }, 'caro'
    ];
    r = caro.pullUnBasicVal(arr);
    arr.should.be.eql([1, 'caro']);
    return r.should.be.eql([
      {
        a: 1
      }
    ]);
  });
  it('randomPick', function() {
    var arr, arr2, arrLength, arrLength2, i, r, r2, results, val;
    arr = [1, 2, 3];
    arr2 = [1, 2, 3];
    arrLength = arr.length;
    arrLength2 = arr2.length;
    r = caro.randomPick(arr);
    r2 = caro.randomPick(arr2, true);
    arr.length.should.be.equal(arrLength);
    arr.indexOf(r).should.be.above(-1);
    arr.indexOf(r).should.be.below(arrLength);
    arr2.length.should.be.eq(arrLength2 - 1);
    results = [];
    for (i in arr2) {
      val = arr2[i];
      results.push(val.should.be.not.eq(r2));
    }
    return results;
  });
  return it('sumOfArr', function() {
    var arr, r, r2;
    arr = [1, 2, '5'];
    r = caro.sumOfArr(arr);
    r2 = caro.sumOfArr(arr, true);
    r.should.eq(3);
    return r2.should.eq(8);
  });
});