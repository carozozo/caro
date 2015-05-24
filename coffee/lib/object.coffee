###*
# Object
# @author Caro.Huang
###
do ->
  self = caro

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
    caro.forEach keys, (key) ->
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
      caro.forEach obj, (val, key) ->
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
    caro.forEach r, (val, key) ->
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
    caro.forEach obj, (val) ->
      r.push val
      return
    r

  return