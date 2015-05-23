((g) ->
  caro = {}
  caro.isNode = do ->
    return global? and module? and exports?
  g.caro = caro
  if caro.isNode
    module.exports = caro
    global.caro = caro) this