/*
 * Helper
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self = caro;
  /*
   * cover to string
   * @param arg
   * @returns {*}
   */
  self.toStr = function(arg) {
    return String(arg);
  };
  /*
   * cover to integer
   * @param arg
   * @returns {*}
   */
  self.toInt = function(arg) {
    return parseInt(arg);
  };
  /*
   * cover to number
   * @param arg
   * @returns {*}
   */
  self.toNum = function(arg) {
    return Number(arg);
  };
  /*
   * cover to fixed-number
   * @param arg
   * @param {boolean} [dec=2] decimal-number
   * @returns {*}
   */
  self.toFixedNum = function(arg, dec) {
    dec = (dec !== undefined) ? dec : 2;
    var r = caro.toStr(arg);
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
