
/**
 * Loop
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * like jQuery.each function
   * @param {*} arg
   * @param {function} cb callback-fn for each key & val
   */
  self.each = function(arg, cb) {
    var key, val;
    for (key in arg) {
      val = arg[key];
      if (cb && cb(key, val) === false) {
        break;
      }
    }
  };

  /**
    * like caor.eachObj, but key is integer
    * @param args should be arguments (obj with numeric-key)
    * @param cb
   */
  self.eachArgs = function(arg, cb) {
    var i;
    for (i in arg) {
      i = parseInt(i);
      if (cb && cb(i, arg[i]) === false) {
        break;
      }
    }
  };
})();
