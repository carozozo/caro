
/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var changeStrValByObjKey, pushValToObjOrArr, self;
  self = caro;

  /**
   * change object string-value by key, will change-all if aKey is empty
   * support-type: upper/lower/upperFirst
   * @param {object} obj
   * @param {string} type=upper|lower|upperFirst support-type
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  changeStrValByObjKey = function(obj, type, keys) {
    var aType, r;
    aType = ['upper', 'lower', 'upperFirst', 'trim'];
    r = obj;
    if (!caro.isObj(obj) || aType.indexOf(type) < 0) {
      return obj;
    }
    keys = keys || caro.getKeysInObj(r);
    keys = caro.splitStr(keys, ',');
    caro.each(keys, function(i, key) {
      var opt, val;
      if (!caro.keysInObj(r, key)) {
        return;
      }
      val = r[key];
      if (!caro.isString(val)) {
        return;
      }
      opt = {
        force: false
      };
      switch (type) {
        case 'upper':
          r[key] = caro.upperStr(val, opt);
          break;
        case 'lower':
          r[key] = caro.lowerStr(val, opt);
          break;
        case 'upperFirst':
          r[key] = caro.upperFirst(val, false);
          break;
        case 'trim':
          r[key] = caro.trimStr(val, false);
      }
    });
    return r;
  };
  pushValToObjOrArr = function(arg, key, val) {
    if (caro.isArr(arg)) {
      arg.push(val);
    } else if (caro.isObj(arg)) {
      arg[key] = val;
    }
  };

  /**
   * get object-length
   * @param {object} obj
   * @returns {Number}
   */
  self.getObjLength = function(obj) {
    return Object.keys(obj).length;
  };

  /**
   * extend object, similar jQuery.extend
   * @param {boolean} [deep=false] extend-recursive
   * @param {object...|array...} arg
   * @returns {*}
   */
  self.extendObj = function(deep, arg) {
    var r;
    if (deep == null) {
      deep = false;
    }
    r = null;
    if (!caro.isBoolean(deep)) {
      r = deep;
      deep = false;
    }
    caro.eachArgs(arguments, function(key, arg) {
      var results, val;
      if (!r && caro.isObjOrArr(arg)) {
        r = arg;
        return true;
      }
      results = [];
      for (key in arg) {
        val = arg[key];
        if (caro.isObj(r) && caro.keysInObj(r, key) && !deep) {
          continue;
        }
        results.push(pushValToObjOrArr(r, key, val));
      }
      return results;
    });
    return r;
  };

  /**
   * clone object
   * @param {object} obj
   * @param {boolean} [deep=false] if clone all under object
   * @returns {*}
   */
  self.cloneObj = function(arg, deep) {
    var r;
    if (deep == null) {
      deep = false;
    }
    if (!caro.isObjOrArr(arg)) {
      return arg;
    }
    r = caro.isArr(arg) ? [] : {};
    caro.extendObj(r, arg);
    if (deep) {
      caro.each(r, function(key, val) {
        return r[key] = caro.cloneObj(val);
      });
    }
    return r;
  };

  /**
   * replace key in object
   * @param {object} obj
   * @param {function({})} cb callback-function that include key, and return new-key if you want to replace
   * @returns {*}
   */
  self.replaceObjKey = function(obj, cb) {
    var r;
    r = obj;
    caro.each(r, function(key, val) {
      var newKey;
      newKey = caro.executeIfFn(cb, key);
      if (newKey) {
        r[newKey] = val;
        delete r[key];
      }
    });
    return r;
  };

  /**
   * replace value in object
   * @param {object} obj
   * @param {function({})} cb callback-function that include value, and return new-value if you want to replace
   * @param {boolean} [deep=false] if deep-replace when element is object
   * @returns {*}
   */
  self.replaceObjVal = function(obj, cb, deep) {
    var coverObjVal, r;
    if (deep == null) {
      deep = false;
    }
    r = obj;
    coverObjVal = function(o) {
      caro.each(o, function(key, val) {
        var newVal;
        if (caro.isObj(val) && deep) {
          coverObjVal(val);
          return;
        }
        newVal = caro.executeIfFn(cb, val);
        if (newVal !== void 0) {
          o[key] = newVal;
        }
      });
    };
    coverObjVal(r);
    return r;
  };

  /**
   * upper-case value in object by key, will replace-all if key is empty
   * @param {object} obj
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  self.upperCaseByObjKey = function(obj, keys) {
    return changeStrValByObjKey(obj, 'upper', keys);
  };

  /**
   * lower-case value in object by key, will replace-all if key is empty
   * @param {object} obj
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  self.lowerCaseByObjKey = function(obj, keys) {
    return changeStrValByObjKey(obj, 'lower', keys);
  };

  /**
   * upper-case the first char of value in object by key, will replace-all if key is empty
   * @param {object} obj
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  self.upperFirstByObjKey = function(obj, keys) {
    return changeStrValByObjKey(obj, 'upperFirst', keys);
  };

  /**
   * trim value in object by key, will replace-all if key is empty
   * @param {object} obj
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  self.trimByObjKey = function(obj, keys) {
    return changeStrValByObjKey(obj, 'trim', keys);
  };

  /**
   * check if key exists in object, will return false when key not exist, no matter that other-keys are
   * @param {object} obj
   * @param {string[]|string} keys the keys that want to validate
   * @returns {boolean}
   */
  self.keysInObj = function(obj, keys) {
    var pass;
    if (!caro.isObj(obj)) {
      return false;
    }
    pass = true;
    keys = caro.splitStr(keys, ',');
    caro.each(keys, function(i, key) {
      if (!obj.hasOwnProperty(key)) {
        pass = false;
        return false;
      }
    });
    return pass;
  };

  /**
   * get keys in object, and get all if levelLimit = 0
   * @param {object} obj
   * @param {number} [levelLimit=1] the level of object you want to get keys
   * @returns {Array}
   */
  self.getKeysInObj = function(obj, levelLimit) {
    var getKey, levelCount, r;
    r = [];
    if (!caro.isObj(obj)) {
      return r;
    }
    levelLimit = caro.coverToInt(levelLimit, false) > -1 ? levelLimit : 1;
    levelCount = 0;
    getKey = function(obj) {
      levelCount++;
      caro.each(obj, function(key, val) {
        if (levelLimit > 0 && levelCount > levelLimit) {
          return;
        }
        r.push(key);
        if (caro.isObj(val)) {
          getKey(val);
        }
      });
      levelCount--;
    };
    getKey(obj);
    return r;
  };

  /**
   * covert to string if element is function in object
   * @param {object} obj
   * @param {boolean} [replaceWrap=true] if replace \r\n
   */
  self.coverFnToStrInObj = function(obj, replaceWrap) {
    var r;
    if (replaceWrap == null) {
      replaceWrap = true;
    }
    r = obj;
    caro.each(r, function(key, val) {
      var fnStr;
      if (caro.isObjOrArr(val)) {
        caro.coverFnToStrInObj(val);
      } else if (caro.isFn(val)) {
        fnStr = val.toString();
        if (replaceWrap) {
          fnStr = fnStr.replace(/([\r]\s*|[\n]\s*)/g, '');
        } else {
          fnStr = fnStr.replace(/[\r]\s*/g, '\r ');
          fnStr = fnStr.replace(/[\n]\s*/g, '\n ');
        }
        r[key] = fnStr;
      }
    });
    return r;
  };

  /**
   * cover object to array
   * @param {...object} obj
   * @returns {Array}
   */
  self.objToArr = function(obj) {
    var r;
    r = [];
    caro.each(obj, function(i, val) {
      r.push(val);
    });
    return r;
  };
})();
