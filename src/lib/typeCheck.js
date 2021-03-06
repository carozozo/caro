/*
 * TypeCheck
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;
  /*
   * check if arg is boolean | string | number
   * @param {...} arg
   * @returns {boolean}
   */
  self.isBasicVal = function(arg) {
    return Array.from(arguments).every(function(arg) {
      return typeof arg === 'boolean' || typeof arg === 'string' || typeof arg === 'number';
    });
  };
  /*
   * check if value is empty ( {} | [] | null | '' | undefined )
   * @param {...} arg
   * @returns {boolean}
   */
  self.isEmptyVal = function() {
    return Array.from(arguments).every(function(arg) {
      if (arg === null || arg === undefined) {
        return true;
      }
      if (typeof arg === 'number' || typeof arg === 'boolean') {
        return false;
      }
      if (typeof arg === 'object') {
        return Object.keys(arg).length < 1;
      }
      return arg.length < 1;
    });
  };
  /*
   * check if value is true | 'true' | 1
   * @param {...} arg
   * @returns {boolean}
   */
  self.isEasingTrue = function(arg) {
    if (typeof arg === 'string') {
      arg = arg.toLowerCase();
    }
    return arg === true || arg === 'true' || arg === 1;
  };
  /*
   * check if value is false | 'false' | 0
   * @param arg
   * @returns {boolean}
   */
  self.isEasingFalse = function(arg) {
    if (typeof arg === 'string') {
      arg = arg.toLowerCase();
    }
    return arg === false || arg === 'false' || arg === 0;
  };
  /*
   * check if JSON, return false is one of them not match
   * @param {*} arg
   * @returns {boolean}
   */
  self.isJson = function(arg) {
    try {
      JSON.parse(arg);
      return true;
    } catch (error) {
      return false;
    }
  };
  /*
   * check if argument is object-like JSON, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObjJson = function(arg) {
    try {
      var r = JSON.parse(arg);
      return typeof r === 'object';
    } catch (error) {
      return false;
    }
  };
  /*
   * check if string is uppercase
   * @param {...string} str
   * @returns {boolean}
   */
  self.isUpper = function(str) {
    var upp = str.toUpperCase();
    return upp === str;
  };
  /*
   * check if string is lowercase
   * @param {string} str
   * @returns {boolean}
   */
  self.isLower = function(str) {
    var low = str.toLowerCase();
    return low === str;
  };
})();
