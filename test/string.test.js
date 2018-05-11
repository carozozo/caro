describe('String', function() {
  var caro, should;
  should = require('chai').should();
  caro = require('../dist/caro.js');
  it('addHead', function() {
    var r, r2;
    r = caro.addHead('false', 'fa');
    r2 = caro.addHead('False', 'is');
    r.should.eq('false');
    return r2.should.eq('isFalse');
  });
  it('addTail', function() {
    var r, r2;
    r = caro.addTail('moon', 'on');
    r2 = caro.addTail('moon', 'Day');
    r.should.eq('moon');
    return r2.should.eq('moonDay');
  });
  it('brToWrap', function() {
    var r;
    r = caro.brToWrap('this is<br />wrap content.');
    return r.should.eq('this is\nwrap content.');
  });
  it('insertStr', function() {
    var r;
    r = caro.insertStr('Lift is good', ' so', 7);
    r.should.eq('Lift is so good');
    r = caro.insertStr('I love my', ' dog');
    return r.should.eq('I love my dog');
  });
  it('lowerStr', function() {
    var r, r2, r3, r4, r5;
    r = caro.lowerStr('I AM CARO');
    r2 = caro.lowerStr('I AM CARO', 5);
    r3 = caro.lowerStr('I AM CARO', 5, 6);
    r4 = caro.lowerStr('I AM CARO', function(letter) {
      if (letter !== 'C') {
        return true;
      }
    });
    r5 = caro.lowerStr('I AM CARO', function(letter, i) {
      if (i > 1) {
        return true;
      }
    });
    r.should.eq('i am caro');
    r2.should.eq('I AM caro');
    r3.should.eq('I AM cARO');
    r4.should.eq('i am Caro');
    return r5.should.eq('I am caro');
  });
  it('replaceAll', function() {
    var r, r2;
    r = caro.replaceAll('I*am*{Caro}.', '*', '-');
    r2 = caro.replaceAll('I-am-Caro.', '-', '@');
    r.should.eql('I-am-{Caro}.');
    return r2.should.eql('I@am@Caro.');
  });
  it('replaceLast', function() {
    var r, r2;
    r = caro.replaceLast('I-am-Caro.', '-', ' ');
    r2 = caro.replaceLast('I am Caro not Colo.', 'o', 'a');
    r.should.eql('I-am Caro.');
    return r2.should.eql('I am Caro not Cola.');
  });
  it('splitByWrap', function() {
    var r;
    r = caro.splitByWrap('I love\nmy mother\nand\nmy father');
    return r.should.eql(['I love', 'my mother', 'and', 'my father']);
  });
  it('splitStr', function() {
    var r, r2;
    r = caro.splitStr('i am caro', ' ');
    r2 = caro.splitStr('I love ~~ Snoopy !~!', ['~', ' ']);
    r.should.eql(['i', 'am', 'caro']);
    return r2.should.eql(['I', 'love', '', '', '', 'Snoopy', '!', '!']);
  });
  it('strToBool', function() {
    var r, r2, r3, r4;
    r = caro.strToBool('false');
    r2 = caro.strToBool('FALSE');
    r3 = caro.strToBool('123');
    r4 = caro.strToBool('');
    r.should.be.false;
    r2.should.be.false;
    r3.should.be.true;
    return r4.should.be.false;
  });
  it('upperStr', function() {
    var r, r2, r3, r4, r5;
    r = caro.upperStr('I am Caro');
    r2 = caro.upperStr('i am caro', 5);
    r3 = caro.upperStr('i am caro', 5, 6);
    r4 = caro.upperStr('i am caro', function(letter) {
      if (letter === 'i' || letter === 'c') {
        return true;
      }
    });
    r5 = caro.upperStr('i am caro', function(letter, i) {
      if (i < 1) {
        return true;
      }
    });
    r.should.eq('I AM CARO');
    r2.should.eq('i am CARO');
    r3.should.eq('i am Caro');
    r4.should.eq('I am Caro');
    return r5.should.eq('I am caro');
  });
  return it('wrapToBr', function() {
    var r;
    r = caro.wrapToBr('this is\nwrap content.');
    return r.should.eq('this is<br />wrap content.');
  });
});