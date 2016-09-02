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
    compareFn = (a,b) -> a <= b
    if start > end
      compareFn = (a,b) -> a >= b
      step = -step
    while compareFn(start, end)
      break if fn(start) == false
      start += step
    return

  return