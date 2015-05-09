
/**
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  'use strict';
  var self;
  self = caro;

  /**
   * clone arr
   * @param {[]} arr
   * @returns {Array}
   */
  self.cloneArr = function(arr) {
    if (!caro.isArr(arr)) {
      return [];
    }
    return arr.slice(0);
  };

  /**
   * extend arr
   * @param  {...[]} arr the arr that want to extend
   * @param {boolean} [duplicate=true] if extend duplicate-val
   * @returns {*}
   */
  self.extendArr = function(duplicate, arr) {
    var extend, firstArr, otherArr;
    firstArr = null;
    otherArr = [];
    extend = function(arr) {
      caro.eachObj(arr, function(i, eachVal) {
        if (!duplicate) {
          firstArr = caro.pushNoDup(firstArr, eachVal);
          return;
        }
        firstArr.push(eachVal);
      });
    };
    caro.eachObj(arguments, function(i, arg) {
      if (caro.isArr(arg)) {
        if (!firstArr) {
          firstArr = caro.cloneArr(arg);
        } else {
          otherArr.push(arg);
        }
      }
      if (caro.isBool(arg)) {
        duplicate = arg;
      }
    });
    duplicate = duplicate !== false;
    caro.eachObj(otherArr, function(i, eachArr) {
      extend(eachArr);
    });
    return firstArr;
  };

  /**
   * sort arr by key if value is obj
   * @param {[]} arr
   * @param {string} key
   * @param {boolean} [sort=true]
   * @returns {*}
   */
  self.sortByObjKey = function(arr, key, sort) {
    if (!caro.isArr(arr)) {
      return arr;
    }
    sort = sort !== false;
    arr = caro.cloneArr(arr);
    arr.sort(function(a, b) {
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
    return arr;
  };

  /**
   * get sum of val in arr
   * @param {[]} arr
   * @param {boolean} [force=false]
   * @returns {number}
   */
  self.sumOfArr = function(arr, force) {
    var sum;
    sum = 0;
    if (!caro.isArr(arr)) {
      return 0;
    }
    force = force === true;
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
    r = caro.cloneArr(arr);
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
    r = caro.cloneArr(arr);
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
