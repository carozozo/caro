###*
# Array
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # sort array
  # @param {[]} arr
  # @param {boolean} [sort=true] if sort by ASC
  # @returns {*}
  ###
  self.sortArr = (arr, sort = true) ->
    arr.sort (a, b) ->
      if sort
        return if a < b then -1 else if a > b then 1 else 0
      if a > b then -1 else if a < b then 1 else 0
    arr

  ###*
  # sort array by key if value is object
  # @param {[]} arr
  # @param {string} key
  # @param {boolean} [sort=true] if sort by ASC
  # @returns {*}
  ###
  self.sortByObjKey = (arr, key, sort = true) ->
    arr.sort (a, b) ->
      order1 = a[key] or 0
      order2 = b[key] or 0
      if sort
        return if order1 < order2 then -1 else if order1 > order2 then 1 else 0
      if order1 > order2 then -1 else if order1 < order2 then 1 else 0
    arr

  ###*
  # get sum of value in array
  # @param {[]} arr
  # @param {boolean} [force=false]
  # @returns {number}
  ###
  self.sumOfArr = (arr, force = false) ->
    sum = 0
    caro.each arr, (i, val) ->
      if caro.isNum(val)
        sum += val
      if force
        sum += parseFloat(val) or 0
      return
    sum

  ###*
  # remove item from array by index
  # @param {[]} arr
  # @param {...number} index
  # @returns {*}
  ###
  self.removeByIndex = (arr, index) ->
    count = 0
    caro.eachArgs(arguments, (i, index)->
      return if i == 0
      index -= count
      arr.splice(index, 1)
      count++
    )
    arr

  ###*
  # remove the item from array by value
  # @param {[]} arr
  # @param {...*} value
  # @returns {*}
  ###
  self.removeByArrVal = (arr, val) ->
    args = caro.objToArr(arguments)
    args.shift()
    r = []
    caro.each arr, (i, val) ->
      r.push val if args.indexOf(val) < 0
      return
    arr = r

  ###*
  # remove duplicate-value in array
  # @param {[]} arr
  # @returns {*}
  ###
  self.removeDup = (arr) ->
    r = []
    caro.each arr, (i, val) ->
      r.push val if r.indexOf(val) < 0
      return
    arr = r

  ###*
  # push value into array if not exists
  # @param {[]} arr
  # @param {...*} value
  # @returns {*}
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
  # @returns {*}
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

  return