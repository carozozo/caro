###*
# Loop
# @author Caro.Huang
###

do ->
  self = caro

  ###*
  # for-loop the arg and callback of key/value
  # @param {*} arg
  # @param {function} cb callback-function for each key & value
  ###
  self.each = (arg, cb) ->
    isArr = Array.isArray(arg)
    for key, val of arg
      key = parseInt(key) if isArr
      if cb and cb(key, val) == false
        break
    return

  ###*
   # for-loop the arg and callback of int-key/value
   # @param arg
   # @param {function} cb callback-function for each key & value
   ###
  self.eachArgs = (arg, cb) ->
    for i of arg
      i = parseInt(i)
      if cb and cb(i, arg[i]) == false
        break
    return

  return