do ->
describe 'Path', ->
  it 'setAbsolutePath', ->
    r = caro.setAbsolutePath('/path/from/root');
    r2 = caro.setAbsolutePath('/path2///from\\\\root');
    r3 = caro.setAbsolutePath({});
    r = r == '/path/from/root' || r == '\\path\\from\\root'
    r2 = r2 == '/path2/from\\\\root' || r2 == '\\path2\\from\\root'
    r.should.be.true
    r2.should.be.true
    r3.should.be.false

  it 'getAbsolutePath', ->
    caro.setAbsolutePath('/path/from/root');
    r = caro.getAbsolutePath();
    r = r == '/path/from/root' || r == '\\path\\from\\root'
    r.should.be.true

  it 'normalizePath', ->
    r = caro.normalizePath('path//seems/not/exists');
    r2 = caro.normalizePath('path', '\exists');
    r = r == 'path/seems/not/exists' || r == 'path\\seems\\not\\exists'
    r2 = r2 == 'path/exists' || r2 == 'path\\exists'
    r.should.be.true
    r2.should.be.true

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

  it 'coverToFullPath', ->
    caro.setAbsolutePath('/path/from/root');
    r = caro.coverToFullPath('caro.js');
    r2 = caro.coverToFullPath('other', 'caro.js');
    r3 = caro.coverToFullPath('/path/from/root/caro.js');
    r = r == '/path/from/root/caro.js' || r == '\\path\\from\\root\\caro.js'
    r2 = r2 == '/path/from/root/other/caro.js' || r2 == '\\path\\from\\root\\other\\caro.js'
    r3 = r3 == '/path/from/root/caro.js' || r3 == '\\path\\from\\root\\caro.js'
    r.should.be.true
    r2.should.be.true
    r3.should.be.true