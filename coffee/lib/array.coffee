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
  # @param {boolean} [clone=false] if clone for not change original-array
  # @returns {*}
  ###
  self.sortArr = (arr, sort = true, clone = false) ->
    return arr if !caro.isArr(arr)
    r = if clone == false then arr else caro.cloneObj(arr);
    r.sort (a, b) ->
      if sort
        return if a < b then -1 else if a > b then 1 else 0
      if a > b then -1 else if a < b then 1 else 0
    r

  ###*
  # sort array by key if value is object
  # @param {[]} arr
  # @param {string} key
  # @param {boolean} [sort=true] if sort by ASC
  # @param {boolean} [clone=false] if clone for not change original-array
  # @returns {*}
  ###
  self.sortByObjKey = (arr, key, sort = true, clone = false) ->
    return arr if !caro.isArr(arr)
    r = if clone == false then arr else caro.cloneObj(arr);
    r.sort (a, b) ->
      order1 = a[key] or 0
      order2 = b[key] or 0
      if sort
        return if order1 < order2 then -1 else if order1 > order2 then 1 else 0
      if order1 > order2 then -1 else if order1 < order2 then 1 else 0
    r

  ###*
  # get sum of value in array
  # @param {[]} arr
  # @param {boolean} [force=false]
  # @returns {number}
  ###
  self.sumOfArr = (arr, force = false) ->
    sum = 0
    return sum if !caro.isArr(arr)
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
    return arr if !caro.isArr(arr)
    r = []
    aRemoveIndex = []
    checkIndexIfNeedRemove = (i) ->
      needRemove = false
      caro.each aRemoveIndex, (j, removeIndex) ->
        if i == removeIndex
          needRemove = true
          return false
      needRemove
    # collect the index that want to remove
    caro.eachArgs arguments, (i, arg) ->
      return if i == 0
      arg = parseInt(arg)
      aRemoveIndex.push arg
      return
    caro.each arr, (i, val) ->
      if !checkIndexIfNeedRemove(i)
        r.push val
      return
    arr = r
    r

  ###*
  # remove the item from array by value
  # @param {[]} arr
  # @param {...*} value
  # @returns {*}
  ###
  self.removeByArrVal = (arr, val) ->
    return arr if !caro.isArr(arr)
    r = []
    aRemoveVal = []
    checkValIfNeedRemove = (val) ->
      needRemove = false
      caro.each aRemoveVal, (j, removeIndex) ->
        if val == removeIndex
          needRemove = true
        return
      needRemove
    # collect the index that want to remove
    caro.eachArgs arguments, (i, arg) ->
      return if i == 0
      aRemoveVal.push arg
      return
    caro.each arr, (i, val) ->
      if !checkValIfNeedRemove(val)
        r.push val
      return
    arr = r
    r

  ###*
  # remove duplicate-value in array
  # @param {[]} arr
  # @returns {*}
  ###
  self.removeDup = (arr) ->
    return arr if !caro.isArr(arr)
    r = []
    caro.each arr, (i, val) ->
      r.push val if r.indexOf(val) < 0
      return
    arr = r
    arr

  ###*
  # push value into array if not exists
  # @param {[]} arr
  # @param {...*} value
  # @returns {*}
  ###
  self.pushNoDup = (arr, val) ->
    return arr if !caro.isArr(arr)
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
    return arr if !caro.isArr(arr)
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
      if !caro.isArr(arr)
        hasEmpty = true
        return
      caro.each arr, (i, val) ->
        if caro.isEmptyVal(val)
          hasEmpty = true
          return false
        true
      return
    caro.eachArgs arguments, (i, arr) ->
      return false if hasEmpty
      checkVal arr
      true
    hasEmpty

  return