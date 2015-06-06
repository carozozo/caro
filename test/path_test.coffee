do ->
describe 'Path', ->
  path = 'a/b/c/d.js'
  it 'getDirPath', ->
    r = caro.getDirPath(path)
    r.should.be.eql 'a/b/c/'

  it 'getFileName', ->
    r = caro.getFileName(path)
    r2 = caro.getFileName(path, false)
    r.should.be.eql 'd.js'
    r2.should.be.eql 'd'

  it 'getExtendName', ->
    r = caro.getExtendName(path)
    r2 = caro.getExtendName(path, false)
    r.should.be.eql '.js'
    r2.should.be.eql 'js'