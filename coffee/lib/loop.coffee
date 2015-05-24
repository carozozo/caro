###*
# Loop
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # for-loop function
  # @param {function} fn for-loop function, will break-loop when function return false
  # @param {integer} start
  # @param {integer} end
  # @param {integer} step add the step in each function-called
  # @param {end} start
  ###
  self.loop = (fn, start = 0, end = 0, step = 1) ->
    isLow = do -> start < end
    compareFn = caro.lte
    compareFn = if isLow then caro.lte else caro.gte
    while compareFn start, end
      break if fn(start) == false
      start += if isLow then step else -step
    return

  return