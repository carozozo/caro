do ->
describe 'Path', ->
  path = 'a/b/c/d.js'
  path2 = 'caro/caro.js'
  path3 = 'a/b/a'
  it 'getDirPath', ->
    r = caro.getDirPath(path)
    r2 = caro.getDirPath(path2)
    r3 = caro.getDirPath(path3)
    r.should.be.eql 'a/b/c/'
    r2.should.be.eql 'caro/'
    r3.should.be.eql 'a/b/'

  it 'getFileName', ->
    r = caro.getFileName(path)
    r2 = caro.getFileName(path, false)
    r3 = caro.getFileName(path3)
    r.should.be.eql 'd.js'
    r2.should.be.eql 'd'
    r3.should.be.eql 'a'

  it 'getExtendName', ->
    r = caro.getExtendName(path)
    r2 = caro.getExtendName(path, false)
    r3 = caro.getExtendName(path3, false)
    r.should.be.eql '.js'
    r2.should.be.eql 'js'
    r3.should.be.eql ''