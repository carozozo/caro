((g) ->
  'use strict'
  caro = {}
  caro.isNode = do ->
    return global? and module? and exports?
  g.caro = caro
  if caro.isNode
    module.exports = caro
    global.caro = caro) this

do ->
  if caro.isNode
    # https://www.npmjs.com/package/moment
    caro.nMoment = require 'moment'
    # https://www.npmjs.com/package/validator
    # caro.nValidator = require 'validator'
  else
    if moment?
      caro.nMoment = moment
#    if validator?
#      caro.nValidator = validator
  return