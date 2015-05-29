###*
# Object
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # display object/array by string
  # @param {object} obj
  # @param {number} spaceLength the space before each line
  ###
  self.toWord = (arg, spaceLength) ->
    toWord = (arg, spaceLength, layer) ->
      spaceLength = spaceLength or 2
      layer = layer or 0
      fnSpaceLength = layer * 2 + 6
      space = caro.repeat(' ', spaceLength)
      fnSpace = caro.repeat(' ', fnSpaceLength)
      layer++
      try
        ret = JSON.stringify(arg, (key, val)->
          return val if !key
          return toWord(val, spaceLength, layer)
        , spaceLength)
        ret = ret.replace(/\\r\\n/g, '\r\n' + space);
        ret = ret.replace(/\\r/g, '\r' + space);
        ret = ret.replace(/\\n/g, '\n' + space);
        ret = ret.replace(/"/g, '');
      return ret if ret
      try
        ret = arg.toString()
        if caro.isFunction(arg)
          reg = new RegExp('\r\n' + fnSpace, 'g')
          ret = ret.replace(reg, '\r\n')
          reg = new RegExp('\r' + fnSpace, 'g')
          ret = ret.replace(reg, '\r')
          reg = new RegExp('\\n' + fnSpace, 'g')
          ret = ret.replace(reg, '\n')
          ret = ret.replace(/"/g, '');
      return ret
    return toWord(arg, spaceLength)

  return