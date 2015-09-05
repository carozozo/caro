
/*
 * Object
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /*
   * display object/array by string
   * @param {object|array} obj
   * @param {number} [spaceLength=2] the space before each line
   */
  self.toWord = function(arg, spaceLength) {
    var toWord;
    toWord = function(arg, spaceLength, layer) {
      var fnSpace, fnSpaceLength, reg, ret, space;
      spaceLength = spaceLength || 2;
      layer = layer || 0;
      fnSpaceLength = layer * 2 + 6;
      space = caro.repeat(' ', spaceLength);
      fnSpace = caro.repeat(' ', fnSpaceLength);
      layer++;
      try {
        ret = JSON.stringify(arg, function(key, val) {
          if (!key) {
            return val;
          }
          return toWord(val, spaceLength, layer);
        }, spaceLength);
        ret = ret.replace(/\\r\\n/g, '\r\n' + space);
        ret = ret.replace(/\\r/g, '\r' + space);
        ret = ret.replace(/\\n/g, '\n' + space);
        ret = ret.replace(/"/g, '');
      } catch (undefined) {}
      if (ret) {
        return ret;
      }
      try {
        ret = arg.toString();
        if (caro.isFunction(arg)) {
          reg = new RegExp('\r\n' + fnSpace, 'g');
          ret = ret.replace(reg, '\r\n');
          reg = new RegExp('\r' + fnSpace, 'g');
          ret = ret.replace(reg, '\r');
          reg = new RegExp('\\n' + fnSpace, 'g');
          ret = ret.replace(reg, '\n');
          ret = ret.replace(/"/g, '');
        }
      } catch (undefined) {}
      return ret;
    };
    return toWord(arg, spaceLength);
  };

  /*
   * group by argument type
   * @param {object|array} arg
   * @return {object}
   */
  self.classify = function(arg) {
    var aArr, aBool, aFn, aNum, aObj, aStr;
    aStr = [];
    aBool = [];
    aArr = [];
    aNum = [];
    aObj = [];
    aFn = [];
    caro.forEach(arg, function(a) {
      if (caro.isBoolean(a)) {
        return aBool.push(a);
      } else if (caro.isString(a)) {
        aStr.push(a);
      } else if (caro.isNumber(a)) {
        return aNum.push(a);
      } else if (caro.isArray(a)) {
        return aArr.push(a);
      } else if (caro.isPlainObject(a)) {
        return aObj.push(a);
      } else if (caro.isFunction(a)) {
        return aFn.push(a);
      }
    });
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
   * catch other object-values to target-object
   * @param {object} obj
   * @return {object}
   */
  self.catching = function(obj) {
    var args;
    args = caro.drop(arguments);
    caro.forEach(args, function(eachObj) {
      return caro.forEach(eachObj, function(eachVal, eachKey) {
        if (obj.hasOwnProperty(eachKey)) {
          return obj[eachKey] = eachVal;
        }
      });
    });
    return obj;
  };

  /*
   * get keys that object1 has but object2 not
   * @param {object} obj1
   * @param {object} obj2
   * @return {array}
   */
  self.differentKeys = function(obj1, obj2, reverse) {
    var keys1, keys2;
    keys1 = caro.keys(obj1);
    keys2 = caro.keys(obj2);
    if (!reverse) {
      return caro.difference(keys1, keys2);
    }
    return caro.difference(keys2, keys1);
  };

  /*
   * check if all keys are equal between objects
   * @param {object} obj1
   * @param {object} obj2
   * @return {boolean}
   */
  self.hasEqualKeys = function(obj1, obj2) {
    var size1, size2;
    size1 = caro.size(caro.differentKeys(obj1, obj2));
    size2 = caro.size(caro.differentKeys(obj1, obj2, true));
    return size1 === 0 && size2 === 0;
  };
})();
