describe('Path', function () {
  var should = require('chai').should();
  var caro = require('../dist/caro.js');
  var path = 'a/b/c/d.js';
  var path2 = 'caro/caro.js';
  var path3 = 'a/b/a';

  it('getDirPath', function () {
    var r = caro.getDirPath(path);
    var r2 = caro.getDirPath(path2);
    var r3 = caro.getDirPath(path3);

    r.should.be.eql('a/b/c/');
    r2.should.be.eql('caro/');
    r3.should.be.eql('a/b/');
  });
  it('getFileName', function () {
    var r = caro.getFileName(path);
    var r2 = caro.getFileName(path, false);
    var r3 = caro.getFileName(path3);

    r.should.be.eql('d.js');
    r2.should.be.eql('d');
    r3.should.be.eql('a');
  });
  it('getExtendName', function () {
    var r = caro.getExtendName(path);
    var r2 = caro.getExtendName(path, false);
    var r3 = caro.getExtendName(path3, false);

    r.should.be.eql('.js');
    r2.should.be.eql('js');
    r3.should.be.eql('');
  });
});