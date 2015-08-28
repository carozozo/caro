do ->
describe 'TypeCover', ->
  it 'toString', ->
    r = caro.toString('3')
    r2 = caro.toString(['caro', undefined])
    r3 = caro.toString({a: false, b: null, c: 0, d: NaN, e: undefined, f: [], g: ->})
    r.should.eq('3')
    r2.should.eq('caro,')
    r3.should.eq('[object Object]')

  it 'toInteger', ->
    r = caro.toInteger('3')
    r2 = caro.toInteger('caro')
    r3 = caro.toInteger(null)
    r.should.eq(3)
    r2.should.eql(NaN)
    r3.should.eql(NaN)

  it 'toNumber', ->
    r = caro.toNumber('3.4')
    r2 = caro.toNumber('caro')
    r3 = caro.toNumber({})
    r.should.eq(3.4)
    r2.should.eql(NaN)
    r3.should.eql(NaN)

  it 'toFixedNumber', ->
    r = caro.toFixedNumber('3.4355', 2)
    r2 = caro.toFixedNumber(2.12345, 3)
    r3 = caro.toFixedNumber('caro', 3)
    r.should.eq(3.44)
    r2.should.eq(2.123)
    r3.should.eql(NaN)

  it 'toJson', ->
    r = caro.toJson(3.4)
    r2 = caro.toJson(
      {
        a: 3
        b: 5
      }
    ,
      (key, val) ->
        return val if (key == '')
        return val + 1
    )
    r3 = caro.toJson(undefined)
    r.should.eq('3.4')
    r2.should.eq('{"a":4,"b":6}')
    should.equal(r3, undefined)