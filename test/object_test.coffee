do ->
describe 'Object', ->
  it.only 'toWord', ->
    a = {
      a: false, b: null, c: 0, d: 'caro', e: undefined, f: [],
      g: () ->
        return 1
      h: {
        i: 3
        j: () -> return 2
        k: {
          l: () -> return 3
        }
      }
    }
    r = caro.toWord(['caro', undefined], 4)
    r2 = caro.toWord(a)
    console.log r
    console.log r2
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