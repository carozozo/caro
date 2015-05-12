###*
# Helper
# @namespace caro
# @author Caro.Huang
###

do ->
  'use strict'
  self = caro

  ###*
  # check if arg is bool | str | num
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isBasicVal = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
# return false if arg is not bool | str | num
      !(!caro.isBool(arg) and !caro.isStr(arg) and !caro.isNum(arg))

  ###*
  # check if value is empty ( {} | [] | null | '' | undefined )
  # @param {...} arg
  # @returns {boolean}
  ###

  self.isEmptyVal = (arg) ->
    caro.checkIfPassCb arguments, (arg) ->
      if caro.isObj(arg)
        return caro.getObjLength(arg) < 1
      if caro.isArr(arg)
        return arg.length < 1
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
  # check all argument in arr by check-function, get false if check-function return false
  # @param {[]} arr
  # @param {function} checkFn
  # @param {boolean} [needAllPass=true] when returnIfAllPass=true, return true when all check-result are true
  # @returns {boolean}
  ###

  self.checkIfPassCb = (arr, checkFn, needAllPass = true) ->
    if !Array.isArray(arr) and typeof arr != 'object' or arr == null or !caro.isFn(checkFn)
      return false
    caro.eachObj arr, (i, arg) ->
      result = caro.executeIfFn(checkFn, arg)
      # need all pass, but result is false || no-need all pass, and result is true
      if needAllPass and result == false or !needAllPass and result == true
        needAllPass = !needAllPass
        return false
      true
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
  # like caor.eachObj, but key is integer
  # @param args should be arguments (obj with numeric-key)
  # @param cb
  ###

  self.eachArgs = (args, cb) ->
    for i of args
      if args.hasOwnProperty(i)
        i = parseInt(i)
        if cb and cb(i, args[i]) == false
          break
    return

  ###*
  # get arguments, and return as arr
  # @param args should be arguments (obj with numeric-key)
  # @returns {Array}
  ###

  self.getArgumentsAsArr = (args) ->
    r = []
    caro.eachObj args, (i, val) ->
      r.push val
      return
    r

  ###*
  # cover to arr
  # @param arg
  # @returns {*}
  ###

  self.coverToArr = (arg) ->
    if caro.isArr(arg)
      return arg
    [arg]

  ###*
  # cover to str, will return '' if force!=false
  # @param arg
  # @param {boolean} [force=true] if return str
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
# cover fn to str first, and not replace \r\n
        caro.coverFnToStrInObj arg, false
        # after cover to json, replace \\r\\n to wrap
        arg = caro.coverToJson(arg)
        arg = caro.replaceAll(arg, '\\r', '\r')
        arg = caro.replaceAll(arg, '\\n', '\n')
        return arg
      return ''
    if caro.isFn(arg.toString)
      return arg.toString()
    if force
      return ''
    arg

  ###*
  # cover to int, will return 0 if force!=false
  # @param arg
  # @param {boolean} [force=true] if return int
  # @returns {*}
  ###

  self.coverToInt = (arg, force = true) ->
    int = parseInt(arg)
    if caro.isEmptyVal(int) and !force
      return arg
    int = int or 0
    int

  ###*
  # cover to num,, will return 0 if force not false
  # @param arg
  # @param {boolean} [force=true]  if return num
  # @returns {*}
  ###

  self.coverToNum = (arg, force = true) ->
    int = parseFloat(arg)
    if caro.isEmptyVal(int) and !force
      return arg
    int = int or 0
    int

  ###*
  # cover to obj, will return {} if force!=false
  # @param arg
  # @param {boolean} [force=true] if return object
  # @returns {*}
  ###

  self.coverToObj = (arg, force = true) ->
    if caro.isObj(arg)
      return arg
    if caro.isArr(arg)
      r = {}
      caro.eachObj(arg, (i, val) ->
        r[i] = val
      )
      return r
    # 未來可以新增 TypeCheck.isObjJson
    if  caro.nValidator? and caro.nValidator.isJSON(arg)
      r = JSON.parse(arg)
      return r if caro.isObj(r)
    if force
      return {}
    arg

  ###*
  # @param arg
  # @param {object} [opt]
  # @param {boolean} [opt.force=true] if force cover to JSON
  # @param {function=null} [opt.replacer] the replace-function in each element
  # @param {space=4} [opt.space] the space for easy-reading after cover to JSON
  # @returns {*}
  ###

  self.coverToJson = (arg, opt) ->
    force = true
    replacer = null
    space = 4
    json = ''
    if opt
      force = opt.force != false
      replacer = opt.replacer or replacer
      space = if opt.space != undefined then opt.space else space
    if space
      json = JSON.stringify(arg, replacer, space)
    else
      json = JSON.stringify(arg, replacer)
    if caro.nValidator? and caro.nValidator.isJSON(json) or !force
      return json
    ''

  return