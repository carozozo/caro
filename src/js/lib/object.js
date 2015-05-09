
/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var changeStrValByObjKey, self;
  self = caro;

  /**
   * change obj string-value by key, will change-all if aKey is empty
   * support-type: upper/lower/upperFirst
   * @param {object} obj
   * @param {string} type=upper|lower|upperFirst support-type
   * @param {string[]|[]} [keys] the assign-keys
   * @param {object} [opt]
   * @param {boolean} [opt.clone=false] if clone for not replacing original
   * @returns {*}
   */
  changeStrValByObjKey = function(obj, type, keys, opt) {
    var aType, clone, objRet;
    aType = ['upper', 'lower', 'upperFirst'];
    if (!caro.isObj(obj) || aType.indexOf(type) < 0) {
      return obj;
    }
    objRet = obj;
    clone = false;
    if (opt) {
      clone = opt.clone === true;
    }
    if (clone) {
      objRet = caro.cloneObj(obj);
    }
    keys = keys || caro.getKeysInObj(objRet);
    keys = caro.splitStr(keys, ',');
    caro.eachObj(keys, function(i, key) {
      var val;
      if (!caro.keysInObj(objRet, key)) {
        return;
      }
      val = objRet[key];
      switch (type) {
        case 'upper':
          return objRet[key] = caro.upperStr(val);
        case 'lower':
          return objRet[key] = caro.lowerStr(val);
        case 'upperFirst':
          objRet[key] = caro.upperFirst(val);
      }
    });
    return objRet;
  };

  /**
   * like jQuery.each function
   * @param {object} obj
   * @param {function} cb callback-fn for each key & val
   */
  self.eachObj = function(obj, cb) {
    var isArr, key, val;
    isArr = Array.isArray(obj);
    for (key in obj) {
      val = obj[key];
      if (isArr) {
        key = parseInt(key);
      }
      if (cb && cb(key, val) === false) {
        break;
      }
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
   * @param {object} obj1
   * @param {object} obj2
   * @param {boolean} [deep=true]
   * @returns {*}
   */
  self.extendObj = function(obj1, obj2, deep) {
    deep = deep !== false;
    caro.eachObj(obj2, function(key, val) {
      if (deep) {
        obj1[key] = caro.cloneObj(val, deep);
        return;
      }
      obj1[key] = val;
    });
    return obj1;
  };

  /**
   * clone obj, will clone all under obj when deep !== false
   * @param {object} obj
   * @param {boolean} [deep=true]
   * @returns {*}
   */
  self.cloneObj = function(obj, deep) {
    var clone;
    deep = deep !== false;
    clone = function(obj) {
      var copy;
      if (!caro.isObj(obj)) {
        return obj;
      }
      copy = obj.constructor();
      caro.eachObj(obj, function(key, val) {
        if (deep) {
          copy[key] = clone(val);
          return;
        }
        copy[key] = val;
      });
      return copy;
    };
    return clone(obj);
  };

  /**
   * copy obj-value by key
   * @param {object} obj
   * @param {string[]|string} keys the element that want to copy by keys
   * @param {object} [opt]
   * @param {boolean} [opt.clone=true] if clone for not replacing original
   * @param {boolean} [opt.keep=true] if keep original element
   * @returns {{}}
   */
  self.copyByObjKey = function(obj, keys, opt) {
    var clone, keep, obj2;
    clone = true;
    keep = true;
    obj2 = {};
    keys = caro.splitStr(keys, ',');
    if (opt) {
      clone = opt.clone !== false;
      keep = opt.keep !== false;
    }
    caro.eachObj(keys, function(i, key) {
      if (clone) {
        obj2[key] = caro.cloneObj(obj[key]);
      } else {
        obj2[key] = obj[key];
      }
      if (!keep) {
        delete obj[key];
      }
    });
    return obj2;
  };

  /**
   * replace key in object
   * @param {object} obj
   * @param {function({})} cb callback-fn that include key, and return new-key if you want to replace
   * @param {object} [opt]
   * @param {boolean} [opt.clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.replaceObjKey = function(obj, cb, opt) {
    var clone, objRet;
    objRet = obj;
    clone = false;
    if (opt) {
      clone = opt.clone === true;
    }
    if (clone) {
      objRet = caro.cloneObj(obj);
    }
    caro.eachObj(objRet, function(key, val) {
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
    oClone = obj;
    deep = false;
    clone = false;
    coverObjVal = function(o) {
      caro.eachObj(o, function(key, val) {
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
    if (opt) {
      deep = opt.deep !== false;
      clone = opt.clone === true;
    }
    if (clone) {
      oClone = caro.cloneObj(obj);
    }
    coverObjVal(oClone);
    return oClone;
  };

  /**
   * @param {object} obj
   * @param {string[]|[]} [keys] the assign-keys
   * @param {object} [opt]
   * @param {boolean} [opt.clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.upperCaseByObjKey = function(obj, keys, opt) {
    changeStrValByObjKey(obj, 'upper', keys, opt);
    return obj;
  };

  /**
   * @param {object} obj
   * @param {string[]|[]} [keys] the assign-keys
   * @param {object} [opt]
   * @param {boolean} [opt.clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.lowerCaseByObjKey = function(obj, keys, opt) {
    changeStrValByObjKey(obj, 'lower', keys, opt);
    return obj;
  };

  /**
   * @param {object} obj
   * @param {string[]|[]} [keys] the assign-keys
   * @param {object} [opt]
   * @param {boolean} [opt.clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.upperFirstByObjKey = function(obj, keys, opt) {
    changeStrValByObjKey(obj, 'upperFirst', keys, opt);
    return obj;
  };

  /**
   * @param {object} obj
   * @param {object} [opt]
   * @param {boolean} [opt.deep=true] if deep-replace when element is obj
   * @param {boolean} [opt.clone=false] if clone for not replacing original
   * @returns {*}
   */
  self.trimObjVal = function(obj, opt) {
    var clone, deep, objRet;
    deep = true;
    clone = false;
    objRet = obj;
    if (opt) {
      deep = opt.deep !== false;
      clone = opt.clone === true;
    }
    if (clone) {
      objRet = caro.cloneObj(obj);
    }
    caro.eachObj(objRet, function(key, val) {
      if (caro.isObj(val) && deep) {
        objRet[key] = caro.trimObjVal(val, opt);
      }
      if (caro.isStr(val)) {
        objRet[key] = val.trim();
      }
    });
    return objRet;
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
    caro.eachObj(keys, function(i, key) {
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
    levelCount = 0;
    getKey = function(obj) {
      levelCount++;
      caro.eachObj(obj, function(key, val) {
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
    obj = obj || {};
    levelLimit = caro.coverToInt(levelLimit) > -1 ? levelLimit : 1;
    getKey(obj);
    return arr;
  };

  /**
   * @param {object} obj
   * @param {object} [opt]
   * @param {boolean} [opt.replaceWrap=true] if replace \r\n
   */
  self.coverFnToStrInObj = function(obj, opt) {
    var replaceWrap;
    replaceWrap = true;
    if (opt) {
      replaceWrap = opt.replaceWrap !== false;
    }
    caro.eachObj(obj, function(key, val) {
      var fnStr;
      if (caro.isObj(val)) {
        caro.coverFnToStrInObj(val);
        return;
      }
      if (caro.isFn(val)) {
        fnStr = val.toString();
        if (replaceWrap) {
          fnStr = caro.replaceAll(fnStr, '\r', '');
          fnStr = caro.replaceAll(fnStr, '\n', '');
        }
        obj[key] = fnStr;
      }
    });
    return obj;
  };
})();
