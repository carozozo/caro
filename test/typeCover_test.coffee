do ->
describe 'Helper', ->
  it 'coverToArr', ->
    r = caro.coverToArr('3')
    r2 = caro.coverToArr([1])
    r.should.eql(['3'])
    r2.should.eql([1])

  it 'coverToStr', ->
    r = caro.coverToStr('3')
    r2 = caro.coverToStr(['caro', 4])
    r3 = caro.coverToStr(undefined)
    r.should.eq('3')
    r2.should.eq('caro,4')
    r3.should.eq('undefined')

  it 'coverToInt', ->
    r = caro.coverToInt('3')
    r2 = caro.coverToInt('caro')
    r3 = caro.coverToInt(null, false)
    r.should.eq(3)
    r2.should.eq(0)
    should.equal(r3, null);

  it 'coverToNum', ->
    r = caro.coverToNum('3.4')
    r2 = caro.coverToNum('caro')
    r3 = caro.coverToNum('caro', false)
    r.should.eq(3.4)
    r2.should.eq(0)
    r3.should.eq('caro')

  it 'coverToFixed', ->
    r = caro.coverToFixed('3.4355', 2)
    r2 = caro.coverToFixed(undefined, 3)
    r3 = caro.coverToFixed('caro', 3, false)
    r.should.eq(3.44)
    r2.should.eq(0)
    r3.should.eq('caro')

  it 'coverToObj', ->
    r = caro.coverToObj('3.4')
    r2 = caro.coverToObj('{"a":3}')
    r3 = caro.coverToObj('caro', false)
    r.should.eql({})
    r2.should.eql({a: 3})
    r3.should.eq('caro')

  it 'coverToJson', ->
    r = caro.coverToJson(3.4)
    r2 = caro.coverToJson({
      a: 3
      b: 5
    }, {
      replacer: (key, val) ->
        return val if (key == '')
        return val + 1
      space: 0
      force: false
    })
    r3 = caro.coverToJson(undefined, {
      force: false
    })
    r.should.eq('3.4')
    r2.should.eq('{"a":4,"b":6}')
    should.equal(r3, undefined)