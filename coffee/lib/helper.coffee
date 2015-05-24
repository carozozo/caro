###*
# Helper
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # check all argument in array by check-function, get false if check-function return false
  # @param {[]} array
  # @param {function} checkFn
  # @param {boolean} [needAllPass=true] when returnIfAllPass=true, return true when all check-result are true
  # @returns {boolean}
  ###
  self.checkIfPassCb = (arr, checkFn, needAllPass = true) ->
    caro.forEach arr, (arg) ->
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
    args = caro.drop(arguments)
    fn.apply(fn, args) if caro.isFunction(fn)

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
    caro.forEach arguments, (arg, i) ->
      return if i == 0
      return opt = arg if caro.isObject(arg)
      return type = arg if caro.isString(arg)
      return
    opt = caro.toObject(opt);
    float = Math.abs(caro.toInteger(opt.float))
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
    arg = caro.toNumber(arg)
    arg = caro.toString(arg)
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