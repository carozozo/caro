###*
# Object
# @author Caro.Huang
###
do ->
  self = caro

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