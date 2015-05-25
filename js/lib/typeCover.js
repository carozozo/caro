
/**
 * Helper
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * cover to array
   * @param arg
   * @returns {*}
   */
  self.toArray = function(arg) {
    if (caro.isArray(arg)) {
      return arg;
    }
    if (caro.isNumber(arg)) {
      return [arg];
    }
    return Array(arg);
  };

  /**
   * cover to string
   * @param arg
   * @returns {*}
   */
  self.toString = function(arg) {
    return String(arg);
  };

  /**
   * cover to integer
   * @param arg
   * @returns {*}
   */
  self.toInteger = function(arg) {
    return parseInt(arg);
  };

  /**
   * cover to number
   * @param arg
   * @returns {*}
   */
  self.toNumber = function(arg) {
    return Number(arg);
  };

  /**
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

  /**
   * cover to object
   * @param arg
   * @param {boolean} [force=true] if return {} when cover-failed, otherwise return original-argument
   * @returns {*}
   */
  self.toObject = function(arg, force) {
    var e, r;
    if (force == null) {
      force = true;
    }
    if (caro.isObject(arg)) {
      return arg;
    }
    if (caro.isArray(arg)) {
      r = {};
      caro.forEach(arg, function(val, i) {
        return r[i] = val;
      });
      return r;
    }
    try {
      r = JSON.parse(arg);
      if (caro.isObject(r)) {
        return r;
      }
    } catch (_error) {
      e = _error;
    }
    if (!force) {
      return arg;
    }
    return {};
  };

  /**
   * @param arg
   * @param {object} [opt]
   * @param {boolean} [opt.force=true] if force cover to JSON
   * @param {function=null} [opt.replacer] the replace-function in each element
   * @param {space=4} [opt.space] the space for easy-reading after cover to JSON
   * @returns {*}
   */
  self.toJson = function(arg, opt) {
    var force, json, replacer, space;
    json = '';
    opt = caro.toObject(opt);
    force = opt.force !== false;
    replacer = opt.replacer || null;
    space = opt.space != null ? opt.space : 4;
    if (space) {
      json = JSON.stringify(arg, replacer, space);
    } else {
      json = JSON.stringify(arg, replacer);
    }
    if (caro.isJson(json)) {
      return json;
    }
    if (!force) {
      return arg;
    }
    return '';
  };
})();
