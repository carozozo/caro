
/**
 * TypeCheck
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var checkType, self;
  self = caro;
  checkType = function(args, type) {
    var pass;
    pass = true;
    caro.each(args, function(i, arg) {
      if (typeof arg !== type) {
        pass = false;
      }
    });
    return pass;
  };

  /**
   * check if number, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isNumber = function(arg) {
    return checkType(arguments, 'number');
  };

  /**
   * check if integer, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isInt = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      var int;
      int = parseInt(val);
      return int === val;
    });
  };

  /**
   * check if array, return false is one of them not match
   * @param {...} arg
   * @returns {*}
   */
  self.isArr = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      return Array.isArray(val);
    });
  };

  /**
   * check if null, return false is one of them not match
   * @param {...} arg
   * @returns {*}
   */
  self.isNull = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      return val === null;
    });
  };

  /**
   * check if JSON, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isJson = function(arg) {
    var pass;
    pass = true;
    caro.each(arguments, function(i, arg) {
      var e;
      try {
        JSON.parse(arg);
      } catch (_error) {
        e = _error;
        pass = false;
        return false;
      }
    });
    return pass;
  };

  /**
   * check if argument is object-like JSON, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObjJson = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      var e, r;
      try {
        r = JSON.parse(val);
        return caro.isObj(r);
      } catch (_error) {
        e = _error;
        return false;
      }
    });
  };

  /**
   * check if object, return false is one of them not match
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
   * check if object or array, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObjOrArr = function(arg) {
    if (!checkType(arguments, 'object')) {
      return false;
    }
    return caro.checkIfPassCb(arguments, function(val) {
      return !caro.isNull(val);
    });
  };

  /**
   * check if RegExp, return false is one of them not match
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
   * check if Buffer, return false is one of them not match
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
