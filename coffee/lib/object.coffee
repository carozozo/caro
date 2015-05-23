###*
# Object
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # change object string-value by key, will change-all if aKey is empty
  # support-type: upper/lower/upperFirst
  # @param {object} obj
  # @param {string} type=upper|lower|upperFirst support-type
  # @param {string[]|string} [keys] the assign-keys
  # @returns {*}
  ###
  changeStrValByObjKey = (obj, type, keys) ->
    aType = [
      'upper'
      'lower'
      'upperFirst'
      'trim'
    ]
    r = obj
    return obj if !caro.isObject(obj) or aType.indexOf(type) < 0
    keys = keys or caro.getKeysInObj(r)
    keys = caro.splitStr(keys, ',')
    caro.each keys, (i, key) ->
      return if !caro.keysInObj(r, key)
      val = r[key]
      return if !caro.isString(val)
      opt =
        force: false
      switch type
        when 'upper'
          r[key] = caro.upperStr(val, opt)
        when 'lower'
          r[key] = caro.lowerStr(val, opt)
        when 'upperFirst'
          r[key] = caro.upperFirst(val, false)
        when 'trim'
          r[key] = caro.trimStr(val, false)
      return
    r

  pushValToObjOrArr = (arg, key, val) ->
    if caro.isArray(arg)
      arg.push(val)
    else if caro.isObject(arg)
      arg[key] = val
    return

  ###*
  # get object-length
  # @param {object} obj
  # @returns {Number}
  ###
  self.getObjLength = (obj) ->
    Object.keys(obj).length

  ###*
  # extend object, similar jQuery.extend
  # @param {boolean} [deep=false] extend-recursive
  # @param {object...|array...} arg
  # @returns {*}
  ###
  self.extendObj = (deep = false, arg) ->
    r = null
    if !caro.isBoolean(deep)
      r = deep
      deep = false
    caro.eachArgs arguments, (key, arg) ->
      if !r and caro.isObject(arg)
        r = arg
        return true
      for key, val of arg
        if caro.isObject(val) and caro.keysInObj(r, key) and !deep
          continue
        pushValToObjOrArr(r, key, val)
    r

  ###*
  # clone object
  # @param {object} obj
  # @param {boolean} [deep=false] if clone all under object
  # @returns {*}
  ###
  self.cloneObj = (arg, deep = false) ->
    return arg if !caro.isObject(arg)
    r = if caro.isArray(arg) then [] else {}
    caro.extendObj(r, arg)
    if(deep)
      caro.each(r, (key, val) ->
        r[key] = caro.cloneObj(val)
      )
    r

  ###*
  # replace key in object
  # @param {object} obj
  # @param {function({})} cb callback-function that include key, and return new-key if you want to replace
  # @returns {*}
  ###
  self.replaceObjKey = (obj, cb) ->
    r = obj
    caro.each r, (key, val) ->
      newKey = caro.executeIfFn(cb, key)
      if newKey
        r[newKey] = val
        delete r[key]
      return
    r

  ###*
  # replace value in object
  # @param {object} obj
  # @param {function({})} cb callback-function that include value, and return new-value if you want to replace
  # @param {boolean} [deep=false] if deep-replace when element is object
  # @returns {*}
  ###
  self.replaceObjVal = (obj, cb, deep = false) ->
    r = obj
    coverObjVal = (o) ->
      caro.each o, (key, val) ->
        if caro.isObject(val) and deep
          coverObjVal val
          return
        newVal = caro.executeIfFn(cb, val)
        if newVal != undefined
          o[key] = newVal
        return
      return
    coverObjVal r
    r

  ###*
  # upper-case value in object by key, will replace-all if key is empty
  # @param {object} obj
  # @param {string[]|string} [keys] the assign-keys
  # @returns {*}
  ###
  self.upperCaseByObjKey = (obj, keys) ->
    changeStrValByObjKey obj, 'upper', keys

  ###*
  # lower-case value in object by key, will replace-all if key is empty
  # @param {object} obj
  # @param {string[]|string} [keys] the assign-keys
  # @returns {*}
  ###
  self.lowerCaseByObjKey = (obj, keys) ->
    changeStrValByObjKey obj, 'lower', keys

  ###*
  # upper-case the first char of value in object by key, will replace-all if key is empty
  # @param {object} obj
  # @param {string[]|string} [keys] the assign-keys
  # @returns {*}
  ###
  self.upperFirstByObjKey = (obj, keys) ->
    changeStrValByObjKey obj, 'upperFirst', keys

  ###*
  # trim value in object by key, will replace-all if key is empty
  # @param {object} obj
  # @param {string[]|string} [keys] the assign-keys
  # @returns {*}
  ###
  self.trimByObjKey = (obj, keys) ->
    changeStrValByObjKey obj, 'trim', keys

  ###*
  # check if key exists in object, will return false when key not exist, no matter that other-keys are
  # @param {object} obj
  # @param {string[]|string} keys the keys that want to validate
  # @returns {boolean}
  ###
  self.keysInObj = (obj, keys) ->
    return false if !caro.isObject(obj)
    pass = true
    keys = caro.splitStr(keys, ',')
    caro.each keys, (i, key) ->
      if !obj.hasOwnProperty(key)
        pass = false
        return false
      return
    pass

  ###*
  # get keys in object, and get all if levelLimit = 0
  # @param {object} obj
  # @param {number} [levelLimit=1] the level of object you want to get keys
  # @returns {Array}
  ###
  self.getKeysInObj = (obj, levelLimit) ->
    r = []
    return r if !caro.isObject(obj)
    levelLimit = if caro.coverToInt(levelLimit, false) > -1 then levelLimit else 1
    levelCount = 0
    getKey = (obj) ->
      levelCount++
      caro.each obj, (key, val) ->
        return if levelLimit > 0 and levelCount > levelLimit
        r.push key
        if caro.isObject(val)
          getKey val
        return
      levelCount--
      return
    getKey obj
    r

  ###*
  # covert to string if element is function in object
  # @param {object} obj
  # @param {boolean} [replaceWrap=true] if replace \r\n
  ###
  self.coverFnToStrInObj = (obj, replaceWrap = true) ->
    r = obj
    caro.each r, (key, val) ->
      if caro.isPlainObject(val)
        caro.coverFnToStrInObj(val)
      else if caro.isFunction(val)
        fnStr = val.toString()
        if replaceWrap
          fnStr = fnStr.replace(/([\r]\s*|[\n]\s*)/g, '');
        else
          fnStr = fnStr.replace(/[\r]\s*/g, '\r ');
          fnStr = fnStr.replace(/[\n]\s*/g, '\n ');
        r[key] = fnStr
      return
    r

  ###*
  # cover object to array
  # @param {...object} obj
  # @returns {Array}
  ###
  self.objToArr = (obj) ->
    r = []
    caro.each obj, (i, val) ->
      r.push val
      return
    r

  return