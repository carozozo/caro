###*
# Object
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # show object/array by string
  # @param {object} obj
  ###
  self.toWord = (arg) ->
    toWord = (arg, spaceLength) ->
      spaceLength = spaceLength or 0
      ret = ''
      spaceLength += 2
      space = ''
      space2 = '    '
      caro.loop(()->
        space += ' '
        space2 += ' '
      , 1, spaceLength)
      try
        ret = JSON.stringify(arg, (key, val)->
          return val if !key
          return toWord(val, spaceLength)
        , 2)
        ret = ret.replace(/\\r\\n/g, '\r\n  ');
        ret = ret.replace(/\\r/g, '\r  ');
        ret = ret.replace(/\\n/g, '\n  ');
        ret = ret.replace(/"/g, '');
      return ret if ret
      try
        ret = arg.toString()
        reg = new RegExp('\r\n' + space2, 'g')
        ret = ret.replace(reg, '\r\n')
        reg = new RegExp('\r' + space2, 'g')
        ret = ret.replace(reg, '\r')
        reg = new RegExp('\n' + space2, 'g')
        ret = ret.replace(reg, '\n')
        ret = ret.replace(/"/g, '');
      return ret
    return toWord(arg, 0)

  return