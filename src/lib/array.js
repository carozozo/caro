/*
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function () {
  var self = caro;
  /*
   * remove all items in array
   * @param {[]} arr
   * @returns {array}
   */
  self.cleanArr = function (arr) {
    arr.splice(0, arr.length);
    return arr;
  };
  /*
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoDuplicate = function (arr) {
    for (var i = 1; i < arguments.length; i++) {
      var val = arguments[i];
      if (arr.indexOf(val) > -1) continue;
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
  self.pushNoEmptyVal = function (arr) {
    for (var i = 1; i < arguments.length; i++) {
      var val = arguments[i];
      if (caro.isEmptyVal(val)) continue;
      arr.push(val);
    }
    return arr;
  };
  /*
   * remove empty-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullEmptyVal = function (arr) {
    var emptyArr = [];
    var i = 0;
    while (i < arr.length && i >= 0) {
      var val = arr[i];
      if (caro.isEmptyVal(val)) {
        emptyArr.push(val);
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
    return emptyArr;
  };
  /*
   * only keep basic-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullUnBasicVal = function (arr) {
    var basicArr = [];
    var i = 0;
    while (i < arr.length && i >= 0) {
      var val = arr[i];
      if (!caro.isBasicVal(val)) {
        basicArr.push(val);
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
    return basicArr;
  };
  /*
   * pick up item from array by random
   * @param {[]} arr
   * @returns {boolean} [removeFromArr=false]
   */
  self.randomPick = function (arr, removeFromArr) {
    var randIndex = caro.randomInt(arr.length - 1);
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
  self.sumOfArr = function (arr, force) {
    var total = 0;
    for (var i in arr) {
      var val = arr[i];
      if (typeof val === 'number') {
        total += val;
      } else if (force) {
        total += Number(val);
      }
    }
    return total;
  };
})();
