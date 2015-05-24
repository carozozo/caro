#do ->
#describe.only 'Unit', ->
#  it 'test', ->
#    arr = [
#      caro.toString('3')
#      caro.toString(['caro', undefined])
#      caro.toString(undefined)
#      caro.toString(null)
#      caro.toString(1)
#      caro.toWord({a: false, b: null, c: 0, d: 'caro', e: undefined, f: [], g: ()->}, false)
#      caro.toString(()->)
#    ]
#
#    caro.forEach(arr, (val)->
#      console.log val
#    )