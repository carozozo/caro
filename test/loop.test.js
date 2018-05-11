describe('Loop', function () {
  var should = require('chai').should();
  var caro = require('../dist/caro.js');

  it('loop', function () {
    var count = 0;
    caro.loop(function (i) {
      i.should.be.a('number');
      count++;
    }, 10, 0);
    count.should.be.eq(11);

    count = 0;
    caro.loop(function (i) {
      var a;
      a = i % 2;
      a.should.be.eq(0);
      count++;
    }, 0, 10, 2);
    count.should.be.eq(6);
  });
});