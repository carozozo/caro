
/**
 * Loop
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * for-loop the arg and callback of key/val
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
    * for-loop the arg and callback of int-key/val
    * @param arg
    * @param {function} cb callback-fn for each key & val
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
