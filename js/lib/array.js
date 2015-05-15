
/**
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * sort arr
   * @param {[]} arr
   * @param {boolean} [clone=false] if clone for not change original-arr
   * @returns {*}
   */
  self.sortArr = function(arr, sort, clone) {
    var r;
    if (sort == null) {
      sort = true;
    }
    if (clone == null) {
      clone = false;
    }
    if (!caro.isArr(arr)) {
      return arr;
    }
    r = clone === false ? arr : caro.cloneObj(arr);
    r.sort(function(a, b) {
      if (sort) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      }
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
    return r;
  };

  /**
   * sort arr by key if value is obj
   * @param {[]} arr
   * @param {string} key
   * @param {boolean} [sort=true]
   * @param {boolean} [clone=false] if clone for not change original-arr
   * @returns {*}
   */
  self.sortByObjKey = function(arr, key, sort, clone) {
    var r;
    if (sort == null) {
      sort = true;
    }
    if (clone == null) {
      clone = false;
    }
    if (!caro.isArr(arr)) {
      return arr;
    }
    r = clone === false ? arr : caro.cloneObj(arr);
    r.sort(function(a, b) {
      var order1, order2;
      order1 = a[key] || 0;
      order2 = b[key] || 0;
      if (sort) {
        if (order1 < order2) {
          return -1;
        } else if (order1 > order2) {
          return 1;
        } else {
          return 0;
        }
      }
      if (order1 > order2) {
        return -1;
      } else if (order1 < order2) {
        return 1;
      } else {
        return 0;
      }
    });
    return r;
  };

  /**
   * get sum of val in arr
   * @param {[]} arr
   * @param {boolean} [force=false]
   * @returns {number}
   */
  self.sumOfArr = function(arr, force) {
    var sum;
    if (force == null) {
      force = false;
    }
    sum = 0;
    if (!caro.isArr(arr)) {
      return 0;
    }
    caro.eachObj(arr, function(i, val) {
      if (caro.isNum(val)) {
        sum += val;
      }
      if (force) {
        sum += parseFloat(val) || 0;
      }
    });
    return sum;
  };

  /**
   * remove item from arr by index
   * @param {[]} arr
   * @param {...number} index
   * @returns {*}
   */
  self.removeByIndex = function(arr, index) {
    var aRemoveIndex, checkIndexIfNeedRemove, r;
    if (!caro.isArr(arr)) {
      return arr;
    }
    r = [];
    aRemoveIndex = [];
    checkIndexIfNeedRemove = function(i) {
      var needRemove;
      needRemove = false;
      caro.eachObj(aRemoveIndex, function(j, removeIndex) {
        if (i === removeIndex) {
          needRemove = true;
          return false;
        }
      });
      return needRemove;
    };
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0) {
        return;
      }
      arg = parseInt(arg);
      aRemoveIndex.push(arg);
    });
    caro.eachObj(arr, function(i, val) {
      if (!checkIndexIfNeedRemove(i)) {
        r.push(val);
      }
    });
    return r;
  };

  /**
   * remove the item from arr by val
   * @param {[]} arr
   * @param {...*} val
   * @returns {*}
   */
  self.removeByArrVal = function(arr, val) {
    var aRemoveVal, checkValIfNeedRemove, r;
    if (!caro.isArr(arr)) {
      return arr;
    }
    r = [];
    aRemoveVal = [];
    checkValIfNeedRemove = function(val) {
      var needRemove;
      needRemove = false;
      caro.eachObj(aRemoveVal, function(j, removeIndex) {
        if (val === removeIndex) {
          needRemove = true;
        }
      });
      return needRemove;
    };
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0) {
        return;
      }
      aRemoveVal.push(arg);
    });
    caro.eachObj(arr, function(i, val) {
      if (!checkValIfNeedRemove(val)) {
        r.push(val);
      }
    });
    return r;
  };

  /**
   * remove duplicate-val in arr
   * @param {[]} arr
   * @returns {*}
   */
  self.removeDup = function(arr) {
    var r;
    if (!caro.isArr(arr)) {
      return arr;
    }
    r = [];
    caro.eachObj(arr, function(i, val) {
      if (r.indexOf(val) < 0) {
        r.push(val);
      }
    });
    return r;
  };

  /**
   * push val into arr if not exists
   * @param {[]} arr
   * @param {...*} val
   * @returns {*}
   */
  self.pushNoDup = function(arr, val) {
    var r;
    if (!caro.isArr(arr)) {
      return arr;
    }
    r = caro.cloneObj(arr);
    caro.eachArgs(arguments, function(i, val) {
      if (i === 0 || arr.indexOf(val) > -1) {
        return;
      }
      r.push(val);
    });
    return r;
  };

  /**
   * will not push to arr if value is empty
   * @param {[]} arr
   * @param {...*} val
   * @returns {*}
   */
  self.pushNoEmpty = function(arr, val) {
    var aValNeedPush, r;
    if (!caro.isArr(arr)) {
      return arr;
    }
    r = caro.cloneObj(arr);
    aValNeedPush = [];
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0 || caro.isEmptyVal(arg)) {
        return;
      }
      aValNeedPush.push(arg);
    });
    caro.eachObj(aValNeedPush, function(i, valNeedPush) {
      r.push(valNeedPush);
    });
    return r;
  };

  /**
   * check if empty-value in arr
   * @param {...[]} arr
   * @returns {boolean}
   */
  self.hasEmptyInArr = function(arr) {
    var checkVal, hasEmpty;
    hasEmpty = false;
    checkVal = function(arr) {
      if (!caro.isArr(arr)) {
        hasEmpty = true;
        return;
      }
      caro.eachObj(arr, function(i, val) {
        if (caro.isEmptyVal(val)) {
          hasEmpty = true;
          return false;
        }
        return true;
      });
    };
    caro.eachArgs(arguments, function(i, arr) {
      if (hasEmpty) {
        return false;
      }
      checkVal(arr);
      return true;
    });
    return hasEmpty;
  };
})();
