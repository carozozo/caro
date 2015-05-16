
/**
 * Loop
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * for-loop the arg and callback of key/value
   * @param {*} arg
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
      if (cb && cb(key, val) === false) {
        break;
      }
    }
  };

  /**
    * for-loop the arg and callback of int-key/value
    * @param arg
    * @param {function} cb callback-function for each key & value
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
