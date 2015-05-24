#do ->
#describe.only 'Unit', ->
#  it 'test', ->
#    arr=[
#      caro.toString('3')
#      caro.toString(['caro',undefined])
#      caro.toString(undefined)
#      caro.toString(null)
#      caro.toString(3)
#      caro.toString({a:'2',c:'d'})
#      caro.toString(()->)
#      caro.toString(NaN)
#    ]
#
#    caro.forEach(arr,(val)->
#      console.log val
#    )
