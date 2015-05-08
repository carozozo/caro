((g) ->
  'use strict'
  caro = {}
  caro.isNode = do ->
    typeof module != 'undefined' and typeof exports != 'undefined'
  g.caro = caro
  if caro.isNode
    global.caro = caro
    module.exports = caro
) this