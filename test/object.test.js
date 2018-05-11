describe('Object', function() {
  var caro, should;
  should = require('chai').should();
  caro = require('../dist/caro.js');
  it('assignByKeys', function() {
    var obj, obj2;
    obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };
    obj2 = {
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
    return obj.should.eql({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      f: 3
    });
  });
  it('catching', function() {
    var obj, obj2, r, r2;
    obj = {
      name: 'Caro',
      age: 18
    };
    obj2 = {
      country: 'Taiwan',
      city: 'Kaohsiung'
    };
    r = {
      name: ''
    };
    r2 = {
      name: '',
      city: ''
    };
    caro.catching(r, obj);
    caro.catching(r2, obj, obj2);
    r.name.should.eq('Caro');
    r2.name.should.eq('Caro');
    return r2.city.should.eq('Kaohsiung');
  });
  it('classify', function() {
    var keysArr, r, r2;
    r = caro.classify({
      a: 1,
      b: 'd',
      c: {
        cc: 1
      },
      d: function() {},
      e: ['caro'],
      f: 'FF'
    });
    r2 = caro.classify([
      'caro', '4', 3, function() {
        return 'a';
      }, ['m']
    ]);
    keysArr = ['bool', 'str', 'num', 'arr', 'obj', 'fn'];
    r.should.has.keys(keysArr);
    return r2.should.has.keys(keysArr);
  });
  it('differentKeys', function() {
    var obj, obj2, r, r2;
    obj = {
      name: 'Caro',
      age: 18
    };
    obj2 = {
      name: 'Snoopy',
      country: 'Taiwan',
      city: 'Kaohsiung'
    };
    r = caro.differentKeys(obj, obj2);
    r2 = caro.differentKeys(obj, obj2, true);
    r.should.eql(['age']);
    return r2.should.eql(['country', 'city']);
  });
  it('hasEqualKeys', function() {
    var obj, obj2, obj3, r, r2;
    obj = {
      name: 'Caro',
      age: 18
    };
    obj2 = {
      name: 'Snoopy',
      age: 3
    };
    obj3 = {
      name: 'Kitty',
      country: 'Japan'
    };
    r = caro.hasEqualKeys(obj, obj2);
    r2 = caro.hasEqualKeys(obj, obj3);
    r.should.be.true;
    return r2.should.be.false;
  });
  return it('sameKeys', function() {
    var obj, obj2, r;
    obj = {
      a: 1,
      b: 2,
      c: 3,
      e: 4
    };
    obj2 = {
      a: 3,
      c: 4,
      d: 5,
      e: 6
    };
    r = caro.sameKeys(obj, obj2);
    return r.should.eql(['a', 'c', 'e']);
  });
});