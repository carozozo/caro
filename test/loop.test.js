describe('Loop', function() {
  var caro, should;
  should = require('chai').should();
  caro = require('../dist/caro.js');
  return it('loop', function() {
    var count;
    count = 0;
    caro.loop(function(i) {
      i.should.be.a('number');
      return count++;
    }, 10, 0);
    count.should.be.eq(11);
    count = 0;
    caro.loop(function(i) {
      var a;
      a = i % 2;
      a.should.be.eq(0);
      return count++;
    }, 0, 10, 2);
    return count.should.be.eq(6);
  });
});