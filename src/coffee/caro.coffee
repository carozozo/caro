((g) ->
  isNode = global? and module? and exports?
  if isNode
    caro = {}
    try
      caro = require('lodash').runInContext()
    catch e
    module.exports = caro
    global.caro = caro
  else
    caro = if _? then _ else {}
    g.caro = caro
  return) this