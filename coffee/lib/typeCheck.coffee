###*
# TypeCheck
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # check if integer
  # @param {*} arg
  # @returns {boolean}
  ###
  self.isInteger = (arg) ->
    return false if !caro.isNumber arg
    int = parseInt(arg)
    int == arg

  ###*
  # check if JSON, return false is one of them not match
  # @param {*} arg
  # @returns {boolean}
  ###
  self.isJson = (arg) ->
    try
      JSON.parse(arg);
    catch e
      return false
    true

  ###*
  # check if argument is object-like JSON, return false is one of them not match
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isObjJson = (arg) ->
    try
      r = JSON.parse(arg);
      return caro.isObject(r)
    catch e
    false

  return