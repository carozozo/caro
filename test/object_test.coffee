do ->
describe 'Object', ->
  it 'toWord', ->
    r = caro.toWord(['caro', undefined], true)
    r2 = caro.toWord({a: false, b: null, c: 0, d: 'caro', e: undefined, f: [], g: ()->})
    r.should.eq('''
    [
      'caro',
      undefined
    ]
    ''')
    r2.should.eq("{a:false,b:null,c:0,d:'caro',e:undefined,f:[],g:function () {}}")