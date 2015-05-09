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
  # @param {object} [opt]
  # @param {boolean} [opt.clone=false] if clone for not replacing original
  # @returns {*}
  ###

  changeStrValByObjKey = (obj, type, keys, opt) ->
    aType = [
      'upper'
      'lower'
      'upperFirst'
    ]
    if !caro.isObj(obj) or aType.indexOf(type) < 0
      return obj
    objRet = obj
    clone = false
    if opt
      clone = opt.clone == true
    if clone
      objRet = caro.cloneObj(obj)
    keys = keys or caro.getKeysInObj(objRet)
    keys = caro.splitStr(keys, ',')
    caro.eachObj keys, (i, key) ->
      if !caro.keysInObj(objRet, key)
        return
      val = objRet[key]
      switch type
        when 'upper'
          objRet[key] = caro.upperStr(val)
        when 'lower'
          objRet[key] = caro.lowerStr(val)
        when 'upperFirst'
          objRet[key] = caro.upperFirst(val)
          return
    objRet

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
  # extend obj similar jQuery.extend
  # @param {object} obj1
  # @param {object} obj2
  # @param {boolean} [deep=true]
  # @returns {*}
  ###

  self.extendObj = (obj1, obj2, deep) ->
    deep = deep != false
    caro.eachObj obj2, (key, val) ->
      if deep
        obj1[key] = caro.cloneObj(val, deep)
        return
      obj1[key] = val
      return
    obj1

  ###*
  # clone obj, will clone all under obj when deep !== false
  # @param {object} obj
  # @param {boolean} [deep=true]
  # @returns {*}
  ###

  self.cloneObj = (obj, deep) ->
    deep = deep != false

    clone = (obj) ->
      if !caro.isObj(obj)
        return obj
      copy = obj.constructor()
      caro.eachObj obj, (key, val) ->
        if deep
          copy[key] = clone(val)
          return
        copy[key] = val
        return
      copy

    clone obj

  ###*
  # copy obj-value by key
  # @param {object} obj
  # @param {string[]|string} keys the element that want to copy by keys
  # @param {object} [opt]
  # @param {boolean} [opt.clone=true] if clone for not replacing original
  # @param {boolean} [opt.keep=true] if keep original element
  # @returns {{}}
  ###

  self.copyByObjKey = (obj, keys, opt) ->
    clone = true
    keep = true
    obj2 = {}
    keys = caro.splitStr(keys, ',')
    if opt
      clone = opt.clone != false
      keep = opt.keep != false
    caro.eachObj keys, (i, key) ->
      if clone
        obj2[key] = caro.cloneObj(obj[key])
      else
        obj2[key] = obj[key]
      if !keep
        delete obj[key]
      return
    obj2

  ###*
  # replace key in object
  # @param {object} obj
  # @param {function({})} cb callback-fn that include key, and return new-key if you want to replace
  # @param {object} [opt]
  # @param {boolean} [opt.clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.replaceObjKey = (obj, cb, opt) ->
    objRet = obj
    clone = false
    if opt
      clone = opt.clone == true
    if clone
      objRet = caro.cloneObj(obj)
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
    oClone = obj
    deep = false
    clone = false

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

    if opt
      deep = opt.deep != false
      clone = opt.clone == true
    if clone
      oClone = caro.cloneObj(obj)
    coverObjVal oClone
    oClone

  ###*
  # @param {object} obj
  # @param {string[]|[]} [keys] the assign-keys
  # @param {object} [opt]
  # @param {boolean} [opt.clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.upperCaseByObjKey = (obj, keys, opt) ->
    changeStrValByObjKey obj, 'upper', keys, opt
    obj

  ###*
  # @param {object} obj
  # @param {string[]|[]} [keys] the assign-keys
  # @param {object} [opt]
  # @param {boolean} [opt.clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.lowerCaseByObjKey = (obj, keys, opt) ->
    changeStrValByObjKey obj, 'lower', keys, opt
    obj

  ###*
  # @param {object} obj
  # @param {string[]|[]} [keys] the assign-keys
  # @param {object} [opt]
  # @param {boolean} [opt.clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.upperFirstByObjKey = (obj, keys, opt) ->
    changeStrValByObjKey obj, 'upperFirst', keys, opt
    obj

  ###*
  # @param {object} obj
  # @param {object} [opt]
  # @param {boolean} [opt.deep=true] if deep-replace when element is obj
  # @param {boolean} [opt.clone=false] if clone for not replacing original
  # @returns {*}
  ###

  self.trimObjVal = (obj, opt) ->
    deep = true
    clone = false
    objRet = obj
    if opt
      deep = opt.deep != false
      clone = opt.clone == true
    if clone
      objRet = caro.cloneObj(obj)
    caro.eachObj objRet, (key, val) ->
      if caro.isObj(val) and deep
        objRet[key] = caro.trimObjVal(val, opt)
      if caro.isStr(val)
        objRet[key] = val.trim()
      return
    objRet

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
    if !caro.isObj(obj)
      return arr
    levelCount = 0

    getKey = (obj) ->
      levelCount++
      caro.eachObj obj, (key, val) ->
        if levelLimit > 0 and levelCount > levelLimit
          return
        arr.push key
        if caro.isObj(val)
          getKey val
        return
      levelCount--
      return

    obj = obj or {}
    levelLimit = if caro.coverToInt(levelLimit) > -1 then levelLimit else 1
    getKey obj
    arr

  ###*
  # @param {object} obj
  # @param {object} [opt]
  # @param {boolean} [opt.replaceWrap=true] if replace \r\n
  ###

  self.coverFnToStrInObj = (obj, opt) ->
    replaceWrap = true
    if opt
      replaceWrap = opt.replaceWrap != false
    caro.eachObj obj, (key, val) ->
      if caro.isObj(val)
        caro.coverFnToStrInObj val
        return
      if caro.isFn(val)
        fnStr = val.toString()
        if replaceWrap
          fnStr = caro.replaceAll(fnStr, '\r', '')
          fnStr = caro.replaceAll(fnStr, '\n', '')
        obj[key] = fnStr
      return
    obj

  return