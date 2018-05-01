/*
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;
  /*
   * remove all items in array
   * @param {[]} arr
   * @returns {array}
   */
  self.cleanArr = function(arr) {
    arr.splice(0, arr.length);
    return arr;
  };
  /*
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoDuplicate = function(arr) {
    var i, j, len, val;
    for (i = j = 0, len = arguments.length; j < len; i = ++j) {
      val = arguments[i];
      if (i === 0 || arr.indexOf(val) > -1) {
        continue;
      }
      arr.push(val);
    }
    return arr;
  };
  /*
   * will not push to array if value is empty
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoEmptyVal = function(arr) {
    var i, j, len, val;
    for (i = j = 0, len = arguments.length; j < len; i = ++j) {
      val = arguments[i];
      if (i === 0 || caro.isEmptyVal(val)) {
        continue;
      }
      arr.push(val);
    }
    return arr;
  };
  /*
   * remove empty-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullEmptyVal = function(arr) {
    var count, emptyArr, i, j, ref, val;
    emptyArr = [];
    count = 0;
    for (i = j = 0, ref = arr.length - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
      val = arr[count];
      if (caro.isEmptyVal(val)) {
        emptyArr.push(val);
        arr.splice(count, 1);
      } else {
        count++;
      }
    }
    return emptyArr;
  };
  /*
   * only keep basic-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullUnBasicVal = function(arr) {
    var count, emptyArr, i, j, ref, val;
    emptyArr = [];
    count = 0;
    for (i = j = 0, ref = arr.length - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
      val = arr[count];
      if (!caro.isBasicVal(val)) {
        emptyArr.push(val);
        arr.splice(count, 1);
      } else {
        count++;
      }
    }
    return emptyArr;
  };
  /*
   * pick up item from array by random
   * @param {[]} arrf
   * @returns {boolean} [removeFromArr=false]
   */
  self.randomPick = function(arr, removeFromArr = false) {
    var randIndex;
    randIndex = caro.randomInt(arr.length - 1);
    if (!removeFromArr) {
      return arr[randIndex];
    }
    return arr.splice(randIndex, 1)[0];
  };
  /*
   * get sum of value in array
   * @param {[]} arr
   * @param {boolean} [force=false] if cover to number when argument is not number
   * @returns {number}
   */
  self.sumOfArr = function(arr, force = false) {
    var i, j, len, total, val;
    total = 0;
    for (i = j = 0, len = arr.length; j < len; i = ++j) {
      val = arr[i];
      if (typeof val === 'number') {
        total += val;
      } else if (force) {
        total += Number(val);
      }
    }
    return total;
  };
})();
