
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
   * @param {boolean} [force=false] if cover to number when argument is not number
   * @returns {number}
   */
  self.sumOfArr = function(arr, force) {
    if (force == null) {
      force = false;
    }
    return caro.reduce(arr, function(total, n) {
      if (!caro.isNumber(n) && !force) {
        return total;
      }
      return total + Number(n);
    });
  };

  /**
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoDuplicate = function(arr, val) {
    var args;
    args = caro.drop(arguments);
    caro.forEach(args, function(val) {
      if (arr.indexOf(val) > -1) {
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
  self.pushNoEmptyVal = function(arr, val) {
    var args;
    args = caro.drop(arguments);
    caro.forEach(args, function(arg) {
      if (caro.isEmptyVal(arg)) {
        return;
      }
      arr.push(arg);
    });
    return arr;
  };

  /**
   * remove empty-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullEmptyVal = function(arr) {
    return caro.remove(arr, function(n) {
      return !caro.isEmptyVal(n);
    });
  };

  /**
   * only keep basic-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullUnBasicVal = function(arr) {
    return caro.remove(arr, function(n) {
      return caro.isBasicVal(n);
    });
  };
})();
