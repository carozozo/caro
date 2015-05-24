###*
# Array
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # get sum of value in array
  # @param {[]} arr
  # @param {boolean} [force=false]
  # @returns {number}
  ###
  self.sumOfArr = (arr, force = false) ->
    sum = 0
    caro.each arr, (i, val) ->
      sum += val if caro.isNumber(val)
      sum += parseFloat(val) or 0 if force
      return
    sum

  ###*
  # push value into array if not exists
  # @param {[]} arr
  # @param {...*} value
  # @returns {array}
  ###
  self.pushNoDuplicate = (arr, val) ->
    caro.each arguments, (i, val) ->
      return if i == '0' or arr.indexOf(val) > -1
      arr.push val
      return
    arr

  ###*
  # will not push to array if value is empty
  # @param {[]} arr
  # @param {...*} value
  # @returns {array}
  ###
  self.pushNoEmptyVal = (arr, val) ->
    caro.each arguments, (i, arg) ->
      return if i == '0' or caro.isEmptyVal(arg)
      arr.push arg
      return
    arr

  ###*
  # remove empty-value in array
  # @param {[]} arr
  # @returns {array}
  ###
  self.pullEmptyVal = (arr) ->
    r = []
    caro.each arr, (i, val) ->
      r.push(val) if !caro.isEmptyVal(val)
      return
    arr = r

  ###*
  # only keep basic-value in array
  # @param {[]} arr
  # @returns {array}
  ###
  self.pullUnBasicVal = (arr) ->
    r = []
    caro.each arr, (i, val) ->
      r.push(val) if caro.isBasicVal(val)
      return
    arr = r

  return