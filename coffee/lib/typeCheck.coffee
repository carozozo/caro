###*
# TypeCheck
# @namespace caro
# @author Caro.Huang
###

do ->
  'use strict'
  self = caro

  checkType = (args, type) ->
    pass = true
    caro.each args, (i, arg) ->
      if typeof arg != type
        pass = false
      return
    pass

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isBool = (arg) ->
    checkType arguments, 'boolean'

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isStr = (arg) ->
    checkType arguments, 'string'

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isFn = (arg) ->
    checkType arguments, 'function'

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isNum = (arg) ->
    checkType arguments, 'number'

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isInt = (arg) ->
    if !checkType.apply(null, arguments)
      return false
    caro.checkIfPassCb arguments, (val) ->
      int = parseInt(val)
      int == val

  ###*
  # @param {...} arg
  # @returns {*}
  ###

  self.isArr = (arg) ->
    caro.checkIfPassCb arguments, (val) ->
      Array.isArray val

  ###*
  # @param {...} arg
  # @returns {*}
  ###

  self.isNull = (arg) ->
    caro.checkIfPassCb arguments, (val) ->
      val == null

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isJson = (arg) ->
    pass = true
    caro.each arguments, (i, arg) ->
      try
        JSON.parse(arg);
      catch e
        pass = false;
        return false
      return
    pass

  ###*
  # check if argument is object-like JSON
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isObjJson = (arg) ->
    caro.checkIfPassCb arguments, (val) ->
      try
        r = JSON.parse(val);
        return caro.isObj(r)
      catch e
        return false


  ###*
  # @param {...} arg
  # @returns {*}
  ###

  self.isUndef = (arg) ->
    checkType arguments, 'undefined'

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isObj = (arg) ->
    if !checkType(arguments, 'object')
      return false
    caro.checkIfPassCb arguments, (val) ->
# Note: array and null is object in js
      !caro.isNull(val) and !caro.isArr(val)

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isObjOrArr = (arg) ->
    return false if !checkType(arguments, 'object')
    caro.checkIfPassCb arguments, (val) ->
# Note: null is object in js
      !caro.isNull(val)

  ###*
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isRegExp = (arg) ->
    caro.checkIfPassCb arguments, (val) ->
      val instanceof RegExp

  ### -------------------- Node.js only -------------------- ###

  if !caro.isNode
    return

  ###*
  # @param {...} arg
  # @returns {Boolean}
  ###

  self.isBuf = (arg) ->
    caro.checkIfPassCb arguments, (val) ->
# Buffer is only working on node.js
      try
        return Buffer.isBuffer(val)
      catch e
        return false
      return

  return