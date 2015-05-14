###*
# Object
# @author Caro.Huang
###

do ->
  self = caro

  ###*
  # change obj string-value by key, will change-all if aKey is empty
  # support-type: upper/lower/upperFirst
  # @param {object} obj
  # @param {string} type=upper|lower|upperFirst support-type
  # @param {string[]|[]} [keys] the assign-keys
  # @param {boolean} [clone=false] if clone for not replacing original
  # @returns {*}
  ###

  changeStrValByObjKey = (obj, type, keys, clone = false) ->
    aType = [
      'upper'
      'lower'
      'upperFirst'
    ]
    if !caro.isObj(obj) or aType.indexOf(type) < 0
      return obj
    r = if clone then caro.cloneObj(obj) else obj
    keys = keys or caro.getKeysInObj(r)
    keys = caro.splitStr(keys, ',')
    caro.eachObj keys, (i, key) ->
      if !caro.keysInObj(r, key)
        return
      val = r[key]
      opt =
        force: false
      switch type
        when 'upper'
          r[key] = caro.upperStr(val, opt)
        when 'lower'
          r[key] = caro.lowerStr(val, opt)
        when 'upperFirst'
          r[key] = caro.upperFirst(val, opt)
      return
    r

  isObjOrArr = (arg) ->
    caro.isArr(arg) || caro.isObj(arg)

  pushValToObjOrArr = (arg, key, val) ->
    if caro.isArr(arg)
      arg.push(val)
    else if caro.isObj(arg)
      arg[key] = val
    return

  ###*
  # like jQuery.each function
  # @param {object} obj
  # @param {function} cb callback-fn for each key & val
  ###

  self.eachObj = (obj, cb) ->
    isArr = Array.isArray obj
    for key, val of obj
      if isArr
        key = parseInt key
      if cb and cb(key, val) == false
        break
    return

  ###*
  # @param {object} obj
  # @returns {Number}
  ###

  self.getObjLength = (obj) ->
    Object.keys(obj).length

  ###*
  # clone obj
  # @param {object} obj
  # @param {boolean} [deep=false] if clone all under obj
  # @returns {*}
  ###

  self.cloneObj = (obj) ->
    clone = (obj) ->
      return obj if !caro.isObjOrArr(obj)
      r = obj.constructor()
      caro.eachObj obj, (key, val) ->
        val = clone(val)
        r[key] = val
      r
    clone obj

  ###*
  # extend obj similar jQuery.extend
  # @param {object} obj1
  # @param {object} obj2
  # @param {boolean} [deep=false] if clone all under obj
  # @returns {*}
  ###

  self.extendObj = (obj1, obj2, deep = false) ->
    return obj1 if !caro.isObjOrArr(obj1) or !caro.isObjOrArr(obj2)
    r = if caro.isObj(obj1) then {} else []
    if deep
      r = caro.cloneObj(obj1)
    else
      caro.eachObj(obj1, (key, val) ->
        pushValToObjOrArr(r, key, val)
      )
    caro.eachObj obj2, (key, val) ->
      val = caro.cloneObj(val) if deep
      pushValToObjOrArr(r, key, val)
      return
    r

  ###*
  # replace key in object
  # @param {object} obj
  # @param {function({})} cb callback-fn that include key, and return new-key if you want to replace
  # @param {boolean} [clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.replaceObjKey = (obj, cb, clone = false) ->
    objRet = obj
    objRet = caro.cloneObj(obj) if clone
    caro.eachObj objRet, (key, val) ->
      newKey = caro.executeIfFn(cb, key)
      if newKey
        objRet[newKey] = val
        delete objRet[key]
      return
    objRet

  ###*
  # @param {object} obj
  # @param {function({})} cb callback-fn that include value, and return new-value if you want to replace
  # @param {object} [opt]
  # @param {boolean} [opt.deep=false] if deep-replace when element is obj
  # @param {boolean} [opt.clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.replaceObjVal = (obj, cb, opt) ->
    opt = caro.coverToObj(opt)
    deep = opt.deep == true
    clone = opt.clone == true
    coverObjVal = (o) ->
      caro.eachObj o, (key, val) ->
        if caro.isObj(val) and deep
          coverObjVal val
          return
        newVal = caro.executeIfFn(cb, val)
        if newVal != undefined
          o[key] = newVal
        return
      return

    oClone = if clone then caro.cloneObj(obj) else obj
    coverObjVal oClone
    oClone

  ###*
  # @param {object} obj
  # @param {string[]|[]} [keys] the assign-keys
  # @param {boolean} [clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.upperCaseByObjKey = (obj, keys, clone) ->
    changeStrValByObjKey obj, 'upper', keys, clone

  ###*
  # @param {object} obj
  # @param {string[]|[]} [keys] the assign-keys
  # @param {boolean} [clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.lowerCaseByObjKey = (obj, keys, clone) ->
    changeStrValByObjKey obj, 'lower', keys, clone

  ###*
  # @param {object} obj
  # @param {string[]|[]} [keys] the assign-keys
  # @param {boolean} [clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.upperFirstByObjKey = (obj, keys, clone) ->
    changeStrValByObjKey obj, 'upperFirst', keys, clone

  ###*
  # @param {object} obj
  # @param {object} [opt]
  # @param {boolean} [opt.deep=true] if deep-replace when element is obj
  # @param {boolean} [opt.clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.trimObjVal = (obj, opt) ->
    opt = caro.coverToObj(opt)
    deep = opt.deep != false
    clone = opt.clone == true
    r = if clone then  caro.cloneObj(obj) else obj
    caro.eachObj r, (key, val) ->
      if caro.isObjOrArr(val) and deep
        r[key] = caro.trimObjVal(val, opt)
      else if caro.isStr(val)
        r[key] = val.trim()
      return
    r

  ###*
  # check if key exists in obj, will return false when key not exist,no matter that other-keys are
  # @param {object} obj
  # @param {string[]|string} keys the keys that want to validate
  # @returns {boolean}
  ###

  self.keysInObj = (obj, keys) ->
    if !caro.isObj(obj)
      return false
    pass = true
    keys = caro.splitStr(keys, ',')
    caro.eachObj keys, (i, key) ->
      if !obj.hasOwnProperty(key)
        pass = false
        return false
      true
    pass

  ###*
  # get keys in obj, and get all if levelLimit = 0
  # @param {object} obj
  # @param {number} [levelLimit=1] the level of obj you want to get keys
  # @returns {Array}
  ###

  self.getKeysInObj = (obj, levelLimit) ->
    arr = []
    return arr if !caro.isObj(obj)
    levelLimit = if caro.coverToInt(levelLimit, false) > -1 then levelLimit else 1
    levelCount = 0
    getKey = (obj) ->
      levelCount++
      caro.eachObj obj, (key, val) ->
        return if levelLimit > 0 and levelCount > levelLimit
        arr.push key
        if caro.isObj(val)
          getKey val
        return
      levelCount--
      return
    getKey obj
    arr

  ###*
  # @param {object} obj
  # @param {boolean} [replaceWrap=true] if replace \r\n
  ###

  self.coverFnToStrInObj = (obj, replaceWrap = true) ->
    caro.eachObj obj, (key, val) ->
      if caro.isObjOrArr(val)
        caro.coverFnToStrInObj(val)
      else if caro.isFn(val)
        fnStr = val.toString()
        if replaceWrap
          fnStr = fnStr.replace(/([\r]\s*|[\n]\s*)/g,'');
        else
          fnStr = fnStr.replace(/[\r]\s*/g,'\r ');
          fnStr = fnStr.replace(/[\n]\s*/g,'\n ');
        obj[key] = fnStr
      return
    obj

  return