/*
 * Object
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;
  /*
   * assign elements to from obj2 to obj1 by keys
   * won't replace obj1 value if exists when argument-replace is false
   * @param {object} obj1
   * @param {object} obj2
   * @param {array} keys the keys in obj2 that you want sand to obj1
   * @param {boolean} [replace=true] won't replace obj1 elements if obj1 has same key when false
   */
  self.assignByKeys = function(obj1, obj2, keys, replace = true) {
    var j, key, len;
    for (j = 0, len = keys.length; j < len; j++) {
      key = keys[j];
      if (obj2.hasOwnProperty(key) && (replace || !obj1.hasOwnProperty(key))) {
        obj1[key] = obj2[key];
      }
    }
    //    for key of obj1
    //      if key in obj2

    //      if (key in obj2) and (replace or not key in obj1)
    //        obj1[key] = obj2[key]

    //    caro.reduce(keys, (obj, key) ->
    //      if caro.has(obj2, key) and (replace or not caro.has(obj, key))
    //        obj[key] = obj2[key]
    //      return obj
    //    , obj1)
    return obj1;
  };
  /*
   * catch other object-values to target-object
   * @param {object} obj
   * @return {object}
   */
  self.catching = function(obj) {
    var eachKey, eachObj, eachVal, i, j, len;
    for (i = j = 0, len = arguments.length; j < len; i = ++j) {
      eachObj = arguments[i];
      if (i === 0) {
        continue;
      }
      for (eachKey in eachObj) {
        eachVal = eachObj[eachKey];
        if (obj.hasOwnProperty(eachKey)) {
          obj[eachKey] = eachVal;
        }
      }
    }
    return obj;
  };
  /*
   * group by argument type
   * @param {object|array} arg
   * @return {object}
   */
  self.classify = function(arg) {
    var aArr, aBool, aFn, aNum, aObj, aStr, j, key, len, val;
    aStr = [];
    aBool = [];
    aArr = [];
    aNum = [];
    aObj = [];
    aFn = [];
    for (val = j = 0, len = arg.length; j < len; val = ++j) {
      key = arg[val];
      if (typeof val === 'boolean') {
        aBool.push(val);
      } else if (typeof val === 'string') {
        aStr.push(val);
      } else if (typeof val === 'number') {
        aNum.push(val);
      } else if (Array.isArray(val)) {
        aArr.push(val);
      } else if (typeof val === 'function') {
        aFn.push(val);
      } else if (typeof val === 'object') {
        aObj.push(val);
      }
    }
    return {
      bool: aBool,
      str: aStr,
      num: aNum,
      arr: aArr,
      obj: aObj,
      fn: aFn
    };
  };
  /*
   * get keys that object1 has but object2 not
   * @param {object} obj1
   * @param {object} obj2
   * @return {array}
   */
  self.differentKeys = function(obj1, obj2, reverse) {
    var difArr, j, keys1, keys2, keysA, keysB, len, val;
    keys1 = Object.keys(obj1);
    keys2 = Object.keys(obj2);
    if (!reverse) {
      keysA = keys1;
      keysB = keys2;
    } else {
      keysA = keys2;
      keysB = keys1;
    }
    difArr = [];
    for (j = 0, len = keysA.length; j < len; j++) {
      val = keysA[j];
      if (keysB.indexOf(val) < 0) {
        difArr.push(val);
      }
    }
    return difArr;
  };
  /*
   * check if all keys are equal between objects
   * @param {object} obj1
   * @param {object} obj2
   * @return {boolean}
   */
  self.hasEqualKeys = function(obj1, obj2) {
    var size1, size2;
    size1 = caro.differentKeys(obj1, obj2).length;
    size2 = caro.differentKeys(obj1, obj2, true).length;
    return size1 === 0 && size2 === 0;
  };
  /*
   * get keys that is same between objects
   * @param {object} obj1
   * @param {object} obj2
   * @return {array}
   */
  self.sameKeys = function(obj1, obj2) {
    var diffKeys, j, keys, len, ret, val;
    keys = Object.keys(obj1);
    diffKeys = caro.differentKeys(obj1, obj2);
    ret = [];
    for (j = 0, len = keys.length; j < len; j++) {
      val = keys[j];
      if (diffKeys.indexOf(val) < 0) {
        ret.push(val);
      }
    }
    return ret;
  };
})();
