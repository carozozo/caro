###*
# Loop
# @author Caro.Huang
###

do ->
  self = caro

  ###*
  # for-loop the arg and callback of key/val
  # @param {*} arg
  # @param {function} cb callback-fn for each key & val
  ###
  self.each = (arg, cb) ->
    for key, val of arg
      if cb and cb(key, val) == false
        break
    return

  ###*
   # for-loop the arg and callback of int-key/val
   # @param arg
   # @param {function} cb callback-fn for each key & val
   ###
  self.eachArgs = (arg, cb) ->
    for i of arg
      i = parseInt(i)
      if cb and cb(i, arg[i]) == false
        break
    return

  return