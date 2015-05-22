
/**
 * Loop
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * for-loop function
   * @param {function} fn for-loop function, will break-loop when function return false
   * @param {integer} start
   * @param {integer} end
   * @param {integer} step add the step in each function-called
   * @param {end} start
   */
  self.loop = function(fn, start, end, step) {
    var realEnd, realStart, step2;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = 0;
    }
    if (step == null) {
      step = 1;
    }
    if (start < end) {
      realStart = start;
      realEnd = end;
      step2 = step;
    } else {
      realStart = end;
      realEnd = start;
      step2 = -step;
    }
    while (realStart <= realEnd) {
      if (fn(start) === false) {
        break;
      }
      start += step2;
      realStart += step;
    }
  };

  /**
   * for-loop the arg and callback of key/value
   * @param {array|object} arg
   * @param {function} cb callback-function for each key & value
   */
  self.each = function(arg, cb) {
    var isArr, key, val;
    isArr = Array.isArray(arg);
    for (key in arg) {
      val = arg[key];
      if (isArr) {
        key = parseInt(key);
      }
      if (cb(key, val) === false) {
        break;
      }
    }
  };

  /**
   * for-loop the arg and callback of int-key/value
   * @param {array|object} arg
   * @param {function} cb callback-function for each key & value
   */
  self.eachArgs = function(arg, cb) {
    var i;
    for (i in arg) {
      i = parseInt(i);
      if (cb(i, arg[i]) === false) {
        break;
      }
    }
  };
})();
