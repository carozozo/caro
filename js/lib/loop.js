
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
    var compareFn, isLow;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = 0;
    }
    if (step == null) {
      step = 1;
    }
    isLow = (function() {
      return start < end;
    })();
    compareFn = caro.lte;
    compareFn = isLow ? caro.lte : caro.gte;
    while (compareFn(start, end)) {
      if (fn(start) === false) {
        break;
      }
      start += isLow ? step : -step;
    }
  };
})();
