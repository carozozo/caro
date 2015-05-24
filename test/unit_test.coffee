#do ->
#describe.only 'Unit', ->
#  it 'test', ->
#    arr=[
#      caro.toArray('3')
#      caro.toArray(['caro',undefined])
#      caro.toArray(undefined)
#      caro.toArray(null)
#      caro.toArray(1)
#      caro.toArray({a:'2',c:'d'})
#      caro.toArray(()->)
#    ]
#
#    caro.forEach(arr,(val)->
#      console.log val
#    )
