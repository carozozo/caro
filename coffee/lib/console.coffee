###*
# Console
# @author Caro.Huang
###
do ->
  return if !caro.isNode
  self = caro
  # https://www.npmjs.org/package/colors
  require 'colors'

  combineMsg = (msg, variable) ->
    msg = caro.coverToStr(msg)
    variable = '' if caro.isUndef(variable)
    variable = caro.coverToStr(variable)
    msg += variable
    msg

  doConsole = (args, color) ->
    if caro.getObjLength(args) <= 0
      return console.log()
    msg = args[0]
    variable = args[1]
    msg = combineMsg(msg, variable)
    console.log msg[color]
    return

  ###*
  # print different console.log color in odd/even line
  # @param msg
  # @param [variable]
  ###
  self.log = (msg, variable) ->
    if @isOdd
      doConsole arguments, 'green'
      @isOdd = false
      return
    doConsole arguments, 'cyan'
    @isOdd = true
    return

  ###*
  # print different console.log color in odd/even line
  # @param msg
  # @param [variable]
  ###
  self.log2 = (msg, variable) ->
    if @isOdd
      doConsole arguments, 'blue'
      @isOdd = false
      return
    doConsole arguments, 'yellow'
    @isOdd = true
    return

  ###*
  # print different console.log color in odd/even line
  # @param msg
  # @param [variable]
  ###
  self.log3 = (msg, variable) ->
    if @isOdd
      doConsole arguments, 'magenta'
      @isOdd = false
      return
    doConsole arguments, 'red'
    @isOdd = true
    return

  return