/*
 * Loop
 * @author Caro.Huang
 */
(function () {
  var self = caro;
  /*
   * for-loop function
   * @param {function} fn for-loop function, will break-loop when return false
   * @param {number} start
   * @param {number} end
   * @param {number} step add the step in each function-called
   */
  self.loop = function (fn, start, end, step) {
    start = start ? parseInt(start, 10) : 0;
    end = end ? parseInt(end, 10) : 0;
    step = step ? parseInt(step, 10) : 1;
    if (start > end) {
      step = -Math.abs(step);
    }

    var i;
    const compare = function () {
      if (start < end) {
        return i <= end;
      }
      return i >= end;
    };

    for (i = start; compare(); i += step) {
      var res = fn(i);
      if (res === false) break;
    }
  };
})();
