do ->
describe 'String', ->
  it 'random', ->
    r = caro.random(15)
    r2 = caro.random(15, {
      lower: true
      upper: false
      num: false
      exclude: 'a,b,c,d,e,f,g,1,2,3,4'
    });
    r.should.be.a('string')
    r2.should.be.a('string')

  it 'strToBool', ->
    r = caro.strToBool('false')
    r2 = caro.strToBool('True')
    r3 = caro.strToBool('123')
    r4 = caro.strToBool('')
    r.should.be.false
    r2.should.be.true
    r3.should.be.true
    r4.should.be.false

