describe('Object', function () {
  var should = require('chai').should();
  var caro = require('../dist/caro.js');

  it('assignByKeys', function () {
    var obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };
    var obj2 = {
      d: 1,
      e: 2,
      f: 3
    };

    caro.assignByKeys(obj, obj2, ['d', 'f']);
    obj.should.eql({
      a: 1,
      b: 2,
      c: 3,
      d: 1,
      f: 3
    });
    obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };

    caro.assignByKeys(obj, obj2, ['d', 'f'], false);
    obj.should.eql({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      f: 3
    });
  });
  it('catching', function () {
    var obj = {
      name: 'Caro',
      age: 18
    };
    var obj2 = {
      country: 'Taiwan',
      city: 'Kaohsiung'
    };
    var r = {
      name: ''
    };
    var r2 = {
      name: '',
      city: ''
    };
    caro.catching(r, obj);
    caro.catching(r2, obj, obj2);

    r.name.should.eq('Caro');
    r2.name.should.eq('Caro');
    r2.city.should.eq('Kaohsiung');
  });
  it('classify', function () {
    var r = caro.classify({
      a: 1,
      b: 'd',
      c: {
        cc: 1
      },
      d: function () {},
      e: ['caro'],
      f: 'FF'
    });
    var r2 = caro.classify([
      'caro', '4', 3, function () {
        return 'a';
      }, ['m']
    ]);
    var keysArr = ['bool', 'str', 'num', 'arr', 'obj', 'fn'];

    r.should.has.keys(keysArr);
    r2.should.has.keys(keysArr);
  });
  it('differentKeys', function () {
    var obj = {
      name: 'Caro',
      age: 18
    };
    var obj2 = {
      name: 'Snoopy',
      country: 'Taiwan',
      city: 'Kaohsiung'
    };
    var r = caro.differentKeys(obj, obj2);
    var r2 = caro.differentKeys(obj, obj2, true);

    r.should.eql(['age']);
    r2.should.eql(['country', 'city']);
  });
  it('hasEqualKeys', function () {
    var obj = {
      name: 'Caro',
      age: 18
    };
    var obj2 = {
      name: 'Snoopy',
      age: 3
    };
    var obj3 = {
      name: 'Kitty',
      country: 'Japan'
    };
    var r = caro.hasEqualKeys(obj, obj2);
    var r2 = caro.hasEqualKeys(obj, obj3);

    r.should.be.true;
    r2.should.be.false;
  });
  it('sameKeys', function () {
    var obj = {
      a: 1,
      b: 2,
      c: 3,
      e: 4
    };
    var obj2 = {
      a: 3,
      c: 4,
      d: 5,
      e: 6
    };
    var r = caro.sameKeys(obj, obj2);

    r.should.eql(['a', 'c', 'e']);
  });
});