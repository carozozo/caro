###
# TypeCheck
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro
  ###
  # check if arg is boolean | string | number
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isBasicVal = (arg) ->
    caro.checkIfPass arguments, (arg) ->
      !(!caro.isBoolean(arg) and !caro.isString(arg) and !caro.isNumber(arg))

  ###
  # check if value is empty ( {} | [] | null | '' | undefined )
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isEmptyVal = (arg) ->
    caro.checkIfPass arguments, (arg) ->
      return false if caro.isNumber(arg) or caro.isBoolean(arg)
      return caro.size(arg) < 1

  ###
  # check if value is true | 'true' | 1
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isEasingTrue = (arg) ->
    arg = arg.toLowerCase() if caro.isString(arg)
    arg == true or arg == 'true' or arg == 1

  ###
  # check if value is false | 'false' | 0
  # @param arg
  # @returns {boolean}
  ###
  self.isEasingFalse = (arg) ->
    arg = arg.toLowerCase() if caro.isString(arg)
    arg == false or arg == 'false' or arg == 0

  ###
  # check if integer
  # @param {*} arg
  # @returns {boolean}
  ###
  self.isInteger = (arg) ->
    return false if !caro.isNumber arg
    int = parseInt(arg)
    int == arg

  ###
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

  ###
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

  ###
  # check if string is uppercase
  # @param {...string} str
  # @returns {boolean}
  ###
  self.isUpper = (str) ->
    upp = str.toUpperCase()
    return false if upp != str
    true

  ###
  # check if string is lowercase
  # @param {string} str
  # @returns {boolean}
  ###
  self.isLower = (str) ->
    low = str.toLowerCase()
    return false if low != str
    true

  return