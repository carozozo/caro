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
  self.pushNoDuplicate = (arr) ->
    for val, i in arguments
      continue if i is 0 or arr.indexOf(val) > -1
      arr.push val
    arr

  ###
  # will not push to array if value is empty
  # @param {[]} arr
  # @param {...*} value
  # @returns {array}
  ###
  self.pushNoEmptyVal = (arr) ->
    for val, i in arguments
      continue if i is 0 or caro.isEmptyVal(val)
      arr.push val
    arr

  ###
  # remove empty-value in array
  # @param {[]} arr
  # @returns {array}
  ###
  self.pullEmptyVal = (arr) ->
    emptyArr = []
    count = 0
    for i in [0 .. arr.length - 1]
      val = arr[count]
      if caro.isEmptyVal(val)
        emptyArr.push(val)
        arr.splice(count, 1)
      else
        count++
    emptyArr

  ###
  # only keep basic-value in array
  # @param {[]} arr
  # @returns {array}
  ###
  self.pullUnBasicVal = (arr) ->
    emptyArr = []
    count = 0
    for i in [0 .. arr.length - 1]
      val = arr[count]
      unless caro.isBasicVal(val)
        emptyArr.push(val)
        arr.splice(count, 1)
      else
        count++
    emptyArr

  ###
  # pick up item from array by random
  # @param {[]} arrf
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
    total = 0
    for val, i in arr
      if typeof val is 'number'
        total += val
      else if force
        total += Number(val)
    total
  return