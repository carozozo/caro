do ->
describe 'Object', ->
  it 'coverFnToStrInObj', ->
    arg = {
      a: 1, b: 2, c: (a) ->
        return a
    };
    arg2 = {
      a: 1, b: 2, c: (a) ->
        return a
    };
    r = caro.coverFnToStrInObj(arg, true);
    r2 = caro.coverFnToStrInObj(arg2);
    r.should.eql {a: 1, b: 2, c: 'function (a) {return a;}'}
    r2.should.eql {a: 1, b: 2, c: 'function (a) {\n return a;\n }'}

  it.only 'toWord', ->
    r = caro.toWord(['caro', undefined], true)
    r2 = caro.toWord({a: false, b: null, c: 0, d: 'caro', e: undefined, f: [], g: ()->})
    r.should.eq('''
    [
        'caro',
        undefined
    ]
    ''')
    r2.should.eq("{a: false,b: null,c: 0,d: 'caro',e: undefined,f: [],g: function () {}}")