do ->
describe 'Path', ->
  it 'setAbsolutePath', ->
    r = caro.setAbsolutePath('/path/from/root');
    r2 = caro.setAbsolutePath('/path2//from\root');
    r.should.eq '/path/from/root'
    r2.should.eq '/path2/from\root'

  it 'getAbsolutePath', ->
    caro.setAbsolutePath('/path/from/root');
    r = caro.getAbsolutePath();
    r.should.eq '/path/from/root'

  it 'isFullPath', ->
    caro.setAbsolutePath('/path/from/root');
    r = caro.isFullPath('/path/from/root/caro.js');
    r2 = caro.isFullPath('/path/from/root/caro.js', '/path2/from/root/caro.js');
    r.should.be.true
    r2.should.be.false

  it 'getDirPath', ->
    r = caro.getDirPath('/path/from/root');
    r2 = caro.getDirPath('/path/from/root/caro.js');
    r.should.eq '/path/from'
    r2.should.eq '/path/from/root'

  it 'getFileName', ->
    r = caro.getFileName('/path/from/root');
    r2 = caro.getFileName('/path/from/root/caro.js');
    r3 = caro.getFileName('/path/from/root/caro.js', false);
    r.should.eq 'root'
    r2.should.eq 'caro.js'
    r3.should.eq 'caro'

  it 'getExtendName', ->
    r = caro.getExtendName('caro.js');
    r2 = caro.getExtendName('caro.js.bk', false);
    r.should.eq '.js'
    r2.should.eq 'bk'

  it 'normalizePath', ->
    r = caro.normalizePath('path//seems/not/exists');
    r2 = caro.normalizePath('path', '\exists');
    r.should.eq 'path/seems/not/exists'
    r2.should.eq 'path/exists'

  it 'coverToFullPath', ->
    caro.setAbsolutePath('/path/from/root');
    r = caro.coverToFullPath('caro.js');
    r2 = caro.coverToFullPath('other', 'caro.js');
    r3 = caro.coverToFullPath('/path/from/root/caro.js');
    r.should.eq '/path/from/root/caro.js'
    r2.should.eq '/path/from/root/other/caro.js'
    r3.should.eq '/path/from/root/caro.js'