do ->
describe 'Object', ->
  it 'toWord', ->
    a = {
      a: false, b: null, c: 0, d: 'caro', e: undefined, f: [],
      g: ->
        return 1
      h: {
        i: 3
        j: -> return 2
        k: {
          l: -> return 3
        }
      }
    }
    r = caro.toWord(['caro', undefined], 4)
    r2 = caro.toWord(a)
    r.should.eq('''
    [
        caro,
        null
    ]
    ''')
    r2.should.eq('''
    {
      a: false,
      b: null,
      c: 0,
      d: caro,
      f: [],
      g: function () {
        return 1;
      },
      h: {
        i: 3,
        j: function () {
          return 2;
        },
        k: {
          l: function () {
            return 3;
          }
        }
      }
    }
    ''')

  it 'classify', ->
    r = caro.classify({
      a: 1
      b: 'd'
      c: {cc: 1}
      d: ->
      e: ['caro']
      f: 'FF'
    })
    r2 = caro.classify([
      'caro'
      '4'
      3
      -> return 'a'
      ['m']
    ])
    keysArr = ['bool', 'str', 'num', 'arr', 'obj', 'fn']
    r.should.has.keys(keysArr)
    r2.should.has.keys(keysArr)

  it 'catching', ->
    obj = {name: 'Caro', age: 18}
    obj2 = {country: 'Taiwan', city: 'Kaohsiung'}
    r = {name: ''}
    r2 = {name: '', city: ''}
    caro.catching(r, obj)
    caro.catching(r2, obj, obj2)
    r.name.should.eq 'Caro'
    r2.name.should.eq 'Caro'
    r2.city.should.eq 'Kaohsiung'

  it 'differentKeys', ->
    obj = {name: 'Caro', age: 18}
    obj2 = {name: 'Snoopy', country: 'Taiwan', city: 'Kaohsiung'}
    r = caro.differentKeys(obj, obj2)
    r2 = caro.differentKeys(obj, obj2, true)
    r.should.eql ['age']
    r2.should.eql ['country', 'city']

    it 'sameKeys', ->
      obj = {a: 1, b: 2, c: 3, e: 4}
      obj2 = {a: 3, c: 4, d: 5, e: 6}
      r = caro.sameKeys(obj, obj2)
      r.should.eql ['a', 'c', 'e']

  it 'hasEqualKeys', ->
    obj = {name: 'Caro', age: 18}
    obj2 = {name: 'Snoopy', age: 3}
    obj3 = {name: 'Kitty', country: 'Japan'}
    r = caro.hasEqualKeys(obj, obj2)
    r2 = caro.hasEqualKeys(obj, obj3)
    r.should.be.true
    r2.should.be.false