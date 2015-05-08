
/**
 * TypeCheck
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  'use strict';
  var checkType, self;
  self = caro;
  checkType = function(args, type) {
    var pass;
    pass = true;
    caro.eachObj(args, function(i, arg) {
      if (typeof arg !== type) {
        pass = false;
      }
    });
    return pass;
  };

  /**
   * @param {...} arg
   * @returns {boolean}
   */
  self.isBool = function(arg) {
    return checkType(arguments, 'boolean');
  };

  /**
   * @param {...} arg
   * @returns {boolean}
   */
  self.isStr = function(arg) {
    return checkType(arguments, 'string');
  };

  /**
   * @param {...} arg
   * @returns {boolean}
   */
  self.isFn = function(arg) {
    return checkType(arguments, 'function');
  };

  /**
   * @param {...} arg
   * @returns {boolean}
   */
  self.isNum = function(arg) {
    return checkType(arguments, 'number');
  };

  /**
   * @param {...} arg
   * @returns {boolean}
   */
  self.isInt = function(arg) {
    if (!checkType.apply(null, arguments)) {
      return false;
    }
    return caro.checkIfPassCb(arguments, function(val) {
      var int;
      int = parseInt(val);
      return int === val;
    });
  };

  /**
   * @param {...} arg
   * @returns {*}
   */
  self.isArr = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      return Array.isArray(val);
    });
  };

  /**
   * @param {...} arg
   * @returns {*}
   */
  self.isNull = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      return val === null;
    });
  };

  /**
   * @param {...} arg
   * @returns {*}
   */
  self.isUndef = function(arg) {
    return checkType(arguments, 'undefined');
  };

  /**
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObj = function(arg) {
    if (!checkType(arguments, 'object')) {
      return false;
    }
    return caro.checkIfPassCb(arguments, function(val) {
      return !caro.isNull(val) && !caro.isArr(val);
    });
  };

  /**
   * @param {...} arg
   * @returns {boolean}
   */
  self.isRegExp = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      return val instanceof RegExp;
    });
  };

  /* -------------------- Node.js only -------------------- */
  if (!caro.isNode) {
    return;
  }

  /**
   * @param {...} arg
   * @returns {Boolean}
   */
  self.isBuf = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      var e;
      try {
        return Buffer.isBuffer(val);
      } catch (_error) {
        e = _error;
        return false;
      }
    });
  };
})();
