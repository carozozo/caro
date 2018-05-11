describe('Array', function () {
  var should = require('chai').should();
  var caro = require('../dist/caro.js');

  it('cleanArr', function () {
    var arr = [1, 2];
    var r = caro.cleanArr(arr);

    r.should.eql([]);
    arr.should.eql([]);
  });
  it('pushNoDuplicate', function () {
    var arr = [1, 2, 3];
    var r = caro.pushNoDuplicate(arr, 1, 3, {}, {}, 3);

    r.should.eql([1, 2, 3, {}, {}]);
  });
  it('pushNoEmptyVal', function () {
    var arr = [1, 2, 3];
    var r = caro.pushNoEmptyVal(arr, 1, 'caro', {}, undefined, null, 0, '', []);

    r.should.eql([1, 2, 3, 1, 'caro', 0]);
  });
  it('pullEmptyVal', function () {
    var arr = [1, '', null, 'caro', undefined];
    var r = caro.pullEmptyVal(arr);

    arr.should.be.eql([1, 'caro']);
    r.should.be.eql(['', null, undefined]);
  });
  it('pullUnBasicVal', function () {
    var arr = [
      1,
      {
        a: 1
      },
      'caro'
    ];
    var r = caro.pullUnBasicVal(arr);

    arr.should.be.eql([1, 'caro']);
    r.should.be.eql([
      {
        a: 1
      }
    ]);
  });
  it('randomPick', function () {
    var arr = [1, 2, 3];
    var arr2 = [1, 2, 3];
    var arrLength = arr.length;
    var arrLength2 = arr2.length;
    var r = caro.randomPick(arr);
    var r2 = caro.randomPick(arr2, true);

    arr.length.should.be.equal(arrLength);
    arr.indexOf(r).should.be.above(-1);
    arr.indexOf(r).should.be.below(arrLength);
    arr2.length.should.be.eq(arrLength2 - 1);

    var results = [];
    for (var i in arr2) {
      var val = arr2[i];
      results.push(val.should.be.not.eq(r2));
    }
    return results;
  });
  it('sumOfArr', function () {
    var arr = [1, 2, '5'];
    var r = caro.sumOfArr(arr);
    var r2 = caro.sumOfArr(arr, true);

    r.should.eq(3);
    return r2.should.eq(8);
  });
});