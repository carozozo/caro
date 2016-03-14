###
# Array
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###
  # remove all items in array
  # @param {[]} arr
  # @returns {array}
  ###
  self.cleanArr = (arr) ->
    arr.splice(0, arr.length)
    arr

  ###
  # push value into array if not exists
  # @param {[]} arr
  # @param {...*} value
  # @returns {array}
  ###
  self.pushNoDuplicate = (arr, val) ->
    args = caro.drop(arguments)
    caro.forEach args, (val) ->
      return if arr.indexOf(val) > -1
      arr.push val
      return
    arr

  ###
  # will not push to array if value is empty
  # @param {[]} arr
  # @param {...*} value
  # @returns {array}
  ###
  self.pushNoEmptyVal = (arr, val) ->
    args = caro.drop(arguments)
    caro.forEach args, (arg) ->
      return if caro.isEmptyVal(arg)
      arr.push arg
      return
    arr

  ###
  # remove empty-value in array
  # @param {[]} arr
  # @returns {array}
  ###
  self.pullEmptyVal = (arr) ->
    caro.remove(arr, (n) ->
      return caro.isEmptyVal(n)
    )

  ###
  # only keep basic-value in array
  # @param {[]} arr
  # @returns {array}
  ###
  self.pullUnBasicVal = (arr) ->
    caro.remove(arr, (n) ->
      return !caro.isBasicVal(n)
    )

  ###
  # pick up item from array by random
  # @param {[]} arr
  # @returns {boolean} [removeFromArr=false]
  ###
  self.randomPick = (arr, removeFromArr = false) ->
    randIndex = caro.randomInt(arr.length - 1)
    return arr[randIndex] unless removeFromArr
    arr.splice(randIndex, 1)[0]

  ###
  # get sum of value in array
  # @param {[]} arr
  # @param {boolean} [force=false] if cover to number when argument is not number
  # @returns {number}
  ###
  self.sumOfArr = (arr, force = false) ->
    caro.reduce(arr, (total, n) ->
      return total if !caro.isNumber(n) and !force
      return (total + Number(n))
    )
  return