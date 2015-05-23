((g) ->
  caro = if _? then _ else {}
  caro.isNode = do ->
    return global? and module? and exports?
  g.caro = caro
  if caro.isNode
    caro = require 'lodash'
    module.exports = caro
    global.caro = caro
) this