
/**
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

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
    caro.each(arr, function(i, val) {
      if (caro.isNumber(val)) {
        sum += val;
      }
      if (force) {
        sum += parseFloat(val) || 0;
      }
    });
    return sum;
  };

  /**
   * remove duplicate-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.removeDup = function(arr) {
    var r;
    r = [];
    caro.each(arr, function(i, val) {
      if (r.indexOf(val) < 0) {
        r.push(val);
      }
    });
    return arr = r;
  };

  /**
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoDup = function(arr, val) {
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
   * @returns {array}
   */
  self.pushNoEmpty = function(arr, val) {
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
      caro.each(arr, function(i, val) {
        if (caro.isEmptyVal(val)) {
          hasEmpty = true;
          return false;
        }
      });
    };
    caro.each(arguments, function(i, arr) {
      if (hasEmpty) {
        return false;
      }
      checkVal(arr);
    });
    return hasEmpty;
  };

  /**
   * remove empty-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.removeEmptyInArr = function(arr) {
    var r;
    r = [];
    caro.each(arr, function(i, val) {
      if (!caro.isEmptyVal(val)) {
        r.push(val);
      }
    });
    return arr = r;
  };

  /**
   * only keep basic-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.basicArr = function(arr) {
    var r;
    r = [];
    caro.each(arr, function(i, val) {
      if (caro.isBasicVal(val)) {
        r.push(val);
      }
    });
    return arr = r;
  };
})();
