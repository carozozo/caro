do ->
describe 'FileSystem', ->
  it 'setTrace', ->
    r = caro.setTrace(false);
    r.should.be.a('boolean')

  it 'readFileCaro', ->
    r = caro.readFileCaro(__dirname + '/test.html');
    r.should.be.string

  it 'writeFileCaro', ->
    data = caro.readFileCaro(__dirname + '/test.html');
    r = caro.writeFileCaro(__dirname + '/\/test2.html', data);
    r.should.be.a('boolean')

  it 'isEmptyDir', ->
    r = caro.isEmptyDir(__dirname + '/1', __dirname + '/2', (e) ->
# do something when catch error
    );
    r.should.be.a('boolean')

  it 'readDirCb', ->
    caro.readDirCb('../src',
      (err, oFileInfo) ->
    , {
        maxLevel: 1
        getDir: true
        getFile: true
        getByExtend: false
      });

  it 'createDir', ->
    r = caro.createDir('1/a', '2',
      (e, path) ->
    );
    r.should.be.a('boolean')

  it 'fsExists', ->
    r = caro.fsExists('./a/b', 'c', (e, path) ->
    );
    r.should.be.a('boolean')

  it 'isFsDir', ->
    r = caro.isFsDir('./a', 'c', (e, path) ->
    );
    r.should.be.a('boolean')

  it 'isFsFile', ->
    r = caro.isFsFile('./caro', (e, path) ->
    );
    r.should.be.a('boolean')

  it 'isFsSymlink', ->
    r = caro.isFsSymlink('./caro', (e, path) ->
    );
    r.should.be.a('boolean')

  it 'getFileType', ->
    r = caro.getFileType('./caro');
    r2 = caro.getFileType('./caro.js');
    r.should.eq ''
    r2.should.eq 'file'

  it 'deleteFs', ->
    r = caro.deleteFs('./src', './1.js', './2.lnk',
      (e, path) ->
    , true);
    r.should.be.a('boolean')

  it 'renameFs', ->
    r = caro.renameFs('./a', './b/c', true);
    r2 = caro.renameFs(['1.js', '2.js'], ['3.js', '4.js']);
    r.should.be.a('boolean')
    r2.should.be.a('boolean')

  it 'getFsStat', ->
    r = caro.getFsStat('./caro.js');
    r.should.be.a('object')

  it 'getFsSize', ->
    r = caro.getFsSize('./caro.js');
    r2 = caro.getFsSize('./caro.js', 'mb');
    r3 = caro.getFsSize(123000, 'mb');
    r.should.be.a('number')
    r2.should.be.a('number')
    r3.should.be.a('number')

  it 'humanFeSize', ->
    r = caro.humanFeSize('./caro.js', 'ededed', undefined);
    r2 = caro.humanFeSize('./caro.js', 3);
    r3 = caro.humanFeSize(10000000.456, 2, false);
    r.should.be.a('string')
    r2.should.be.a('string')
    r3.should.be.a('string')