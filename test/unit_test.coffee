#do ->
#describe.only 'Unit', ->
#  it 'test', ->
#    a = {
#      a: false, b: null, c: 0, d: 'caro', e: undefined, f: [3, 4, 5, 6],
#      g: () ->
#        return 1
#      h: {
#        i: 3
#        j: () -> return 2
#        k: {
#          l: () -> return 3
#        }
#      }
#    }
#    r = caro.toWord(a, 6)
#    console.log r