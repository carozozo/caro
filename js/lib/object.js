
/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var changeStrValByObjKey, pushValToObjOrArr, self;
  self = caro;

  /**
   * change obj string-value by key, will change-all if aKey is empty
   * support-type: upper/lower/upperFirst
   * @param {object} obj
   * @param {string} type=upper|lower|upperFirst support-type
   * @param {string[]|[]} [keys] the assign-keys
   * @param {boolean} [clone=false] if clone for not replacing original
   * @returns {*}
   */
  changeStrValByObjKey = function(obj, type, keys, clone) {
    var aType, r;
    if (clone == null) {
      clone = false;
    }
    aType = ['upper', 'lower', 'upperFirst'];
    if (!caro.isObj(obj) || aType.indexOf(type) < 0) {
      return obj;
    }
    r = clone ? caro.cloneObj(obj) : obj;
    keys = keys || caro.getKeysInObj(r);
    keys = caro.splitStr(keys, ',');
    caro.each(keys, function(i, key) {
      var opt, val;
      if (!caro.keysInObj(r, key)) {
        return;
      }
      val = r[key];
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
   * @param {object} obj
   * @returns {Number}
   */
  self.getObjLength = function(obj) {
    return Object.keys(obj).length;
  };

  /**
   * extend obj similar jQuery.extend
   * @param {boolean} [deep=false] extend-recursive
   * @param {object...|array...} arg
   * @returns {*}
   */
  self.extendObj = function(deep, arg) {
    var firstArg;
    if (deep == null) {
      deep = false;
    }
    firstArg = null;
    caro.eachArgs(arguments, function(key, arg) {
      if (key !== 0) {
        return false;
      }
      if (caro.isBool(arg)) {
        deep = arg;
        return false;
      }
      if (caro.isObjOrArr(arg)) {
        firstArg = arg;
        deep = false;
        return false;
      }
    });
    caro.eachArgs(arguments, function(key, arg) {
      var results, val;
      if (!firstArg && caro.isObjOrArr(arg)) {
        firstArg = arg;
        return true;
      }
      results = [];
      for (key in arg) {
        val = arg[key];
        if (caro.isObj(firstArg) && caro.keysInObj(firstArg, key) && !deep) {
          continue;
        }
        results.push(pushValToObjOrArr(firstArg, key, val));
      }
      return results;
    });
    return firstArg;
  };

  /**
   * clone obj
   * @param {object} obj
   * @param {boolean} [deep=false] if clone all under obj
   * @returns {*}
   */
  self.cloneObj = function(arg) {
    var r;
    if (!caro.isObjOrArr(arg)) {
      return arg;
    }
    r = caro.isArr(arg) ? [] : {};
    return caro.extendObj(r, arg);
  };

  /**
   * replace key in object
   * @param {object} obj
   * @param {function({})} cb callback-fn that include key, and return new-key if you want to replace
   * @param {boolean} [clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.replaceObjKey = function(obj, cb, clone) {
    var objRet;
    if (clone == null) {
      clone = false;
    }
    objRet = obj;
    if (clone) {
      objRet = caro.cloneObj(obj);
    }
    caro.each(objRet, function(key, val) {
      var newKey;
      newKey = caro.executeIfFn(cb, key);
      if (newKey) {
        objRet[newKey] = val;
        delete objRet[key];
      }
    });
    return objRet;
  };

  /**
   * @param {object} obj
   * @param {function({})} cb callback-fn that include value, and return new-value if you want to replace
   * @param {object} [opt]
   * @param {boolean} [opt.deep=false] if deep-replace when element is obj
   * @param {boolean} [opt.clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.replaceObjVal = function(obj, cb, opt) {
    var clone, coverObjVal, deep, oClone;
    opt = caro.coverToObj(opt);
    deep = opt.deep === true;
    clone = opt.clone === true;
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
    oClone = clone ? caro.cloneObj(obj) : obj;
    coverObjVal(oClone);
    return oClone;
  };

  /**
   * @param {object} obj
   * @param {string[]|[]} [keys] the assign-keys
   * @param {boolean} [clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.upperCaseByObjKey = function(obj, keys, clone) {
    return changeStrValByObjKey(obj, 'upper', keys, clone);
  };

  /**
   * @param {object} obj
   * @param {string[]|[]} [keys] the assign-keys
   * @param {boolean} [clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.lowerCaseByObjKey = function(obj, keys, clone) {
    return changeStrValByObjKey(obj, 'lower', keys, clone);
  };

  /**
   * @param {object} obj
   * @param {string[]|[]} [keys] the assign-keys
   * @param {boolean} [clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.upperFirstByObjKey = function(obj, keys, clone) {
    return changeStrValByObjKey(obj, 'upperFirst', keys, clone);
  };

  /**
   * @param {object} obj
   * @param {object} [opt]
   * @param {boolean} [opt.deep=true] if deep-replace when element is obj
   * @param {boolean} [opt.clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.trimObjVal = function(obj, opt) {
    var clone, deep, r;
    opt = caro.coverToObj(opt);
    deep = opt.deep !== false;
    clone = opt.clone === true;
    r = clone ? caro.cloneObj(obj) : obj;
    caro.each(r, function(key, val) {
      if (caro.isObjOrArr(val) && deep) {
        r[key] = caro.trimObjVal(val, opt);
      } else if (caro.isStr(val)) {
        r[key] = val.trim();
      }
    });
    return r;
  };

  /**
   * check if key exists in obj, will return false when key not exist,no matter that other-keys are
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
      return true;
    });
    return pass;
  };

  /**
   * get keys in obj, and get all if levelLimit = 0
   * @param {object} obj
   * @param {number} [levelLimit=1] the level of obj you want to get keys
   * @returns {Array}
   */
  self.getKeysInObj = function(obj, levelLimit) {
    var arr, getKey, levelCount;
    arr = [];
    if (!caro.isObj(obj)) {
      return arr;
    }
    levelLimit = caro.coverToInt(levelLimit, false) > -1 ? levelLimit : 1;
    levelCount = 0;
    getKey = function(obj) {
      levelCount++;
      caro.each(obj, function(key, val) {
        if (levelLimit > 0 && levelCount > levelLimit) {
          return;
        }
        arr.push(key);
        if (caro.isObj(val)) {
          getKey(val);
        }
      });
      levelCount--;
    };
    getKey(obj);
    return arr;
  };

  /**
   * @param {object} obj
   * @param {boolean} [replaceWrap=true] if replace \r\n
   */
  self.coverFnToStrInObj = function(obj, replaceWrap) {
    if (replaceWrap == null) {
      replaceWrap = true;
    }
    caro.each(obj, function(key, val) {
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
        obj[key] = fnStr;
      }
    });
    return obj;
  };
})();
