###*
# Helper
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # cover to string
  # @param arg
  # @returns {*}
  ###
  self.toString = (arg) ->
    String(arg)

  ###*
  # cover to integer
  # @param arg
  # @returns {*}
  ###
  self.toInteger = (arg) ->
    parseInt(arg)

  ###*
  # cover to number
  # @param arg
  # @returns {*}
  ###
  self.toNumber = (arg) ->
    Number(arg)

  ###*
  # cover to fixed-number
  # @param arg
  # @param {boolean} [dec=2] decimal-number
  # @returns {*}
  ###
  self.toFixedNumber = (arg, dec = 2) ->
    r = caro.toString(arg);
    r = r.replace(/5$/, '6') if(arg % 1)
    Number((+r).toFixed(dec))

  ###*
  # @param arg
  # @param {*} [replacer=null] the replace in each element
  # @param {*} [space=0] the space for easy-reading after cover to JSON
  # @returns {*}
  ###
  self.toJson = (arg, replacer, space) ->
    JSON.stringify.apply(null, arguments)

  return