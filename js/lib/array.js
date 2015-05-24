
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
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoDuplicate = function(arr, val) {
    caro.each(arguments, function(i, val) {
      if (i === '0' || arr.indexOf(val) > -1) {
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
    caro.each(arguments, function(i, arg) {
      if (i === '0' || caro.isEmptyVal(arg)) {
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
  self.pullUnBasicVal = function(arr) {
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
