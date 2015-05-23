###*
# TypeCheck
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  checkType = (args, type) ->
    pass = true
    caro.each args, (i, arg) ->
      if typeof arg != type
        pass = false
      return
    pass

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
      return caro.isObj(r)
    catch e
    false

  ###*
  # check if object, return false is one of them not match
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isObj = (arg) ->
    if !checkType(arguments, 'object')
      return false
    caro.checkIfPassCb arguments, (val) ->
      !caro.isNull(val) and !caro.isArray(val)

  ###*
  # check if RegExp, return false is one of them not match
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isRegExp = (arg) ->
    caro.checkIfPassCb arguments, (val) ->
      val instanceof RegExp

  ### -------------------- Node.js only -------------------- ###
  return if !caro.isNode

  ###*
  # check if Buffer, return false is one of them not match
  # @param {...} arg
  # @returns {Boolean}
  ###
  self.isBuf = (arg) ->
    caro.checkIfPassCb arguments, (val) ->
      try
        return Buffer.isBuffer(val)
      catch e
        return false
      return

  return