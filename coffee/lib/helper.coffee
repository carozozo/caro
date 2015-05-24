###*
# Helper
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # check if arg is boolean | string | number
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isBasicVal = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
      !(!caro.isBoolean(arg) and !caro.isString(arg) and !caro.isNumber(arg))

  ###*
  # check if value is empty ( {} | [] | null | '' | undefined )
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isEmptyVal = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
      return caro.getObjLength(arg) < 1 if caro.isObject(arg)
      return arg.length < 1 if caro.isArray(arg)
      !arg and arg != 0 and arg != false

  ###*
  # check if value is true | 'true' | 1
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isTrue = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
      if caro.isString(arg)
        arg = arg.toLowerCase()
      arg == true or arg == 'true' or arg == 1

  ###*
  # check if value is false | 'false' | 0
  # @param arg
  # @returns {boolean}
  ###
  self.isFalse = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
      if caro.isString(arg)
        arg = arg.toLowerCase()
      arg == false or arg == 'false' or arg == 0

  ###*
  # check all argument in array by check-function, get false if check-function return false
  # @param {[]} array
  # @param {function} checkFn
  # @param {boolean} [needAllPass=true] when returnIfAllPass=true, return true when all check-result are true
  # @returns {boolean}
  ###
  self.checkIfPassCb = (arr, checkFn, needAllPass = true) ->
    return false if !Array.isArray(arr) and typeof arr != 'object' or !caro.isFunction(checkFn)
    caro.each arr, (i, arg) ->
      result = checkFn(arg)
      # need all pass, but result is false || no-need all pass, and result is true
      if needAllPass and result == false or !needAllPass and result == true
        needAllPass = !needAllPass
        return false
      return
    needAllPass

  ###*
  # execute if first-argument is function
  # @param {function} fn
  # @param {...*} args function-arguments
  # @returns {*}
  ###
  self.executeIfFn = (fn, args) ->
    otherArgs = []
    r = undefined
    caro.eachArgs arguments, (i, arg) ->
      return if i < 1
      otherArgs.push arg
      return
    r = fn.apply(fn, otherArgs) if caro.isFunction(fn)
    r

  ###*
  # get function name
  # @param {*} fn
  # @returns {string|*|String}
  ###
  self.getFnName = (fn) ->
    return null if !caro.isFunction(fn)
    r = fn.toString()
    r = r.substr('function '.length)
    r = r.substr(0, r.indexOf('('))
    r

  ###*
  # format to money type like 1,000.00
  # @param {string|number} arg
  # @param {string} [type=int|sInt] format-type, if type is set, the opt will not work
  # @param {object} [opt]
  # @param {number} [opt.float=0]
  # @param [opt.decimal=.]
  # @param [opt.separated=,]
  # @param [opt.prefix]
  # @returns {string}
  ###
  self.formatMoney = (arg, type, opt) ->
    r = []
    caro.eachArgs arguments, (i, arg) ->
      return if i == 0
      return opt = arg if caro.isObject(arg)
      return type = arg if caro.isString(arg)
      return
    opt = caro.coverToObj(opt);
    float = Math.abs(caro.coverToInt(opt.float))
    decimal = if caro.isString(opt.decimal) then opt.decimal else '.'
    separated = if caro.isString(opt.separated) then opt.separated else ','
    prefix = if caro.isString(opt.prefix) then opt.prefix else ''
    forceFloat = opt.forceFloat == true
    s = if arg < 0 then '-' else ''
    switch type
      when 'sInt'
        float = 0
        prefix = '$'
      when 'int'
        float = 0
    arg = caro.coverToNum(arg)
    arg = caro.coverToStr(arg)
    aStr = caro.splitStr(arg, '.')
    iStr = aStr[0]
    fStr = if aStr[1] then aStr[1].slice(0, float) else ''
    if forceFloat
      for i in [1..float - fStr.length]
        fStr += '0'
    sepLength = if iStr.length > 3 then iStr.length % 3 else 0
    r.push prefix
    r.push s + (if sepLength then iStr.substr(0, sepLength) + separated else '')
    r.push iStr.substr(sepLength).replace(/(\d{3})(?=\d)/g, '$1' + separated)
    r.push if fStr then (decimal + fStr) else ''
    r.join ''

  return