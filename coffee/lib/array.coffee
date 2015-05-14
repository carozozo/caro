###*
# Array
# @namespace caro
# @author Caro.Huang
###

do ->
  'use strict'
  self = caro

  ###*
  # sort arr by key if value is obj
  # @param {[]} arr
  # @param {string} key
  # @param {boolean} [sort=true]
  # @returns {*}
  ###

  self.sortByObjKey = (arr, key, sort = true) ->
    if !caro.isArr(arr)
      return arr
    arr = caro.cloneObj(arr)
    arr.sort (a, b) ->
      order1 = a[key] or 0
      order2 = b[key] or 0
      if sort
        return if order1 < order2 then -1 else if order1 > order2 then 1 else 0
      if order1 > order2 then -1 else if order1 < order2 then 1 else 0
    arr

  ###*
  # get sum of val in arr
  # @param {[]} arr
  # @param {boolean} [force=false]
  # @returns {number}
  ###

  self.sumOfArr = (arr, force = false) ->
    sum = 0
    if !caro.isArr(arr)
      return 0
    caro.eachObj arr, (i, val) ->
      if caro.isNum(val)
        sum += val
      if force
        sum += parseFloat(val) or 0
      return
    sum

  ###*
  # remove item from arr by index
  # @param {[]} arr
  # @param {...number} index
  # @returns {*}
  ###

  self.removeByIndex = (arr, index) ->
    if !caro.isArr(arr)
      return arr
    r = []
    aRemoveIndex = []

    checkIndexIfNeedRemove = (i) ->
      needRemove = false
      caro.eachObj aRemoveIndex, (j, removeIndex) ->
        if i == removeIndex
          needRemove = true
          return false
      needRemove

    # collect the index that want to remove
    caro.eachArgs arguments, (i, arg) ->
      if i == 0
        return
      arg = parseInt(arg)
      aRemoveIndex.push arg
      return
    caro.eachObj arr, (i, val) ->
      if !checkIndexIfNeedRemove(i)
        r.push val
      return
    r

  ###*
  # remove the item from arr by val
  # @param {[]} arr
  # @param {...*} val
  # @returns {*}
  ###

  self.removeByArrVal = (arr, val) ->
    if !caro.isArr(arr)
      return arr
    r = []
    aRemoveVal = []

    checkValIfNeedRemove = (val) ->
      needRemove = false
      caro.eachObj aRemoveVal, (j, removeIndex) ->
        if val == removeIndex
          needRemove = true
        return
      needRemove

    # collect the index that want to remove
    caro.eachArgs arguments, (i, arg) ->
      if i == 0
        return
      aRemoveVal.push arg
      return
    caro.eachObj arr, (i, val) ->
      if !checkValIfNeedRemove(val)
        r.push val
      return
    r

  ###*
  # remove duplicate-val in arr
  # @param {[]} arr
  # @returns {*}
  ###

  self.removeDup = (arr) ->
    if !caro.isArr(arr)
      return arr
    r = []
    caro.eachObj arr, (i, val) ->
      if r.indexOf(val) < 0
        r.push val
      return
    r

  ###*
  # push val into arr if not exists
  # @param {[]} arr
  # @param {...*} val
  # @returns {*}
  ###

  self.pushNoDup = (arr, val) ->
    if !caro.isArr(arr)
      return arr
    r = caro.cloneObj(arr)
    caro.eachArgs arguments, (i, val) ->
      if i == 0 or arr.indexOf(val) > -1
        return
      r.push val
      return
    r

  ###*
  # will not push to arr if value is empty
  # @param {[]} arr
  # @param {...*} val
  # @returns {*}
  ###

  self.pushNoEmpty = (arr, val) ->
    if !caro.isArr(arr)
      return arr
    r = caro.cloneObj(arr)
    aValNeedPush = []
    caro.eachArgs arguments, (i, arg) ->
      if i == 0 or caro.isEmptyVal(arg)
        return
      aValNeedPush.push arg
      return
    caro.eachObj aValNeedPush, (i, valNeedPush) ->
      r.push valNeedPush
      return
    r

  ###*
  # check if empty-value in arr
  # @param {...[]} arr
  # @returns {boolean}
  ###

  self.hasEmptyInArr = (arr) ->
    hasEmpty = false

    checkVal = (arr) ->
      if !caro.isArr(arr)
        hasEmpty = true
        return
      caro.eachObj arr, (i, val) ->
        if caro.isEmptyVal(val)
          hasEmpty = true
          return false
        true
      return

    caro.eachArgs arguments, (i, arr) ->
      if hasEmpty
        return false
      checkVal arr
      true
    hasEmpty

  return