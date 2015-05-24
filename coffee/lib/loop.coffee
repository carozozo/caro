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
    if start < end
      realStart = start
      realEnd = end
      step2 = step
    else
      realStart = end
      realEnd = start
      step2 = -step
    while realStart <= realEnd
      break if fn(start) == false
      start += step2
      realStart += step
    return

  return