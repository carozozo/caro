
/*
 * Helper
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /*
   * cover to string
   * @param arg
   * @returns {*}
   */
  self.toString = function(arg) {
    return String(arg);
  };

  /*
   * cover to integer
   * @param arg
   * @returns {*}
   */
  self.toInteger = function(arg) {
    return parseInt(arg);
  };

  /*
   * cover to number
   * @param arg
   * @returns {*}
   */
  self.toNumber = function(arg) {
    return Number(arg);
  };

  /*
   * cover to fixed-number
   * @param arg
   * @param {boolean} [dec=2] decimal-number
   * @returns {*}
   */
  self.toFixedNumber = function(arg, dec) {
    var r;
    if (dec == null) {
      dec = 2;
    }
    r = caro.toString(arg);
    if (arg % 1) {
      r = r.replace(/5$/, '6');
    }
    return Number((+r).toFixed(dec));
  };

  /*
   * @param arg
   * @param {*} [replacer=null] the replace in each element
   * @param {*} [space=0] the space for easy-reading after cover to JSON
   * @returns {*}
   */
  self.toJson = function(arg, replacer, space) {
    return JSON.stringify.apply(null, arguments);
  };
})();
