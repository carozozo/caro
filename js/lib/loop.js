
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
   * @param {number} start
   * @param {number} end
   * @param {number} step add the step in each function-called
   */
  self.loop = function(fn, start, end, step) {
    var compareFn;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = 0;
    }
    if (step == null) {
      step = 1;
    }
    compareFn = caro.lte;
    if (start > end) {
      compareFn = caro.gte;
      step = -step;
    }
    while (compareFn(start, end)) {
      if (fn(start) === false) {
        break;
      }
      start += step;
    }
  };
})();
