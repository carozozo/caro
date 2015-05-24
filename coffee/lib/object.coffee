###*
# Object
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # show object/array by string
  # @param {object} obj
  # @param {boolean} [wrap=false] if display with wrap
  ###
  self.toWord = (obj, wrap = false) ->
    caro.forEach(obj, (val, key) ->
      if caro.isString(val)
        obj[key] = "'" + val + "'"
        return
      if caro.isPlainObject(val) or caro.isArray(val)
        obj[key] = caro.toWord(val)
        return
      obj[key] = caro.toString(val)
    )
    json = caro.toJson(obj)
    json = json.replace(/([\r]\s*|[\n]\s*)/g, '') if !wrap
    return caro.replaceAll(json, '"', '')
  return