###
# Loop
# @author Caro.Huang
###
do ->
  self = caro

  ###
  # for-loop function
  # @param {function} fn for-loop function, will break-loop when return false
  # @param {number} start
  # @param {number} end
  # @param {number} step add the step in each function-called
  ###
  self.loop = (fn, start = 0, end = 0, step = 1) ->
    step = -step if start > end
    for i in [start .. end] by step
      res = fn(i)
      break if res is false
      continue if res is true
    return

  return