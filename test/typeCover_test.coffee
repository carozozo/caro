do ->
describe 'Helper', ->
  it 'toArray', ->
    r = caro.toArray('3')
    r2 = caro.toArray(1)
    r.should.eql(['3'])
    r2.should.eql([1])

  it 'toString', ->
    r = caro.toString('3')
    r2 = caro.toString(['caro', undefined])
    r3 = caro.toString({a: false, b: null, c: 0, d: NaN, e: undefined, f: [], g:()->})
    r.should.eq('3')
    r2.should.eq('caro,')
    r3.should.eq('[object Object]')

  it 'toInteger', ->
    r = caro.toInteger('3')
    r2 = caro.toInteger('caro')
    r3 = caro.toInteger(null, false)
    r.should.eq(3)
    r2.should.eq(0)
    should.equal(r3, null);

  it 'toNumber', ->
    r = caro.toNumber('3.4')
    r2 = caro.toNumber('caro')
    r3 = caro.toNumber('caro', false)
    r.should.eq(3.4)
    r2.should.eq(0)
    r3.should.eq('caro')

  it 'toFixedNumber', ->
    r = caro.toFixedNumber('3.4355', 2)
    r2 = caro.toFixedNumber(undefined, 3)
    r3 = caro.toFixedNumber('caro', 3, false)
    r.should.eq(3.44)
    r2.should.eq(0)
    r3.should.eq('caro')

  it 'toObject', ->
    r = caro.toObject('3.4')
    r2 = caro.toObject('{"a":3}')
    r3 = caro.toObject('caro', false)
    r.should.eql({})
    r2.should.eql({a: 3})
    r3.should.eq('caro')

  it 'toJson', ->
    r = caro.toJson(3.4)
    r2 = caro.toJson({
      a: 3
      b: 5
    }, {
      replacer: (key, val) ->
        return val if (key == '')
        return val + 1
      space: 0
      force: false
    })
    r3 = caro.toJson(undefined, {
      force: false
    })
    r.should.eq('3.4')
    r2.should.eq('{"a":4,"b":6}')
    should.equal(r3, undefined)