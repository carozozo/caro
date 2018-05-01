do ->
describe 'Helper', ->
  should = require('chai').should()
  caro = require('../dist/caro.js')
  it 'checkIfPass', ->
    r = caro.checkIfPass [1, 2, 3], (val) ->
      return val == 1
    r2 = caro.checkIfPass [1, 2, 3], (val) ->
      return val > 2
    , false
    r.should.be.false
    r2.should.be.true

  it 'executeIfFn', ->
    arg = (i) ->
      ++i
    r = caro.executeIfFn(arg, 12)
    r2 = caro.executeIfFn(null)
    r.should.eq 13
    should.equal r2, undefined

  it 'formatMoney', ->
    arg = null
    arg2 = '12003000.923'
    arg3 = 12003000.923
    r = caro.formatMoney(arg)
    r2 = caro.formatMoney(arg2, 'int')
    r3 = caro.formatMoney(arg3, 'sInt')
    r4 = caro.formatMoney(arg3, {
      float: 0, separated: ',',
      decimal: '.', prefix: '',
      forceFloat: false
    })
    r5 = caro.formatMoney(arg3, {
      float: 5, forceFloat: true
    })
    r.should.eq '0'
    r2.should.eq '12,003,000'
    r3.should.eq '$12,003,000'
    r4.should.eq '12,003,000'
    r5.should.eq '12,003,000.92300'

  it 'getFnName', ->
    arg = (i) ->
      ++i
    r = caro.getFnName(arg)
    r.should.be.a('string')

  it 'getFnBody', ->
    arg = (i) ->
      ++i
    r = caro.getFnBody(arg)
    r.should.be.a('string')

  it 'getStackList', ->
    r = caro.getStackList()
    r2 = caro.getStackList(0, 2)
    r = r[0].file
    r2 = r2[0].file
    r.should.be.eql 'helper.test.coffee'
    r2.should.be.eql 'helper.test.coffee'

  it 'setInterval', (done) ->
    @timeout(1000);
    countA = 0
    countB = 0
    caro.setInterval(->
      ++countA
    , 1, 3)
    caro.setInterval(->
      if countB is 5
        done()
        return false
      ++countB
    , 1)

  it 'random', ->
    r = caro.random(15)
    r2 = caro.random(15, {
      lower: true
      upper: false
      num: true
      exclude: 'a,b,c,d,e,f,g,1,2,3,4,5'
    })
    r.should.be.a('string')
    r2.should.be.a('string')

  it 'randomInt', ->
    r = caro.randomInt(3)
    r2 = caro.randomInt(3, -3)
    r3 = caro.randomInt()
    (r >= 0 and r <= 3).should.be.true
    caro.isInteger(r).should.be.true
    (r2 >= -3 and r2 <= 3).should.be.true
    caro.isInteger(r2).should.be.true
    r3.should.be.eq(0)

  it 'randomNum', ->
    r = caro.randomNum(3)
    r2 = caro.randomNum(3, -3)
    r3 = caro.randomNum()
    (r >= 0 and r <= 3).should.be.true
    (r2 >= -3 and r2 <= 3).should.be.true
    r3.should.be.eq(0)

  it 'serializeUrl', ->
    arg = 'http://localhost'
    obj = {a: 1, b: 2, c: null}
    r = caro.serializeUrl(arg, obj)
    r2 = caro.serializeUrl(arg, obj, true)
    r.should.eq 'http://localhost?a=1&b=2'
    r2.should.eq 'http://localhost?a=1&b=2&c='