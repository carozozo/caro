
/**
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * sort array
   * @param {[]} arr
   * @param {boolean} [sort=true] if sort by ASC
   * @param {boolean} [clone=false] if clone for not change original-array
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
   * sort array by key if value is object
   * @param {[]} arr
   * @param {string} key
   * @param {boolean} [sort=true] if sort by ASC
   * @param {boolean} [clone=false] if clone for not change original-array
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
   * get sum of value in array
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
      return sum;
    }
    caro.each(arr, function(i, val) {
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
   * remove item from array by index
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
      caro.each(aRemoveIndex, function(j, removeIndex) {
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
    caro.each(arr, function(i, val) {
      if (!checkIndexIfNeedRemove(i)) {
        r.push(val);
      }
    });
    arr = r;
    return r;
  };

  /**
   * remove the item from array by value
   * @param {[]} arr
   * @param {...*} value
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
      caro.each(aRemoveVal, function(j, removeIndex) {
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
    caro.each(arr, function(i, val) {
      if (!checkValIfNeedRemove(val)) {
        r.push(val);
      }
    });
    arr = r;
    return r;
  };

  /**
   * remove duplicate-value in array
   * @param {[]} arr
   * @returns {*}
   */
  self.removeDup = function(arr) {
    var r;
    if (!caro.isArr(arr)) {
      return arr;
    }
    r = [];
    caro.each(arr, function(i, val) {
      if (r.indexOf(val) < 0) {
        r.push(val);
      }
    });
    arr = r;
    return arr;
  };

  /**
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {*}
   */
  self.pushNoDup = function(arr, val) {
    if (!caro.isArr(arr)) {
      return arr;
    }
    caro.eachArgs(arguments, function(i, val) {
      if (i === 0 || arr.indexOf(val) > -1) {
        return;
      }
      arr.push(val);
    });
    return arr;
  };

  /**
   * will not push to array if value is empty
   * @param {[]} arr
   * @param {...*} value
   * @returns {*}
   */
  self.pushNoEmpty = function(arr, val) {
    if (!caro.isArr(arr)) {
      return arr;
    }
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0 || caro.isEmptyVal(arg)) {
        return;
      }
      arr.push(arg);
    });
    return arr;
  };

  /**
   * check if empty-value in array
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
      caro.each(arr, function(i, val) {
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
