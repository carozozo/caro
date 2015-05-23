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
      if caro.isNumber(val)
        sum += val
      if force
        sum += parseFloat(val) or 0
      return
    sum

  ###*
  # push value into array if not exists
  # @param {[]} arr
  # @param {...*} value
  # @returns {array}
  ###
  self.pushNoDup = (arr, val) ->
    caro.eachArgs arguments, (i, val) ->
      return if i == 0 or arr.indexOf(val) > -1
      arr.push val
      return
    arr

  ###*
  # will not push to array if value is empty
  # @param {[]} arr
  # @param {...*} value
  # @returns {array}
  ###
  self.pushNoEmpty = (arr, val) ->
    caro.eachArgs arguments, (i, arg) ->
      if i == 0 or caro.isEmptyVal(arg)
        return
      arr.push arg
      return
    arr

  ###*
  # check if empty-value in array
  # @param {...[]} arr
  # @returns {boolean}
  ###
  self.hasEmptyInArr = (arr) ->
    hasEmpty = false
    checkVal = (arr) ->
      caro.each arr, (i, val) ->
        if caro.isEmptyVal(val)
          hasEmpty = true
          return false
        return
      return
    caro.each arguments, (i, arr) ->
      return false if hasEmpty
      checkVal arr
      return
    hasEmpty

  ###*
  # remove empty-value in array
  # @param {[]} arr
  # @returns {array}
  ###
  self.removeEmptyInArr = (arr) ->
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
  self.basicArr = (arr) ->
    r = []
    caro.each arr, (i, val) ->
      r.push(val) if caro.isBasicVal(val)
      return
    arr = r

  return