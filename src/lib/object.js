/*
 * Object
 * @author Caro.Huang
 */
(function () {
  var self = caro;
  /*
   * assign elements to from obj2 to obj1 by keys
   * won't replace obj1 value if exists when argument-replace is false
   * @param {object} obj1
   * @param {object} obj2
   * @param {array} keys the keys in obj2 that you want sand to obj1
   * @param {boolean} [replace=true] won't replace obj1 elements if obj1 has same key when false
   */
  self.assignByKeys = function (obj1, obj2, keys, replace) {
    replace = replace !== undefined ? replace : true;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (obj2.hasOwnProperty(key) && (replace || !obj1.hasOwnProperty(key))) {
        obj1[key] = obj2[key];
      }
    }
    return obj1;
  };
  /*
   * catch other object-values to target-object
   * @param {object} obj
   * @return {object}
   */
  self.catching = function (obj) {
    for (var i = 0; i < arguments.length; i++) {
      var eachObj = arguments[i];
      if (i === 0) {
        continue;
      }
      for (var eachKey in eachObj) {
        var eachVal = eachObj[eachKey];
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
  self.classify = function (arg) {
    var aStr = [];
    var aBool = [];
    var aArr = [];
    var aNum = [];
    var aObj = [];
    var aFn = [];
    for (var key = 0 in arg) {
      var val = arg[key];
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
  self.differentKeys = function (obj1, obj2, reverse) {
    var keysA, keysB;
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);

    if (!reverse) {
      keysA = keys1;
      keysB = keys2;
    } else {
      keysA = keys2;
      keysB = keys1;
    }

    var difArr = [];
    for (var i = 0; i < keysA.length; i++) {
      var val = keysA[i];
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
  self.hasEqualKeys = function (obj1, obj2) {
    var size1 = caro.differentKeys(obj1, obj2).length;
    var size2 = caro.differentKeys(obj1, obj2, true).length;
    return size1 === 0 && size2 === 0;
  };
  /*
   * get keys that is same between objects
   * @param {object} obj1
   * @param {object} obj2
   * @return {array}
   */
  self.sameKeys = function (obj1, obj2) {
    var keys = Object.keys(obj1);
    var diffKeys = caro.differentKeys(obj1, obj2);
    var ret = [];
    for (var i = 0; i < keys.length; i++) {
      var val = keys[i];
      if (diffKeys.indexOf(val) < 0) {
        ret.push(val);
      }
    }
    return ret;
  };
})();
