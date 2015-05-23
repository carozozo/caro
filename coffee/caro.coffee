((g) ->
  caro = if _? then _ else {}
  g.caro = caro
  isNode = do ->
    return global? and module? and exports?
  if isNode
    caro = require 'lodash'
    module.exports = caro
    global.caro = caro
  caro.isNode = isNode) this