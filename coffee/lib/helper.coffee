###
# Helper
# @author Caro.Huang
###
do ->
  self = caro

  ###
  # check all argument in array by check-function,
  # get false if check-function return false
  # @param {[]} array
  # @param {function} checkFn
  # @param {boolean} [needAllPass=true] when returnIfAllPass=true, return true when all check-result are true
  # @returns {boolean}
  ###
  self.checkIfPass = (arr, checkFn, needAllPass = true) ->
    caro.forEach arr, (arg) ->
      result = checkFn(arg)
      # need all pass, but result is false || no-need all pass, and result is true
      if needAllPass and result == false or !needAllPass and result == true
        needAllPass = !needAllPass
        return false
      return
    needAllPass

  ###
  # execute if first-argument is function
  # @param {function} fn
  # @param {...*} args function-arguments
  # @returns {*}
  ###
  self.executeIfFn = (fn, args) ->
    args = caro.drop(arguments)
    fn.apply(fn, args) if caro.isFunction(fn)
  ###
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
    opt = opt or {}
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

  ###
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

  ###
  # get function content
  # @param {*} fn
  # @returns {string|*|String}
  ###
  self.getFnBody = (fn) ->
    return null if !caro.isFunction(fn)
    entire = fn.toString()
    return entire.slice(entire.indexOf('{') + 1, entire.lastIndexOf('}'))

  ###
  # get stack-information list
  # @param {number} [start=0] the start-index of list
  # @param {number} [length=null] the list length you want get
  # @returns {array}
  ###
  self.getStackList = (start, length) ->
    r = []
    err = new Error()
    stack = err.stack
    aStack = caro.splitByWrap(stack).slice(2)
    start = start or 0
    length = length or null
    if length
      end = start + length - 1
    else
      end = aStack.length - 1
    caro.forEach(aStack, (sStack, i) ->
      return if i < start or i > end
      data = {}
      reg = /^\s*at\s*/i
      sStack = sStack.replace(reg, '')
      reg = /(.*)\s+\((.*):(\d*):(\d*)\)/gi
      reg2 = /()(.*):(\d*):(\d*)/gi
      info = reg.exec(sStack) or reg2.exec(sStack)
      return if (!info or info.length != 5)
      data.stack = info[0]
      data.method = info[1]
      data.path = info[2]
      data.line = info[3]
      data.position = info[4]
      data.file = self.getFileName(data.path)
      r.push(data)
    )
    r

  ###
    # create random string
    # @param {number} len the length of random
    # @param {object} [opt]
    # @param {boolean} [opt.lower=true] if include lowercase
    # @param {boolean} [opt.upper=true] if include uppercase
    # @param {boolean} [opt.num=true]
    # @param {string} [opt.exclude=[]] the charts that excluded
    # @returns {string}
    ###
  self.random = (len, opt) ->
    text = ''
    chars = []
    len = if parseInt(len) then parseInt(len) else 1
    opt = opt or {}
    lower = opt.lower != false
    upper = opt.upper != false
    num = opt.num != false
    # cover to array if string
    exclude = opt.exclude || []
    exclude = caro.splitStr(exclude, ',')
    if lower
      chars.push 'abcdefghijklmnopqrstuvwxyz'
    if upper
      chars.push 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if num
      chars.push '0123456789'
    chars = chars.join('')
    caro.forEach exclude, (excludeStr) ->
      chars = caro.replaceAll(chars, excludeStr, '')
      return
    i = 0
    while i < len
      text += chars.charAt(Math.floor(Math.random() * chars.length))
      i++
    text

  ###
  # random an integer
  # @param {number} max
  # @param {number} [min=0]
  # @returns {number}
  ###
  self.randomInt = (max, min) ->
    max = parseInt(max) or 0
    min = parseInt(min) or 0
    min = 0 if min > max
    rand = Math.random() * (max - min + 1)
    Math.floor(rand + min)

  ###
  # serialize object-arguments to url
  # @param {string} url
  # @param {object} oArgs the argument you want to cover (e.g. {a:1, b:2})
  # @param {boolean} [coverEmpty=false] if cover when value is empty
  # @returns {*}
  ###
  self.serializeUrl = (url, oArgs, coverEmpty = false) ->
    count = 0
    aArgs = ['?']
    caro.forEach oArgs, (val, key) ->
      if caro.isEmptyVal(val)
        return if !coverEmpty
        val = ''
      aArgs.push '&' if count > 0
      aArgs.push key
      aArgs.push '='
      aArgs.push val
      count++
      return
    url += aArgs.join('')

  return