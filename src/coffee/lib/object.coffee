###
# Object
# @author Caro.Huang
###
do ->
  self = caro

  ###
  # assign elements to from obj2 to obj1 by keys
  # won't replace obj1 value if exists when argument-replace is false
  # @param {object} obj1
  # @param {object} obj2
  # @param {array} keys the keys in obj2 that you want sand to obj1
  # @param {boolean} [replace=true] won't replace obj1 elements if obj1 has same key when false
  ###
  self.assignByKeys = (obj1, obj2, keys, replace = true) ->
    for key in keys
      if obj2.hasOwnProperty(key) and (replace or not obj1.hasOwnProperty(key))
        obj1[key] = obj2[key]

#    for key of obj1
#      if key in obj2
#
#      if (key in obj2) and (replace or not key in obj1)
#        obj1[key] = obj2[key]

#    caro.reduce(keys, (obj, key) ->
#      if caro.has(obj2, key) and (replace or not caro.has(obj, key))
#        obj[key] = obj2[key]
#      return obj
#    , obj1)
    obj1

  ###
  # catch other object-values to target-object
  # @param {object} obj
  # @return {object}
  ###
  self.catching = (obj) ->
    for eachObj, i in arguments
      continue if i is 0
      for eachKey, eachVal of eachObj
        obj[eachKey] = eachVal if obj.hasOwnProperty(eachKey)
    obj

  ###
  # group by argument type
  # @param {object|array} arg
  # @return {object}
  ###
  self.classify = (arg) ->
    aStr = []
    aBool = []
    aArr = []
    aNum = []
    aObj = []
    aFn = []
    for key, val in arg
      if typeof val is 'boolean'
        aBool.push val
      else if typeof val is 'string'
        aStr.push val
      else if typeof val is 'number'
        aNum.push val
      else if Array.isArray(val)
        aArr.push val
      else if typeof val is 'function'
        aFn.push val
      else if typeof val is 'object'
        aObj.push(val)

    bool: aBool
    str: aStr
    num: aNum
    arr: aArr
    obj: aObj
    fn: aFn

  ###
  # get keys that object1 has but object2 not
  # @param {object} obj1
  # @param {object} obj2
  # @return {array}
  ###
  self.differentKeys = (obj1, obj2, reverse) ->
    keys1 = Object.keys(obj1)
    keys2 = Object.keys(obj2)
    unless reverse
      keysA = keys1
      keysB = keys2
    else
      keysA = keys2
      keysB = keys1
    difArr = []
    for val in keysA
      difArr.push(val) if keysB.indexOf(val) < 0
    difArr

  ###
  # check if all keys are equal between objects
  # @param {object} obj1
  # @param {object} obj2
  # @return {boolean}
  ###
  self.hasEqualKeys = (obj1, obj2) ->
    size1 = caro.differentKeys(obj1, obj2).length
    size2 = caro.differentKeys(obj1, obj2, true).length
    size1 is 0 and size2 is 0

  ###
  # get keys that is same between objects
  # @param {object} obj1
  # @param {object} obj2
  # @return {array}
  ###
  self.sameKeys = (obj1, obj2) ->
    keys = Object.keys(obj1)
    diffKeys = caro.differentKeys(obj1, obj2)
    ret = []
    for val in keys
      ret.push(val) if diffKeys.indexOf(val) < 0
    ret

  return