describe('Path', function() {
  var caro, path, path2, path3, should;
  should = require('chai').should();
  caro = require('../dist/caro.js');
  path = 'a/b/c/d.js';
  path2 = 'caro/caro.js';
  path3 = 'a/b/a';
  it('getDirPath', function() {
    var r, r2, r3;
    r = caro.getDirPath(path);
    r2 = caro.getDirPath(path2);
    r3 = caro.getDirPath(path3);
    r.should.be.eql('a/b/c/');
    r2.should.be.eql('caro/');
    return r3.should.be.eql('a/b/');
  });
  it('getFileName', function() {
    var r, r2, r3;
    r = caro.getFileName(path);
    r2 = caro.getFileName(path, false);
    r3 = caro.getFileName(path3);
    r.should.be.eql('d.js');
    r2.should.be.eql('d');
    return r3.should.be.eql('a');
  });
  return it('getExtendName', function() {
    var r, r2, r3;
    r = caro.getExtendName(path);
    r2 = caro.getExtendName(path, false);
    r3 = caro.getExtendName(path3, false);
    r.should.be.eql('.js');
    r2.should.be.eql('js');
    return r3.should.be.eql('');
  });
});