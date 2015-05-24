###*
# Helper
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # cover to array
  # @param arg
  # @returns {*}
  ###
  self.toArray = (arg) ->
    return arg if caro.isArray(arg)
    Array(arg)

  ###*
  # cover to string
  # @param arg
  # @returns {*}
  ###
  self.toString = (arg) ->
    String(arg)

  ###*
  # cover to integer
  # @param arg
  # @param {boolean} [force=true] if return 0 when it's NaN
  # @returns {*}
  ###
  self.toInteger = (arg, force = true) ->
    int = parseInt(arg)
    return arg if !force
    int or 0

  ###*
  # cover to number
  # @param arg
  # @param {boolean} [force=true] if return 0 when it's NaN
  # @returns {*}
  ###
  self.toNumber = (arg, force = true) ->
    num = parseFloat(arg)
    return arg if !force
    num or 0

  ###*
  # cover to fixed-number
  # @param arg
  # @param {boolean} [force=true] if return 0 when it's NaN
  # @returns {*}
  ###
  self.toFixedNumber = (arg, dec, force = true) ->
    dec = dec || 0;
    r = caro.toString(arg);
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
  self.toObject = (arg, force = true) ->
    return arg if caro.isObject(arg)
    if caro.isArray(arg)
      r = {}
      caro.forEach(arg, (val, i) ->
        r[i] = val
      )
      return r
    try
      r = JSON.parse(arg)
      return r if caro.isObject(r)
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
  self.toJson = (arg, opt) ->
    json = ''
    opt = caro.toObject(opt)
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