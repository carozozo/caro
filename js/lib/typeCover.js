
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
  self.coverToArr = function(arg) {
    if (caro.isArray(arg)) {
      return arg;
    }
    return [arg];
  };

  /**
   * cover to string
   * @param arg
   * @returns {*}
   */
  self.coverToStr = function(arg) {
    return String(arg);
  };

  /**
   * cover to integer
   * @param arg
   * @param {boolean} [force=true] if return 0 when it's NaN
   * @returns {*}
   */
  self.coverToInt = function(arg, force) {
    var int;
    if (force == null) {
      force = true;
    }
    int = parseInt(arg);
    if (!force) {
      return arg;
    }
    return int || 0;
  };

  /**
   * cover to number
   * @param arg
   * @param {boolean} [force=true] if return 0 when it's NaN
   * @returns {*}
   */
  self.coverToNum = function(arg, force) {
    var num;
    if (force == null) {
      force = true;
    }
    num = parseFloat(arg);
    if (!force) {
      return arg;
    }
    return num || 0;
  };

  /**
   * cover to fixed-number
   * @param arg
   * @param {boolean} [force=true] if return 0 when it's NaN
   * @returns {*}
   */
  self.coverToFixed = function(arg, dec, force) {
    var r;
    if (force == null) {
      force = true;
    }
    dec = dec || 0;
    r = caro.coverToStr(arg);
    if (arg % 1) {
      r = r.replace(/5$/, '6');
    }
    r = Number((+r).toFixed(dec));
    if (!force) {
      return arg;
    }
    return r || 0;
  };

  /**
   * cover to object
   * @param arg
   * @param {boolean} [force=true] if return {} when cover-failed, otherwise return original-argument
   * @returns {*}
   */
  self.coverToObj = function(arg, force) {
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
  self.coverToJson = function(arg, opt) {
    var force, json, replacer, space;
    json = '';
    opt = caro.coverToObj(opt);
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
