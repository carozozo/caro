#do ->
#describe.only 'Unit', ->
#  it 'test', ->
#    arr = [
#      Object(3)
#      Object(()->
#        @.pika='abc'
#        return
#      )
##      Object(null)
##      caro.toInteger('3')
##      caro.toInteger('caro')
##      caro.toInteger(null)
#    ]
#
#    caro.forEach(arr, (val)->
#      console.log val
#      console.log typeof val
#      caro.forEach(val,(v,k)->
#        console.log 'v=',v
#        console.log 'k=',k
#      )
#      console.log '-----------'
#    )