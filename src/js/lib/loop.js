
/*
 * Loop
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /*
   * for-loop function
   * @param {function} fn for-loop function, will break-loop when return false
   * @param {number} start
   * @param {number} end
   * @param {number} step add the step in each function-called
   */
  self.loop = function(fn, start, end, step) {
    var i, j, ref, ref1, ref2, res;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = 0;
    }
    if (step == null) {
      step = 1;
    }
    if (start > end) {
      step = -step;
    }
    for (i = j = ref = start, ref1 = end, ref2 = step; ref2 > 0 ? j <= ref1 : j >= ref1; i = j += ref2) {
      res = fn(i);
      if (res === false) {
        break;
      }
      if (res === true) {
        continue;
      }
    }
  };
})();
