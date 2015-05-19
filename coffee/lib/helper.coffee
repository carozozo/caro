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
      !(!caro.isBool(arg) and !caro.isStr(arg) and !caro.isNum(arg))

  ###*
  # check if value is empty ( {} | [] | null | '' | undefined )
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isEmptyVal = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
      return caro.getObjLength(arg) < 1 if caro.isObj(arg)
      return arg.length < 1 if caro.isArr(arg)
      !arg and arg != 0 and arg != false

  ###*
  # check if value is true | 'true' | 1
  # @param {...} arg
  # @returns {boolean}
  ###
  self.isTrue = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
      if caro.isStr(arg)
        arg = arg.toLowerCase()
      arg == true or arg == 'true' or arg == 1

  ###*
  # check if value is false | 'false' | 0
  # @param arg
  # @returns {boolean}
  ###
  self.isFalse = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
      if caro.isStr(arg)
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
    return false if !Array.isArray(arr) and typeof arr != 'object' or !caro.isFn(checkFn)
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
      if i == 0 and caro.isFn(arg)
        fn = arg
        return
      otherArgs.push arg
      return
    if fn
      r = fn.apply(fn, otherArgs)
    r

  ###*
  # get function name
  # @param {*} fn
  # @returns {string|*|String}
  ###
  self.getFnName = (fn) ->
    if !caro.isFn(fn)
      return null
    r = fn.toString()
    r = r.substr('function '.length)
    r = r.substr(0, r.indexOf('('))
    r

  ###*
  # get arguments, and return as array
  # @param args should be arguments (object with numeric-key)
  # @returns {Array}
  ###
  self.getArgumentsAsArr = (args) ->
    r = []
    caro.each args, (i, val) ->
      r.push val
      return
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
      return opt = arg if caro.isObj(arg)
      return type = arg if caro.isStr(arg)
      return
    opt = caro.coverToObj(opt);
    float = Math.abs(caro.coverToInt(opt.float))
    decimal = if caro.isStr(opt.decimal) then opt.decimal else '.'
    separated = if caro.isStr(opt.separated) then opt.separated else ','
    prefix = if caro.isStr(opt.prefix) then opt.prefix else ''
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

  ###*
  # cover to array
  # @param arg
  # @returns {*}
  ###
  self.coverToArr = (arg) ->
    return arg if caro.isArr(arg)
    [arg]

  ###*
  # cover to string, will return '' if force!=false
  # @param arg
  # @param {boolean} [force=true] if return string
  # @returns {*}
  ###
  self.coverToStr = (arg, force = true) ->
    if caro.isStr(arg)
      return arg
    if arg == undefined
      if force
        return 'undefined'
      return ''
    if arg == null
      if force
        return 'null'
      return ''
    if caro.isObj(arg)
      if force
# cover fn to string first, and not replace \r\n
        caro.coverFnToStrInObj arg, false
        # after cover to json, replace \\r\\n to wrap
        arg = caro.coverToJson(arg)
        arg = caro.replaceAll(arg, '\\r', '\r')
        arg = caro.replaceAll(arg, '\\n', '\n')
        return arg
      return ''
    return arg.toString() if caro.isFn(arg.toString)
    return arg if !force
    ''

  ###*
  # cover to integer
  # @param arg
  # @param {boolean} [force=true] if return 0 when it's NaN
  # @returns {*}
  ###
  self.coverToInt = (arg, force = true) ->
    int = parseInt(arg)
    return arg if !force
    int or 0

  ###*
  # cover to number
  # @param arg
  # @param {boolean} [force=true] if return 0 when it's NaN
  # @returns {*}
  ###
  self.coverToNum = (arg, force = true) ->
    num = parseFloat(arg)
    return arg if !force
    num or 0

  ###*
  # cover to fixed-number
  # @param arg
  # @param {boolean} [force=true] if return 0 when it's NaN
  # @returns {*}
  ###
  self.coverToFixed = (arg, dec, force = true) ->
    dec = dec || 0;
    r = caro.coverToStr(arg);
    r = r.replace(/5$/, '6') if(arg % 1)
    r = Number((+r).toFixed(dec))
    return arg if !force
    r or 0

  ###*
  # cover to object
  # @param arg
  # @param {boolean} [force=true] if return {} when cover-failed, otherwise return original-argument
  # @returns {*}
  ###
  self.coverToObj = (arg, force = true) ->
    if caro.isObj(arg)
      return arg
    if caro.isArr(arg)
      r = {}
      caro.each(arg, (i, val) ->
        r[i] = val
      )
      return r
    try
      r = JSON.parse(arg)
      return r if caro.isObj(r)
    catch e
    return arg if !force
    {}

  ###*
  # @param arg
  # @param {object} [opt]
  # @param {boolean} [opt.force=true] if force cover to JSON
  # @param {function=null} [opt.replacer] the replace-function in each element
  # @param {space=4} [opt.space] the space for easy-reading after cover to JSON
  # @returns {*}
  ###
  self.coverToJson = (arg, opt) ->
    json = ''
    opt = caro.coverToObj(opt)
    force = opt.force != false
    replacer = opt.replacer or null
    space = if opt.space? then opt.space else 4
    if space
      json = JSON.stringify(arg, replacer, space)
    else
      json = JSON.stringify(arg, replacer)
    return json if caro.isJson(json)
    return arg if !force
    ''

  return