
/**
 * Helper
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  'use strict';
  var self;
  self = caro;

  /**
   * check if arg is boolean | string | number
   * @param {...} arg
   * @returns {boolean}
   */
  self.isBasicVal = function(arg) {
    return caro.checkIfPassCb(arguments, function(arg) {
      return !(!caro.isBool(arg) && !caro.isStr(arg) && !caro.isNum(arg));
    });
  };

  /**
   * check if value is empty ( {} | [] | null | '' | undefined )
   * @param {...} arg
   * @returns {boolean}
   */
  self.isEmptyVal = function(arg) {
    return caro.checkIfPassCb(arguments, function(arg) {
      if (caro.isObj(arg)) {
        return caro.getObjLength(arg) < 1;
      }
      if (caro.isArr(arg)) {
        return arg.length < 1;
      }
      return !arg && arg !== 0 && arg !== false;
    });
  };

  /**
   * check if value is true | 'true' | 1
   * @param {...} arg
   * @returns {boolean}
   */
  self.isTrue = function(arg) {
    return caro.checkIfPassCb(arguments, function(arg) {
      if (caro.isStr(arg)) {
        arg = arg.toLowerCase();
      }
      return arg === true || arg === 'true' || arg === 1;
    });
  };

  /**
   * check if value is false | 'false' | 0
   * @param arg
   * @returns {boolean}
   */
  self.isFalse = function(arg) {
    return caro.checkIfPassCb(arguments, function(arg) {
      if (caro.isStr(arg)) {
        arg = arg.toLowerCase();
      }
      return arg === false || arg === 'false' || arg === 0;
    });
  };

  /**
   * check all argument in array by check-function, get false if check-function return false
   * @param {[]} array
   * @param {function} checkFn
   * @param {boolean} [needAllPass=true] when returnIfAllPass=true, return true when all check-result are true
   * @returns {boolean}
   */
  self.checkIfPassCb = function(arr, checkFn, needAllPass) {
    if (needAllPass == null) {
      needAllPass = true;
    }
    if (!Array.isArray(arr) && typeof arr !== 'object' || arr === null || !caro.isFn(checkFn)) {
      return false;
    }
    caro.each(arr, function(i, arg) {
      var result;
      result = caro.executeIfFn(checkFn, arg);
      if (needAllPass && result === false || !needAllPass && result === true) {
        needAllPass = !needAllPass;
        return false;
      }
      return true;
    });
    return needAllPass;
  };

  /**
   * execute if first-argument is function
   * @param {function} fn
   * @param {...*} args function-arguments
   * @returns {*}
   */
  self.executeIfFn = function(fn, args) {
    var otherArgs, r;
    otherArgs = [];
    r = void 0;
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0 && caro.isFn(arg)) {
        fn = arg;
        return;
      }
      otherArgs.push(arg);
    });
    if (fn) {
      r = fn.apply(fn, otherArgs);
    }
    return r;
  };

  /**
   * get function name
   * @param {*} fn
   * @returns {string|*|String}
   */
  self.getFnName = function(fn) {
    var r;
    if (!caro.isFn(fn)) {
      return null;
    }
    r = fn.toString();
    r = r.substr('function '.length);
    r = r.substr(0, r.indexOf('('));
    return r;
  };

  /**
   * get arguments, and return as array
   * @param args should be arguments (object with numeric-key)
   * @returns {Array}
   */
  self.getArgumentsAsArr = function(args) {
    var r;
    r = [];
    caro.each(args, function(i, val) {
      r.push(val);
    });
    return r;
  };

  /**
   * format to money type like 1,000.00
   * @param {string|number} arg
   * @param {string} [type=int|sInt] format-type, if type is set, the opt will not work
   * @param {object} [opt]
   * @param {number} [opt.float=0]
   * @param [opt.decimal=.]
   * @param [opt.separated=,]
   * @param [opt.prefix]
   * @returns {string}
   */
  self.formatMoney = function(arg, type, opt) {
    var aStr, decimal, fStr, float, forceFloat, i, iStr, j, prefix, r, ref, s, sepLength, separated;
    r = [];
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0) {
        return;
      }
      if (caro.isObj(arg)) {
        return opt = arg;
      }
      if (caro.isStr(arg)) {
        return type = arg;
      }
    });
    opt = caro.coverToObj(opt);
    float = Math.abs(caro.coverToInt(opt.float));
    decimal = caro.isStr(opt.decimal) ? opt.decimal : '.';
    separated = caro.isStr(opt.separated) ? opt.separated : ',';
    prefix = caro.isStr(opt.prefix) ? opt.prefix : '';
    forceFloat = opt.forceFloat === true;
    s = arg < 0 ? '-' : '';
    switch (type) {
      case 'sInt':
        float = 0;
        prefix = '$';
        break;
      case 'int':
        float = 0;
    }
    arg = caro.coverToFloat(arg);
    arg = caro.coverToStr(arg);
    aStr = caro.splitStr(arg, '.');
    iStr = aStr[0];
    fStr = aStr[1] ? aStr[1].slice(0, float) : '';
    if (forceFloat) {
      for (i = j = 1, ref = float - fStr.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        fStr += '0';
      }
    }
    sepLength = iStr.length > 3 ? iStr.length % 3 : 0;
    r.push(prefix);
    r.push(s + (sepLength ? iStr.substr(0, sepLength) + separated : ''));
    r.push(iStr.substr(sepLength).replace(/(\d{3})(?=\d)/g, '$1' + separated));
    r.push(fStr ? decimal + fStr : '');
    return r.join('');
  };

  /**
   * cover to array
   * @param arg
   * @returns {*}
   */
  self.coverToArr = function(arg) {
    if (caro.isArr(arg)) {
      return arg;
    }
    return [arg];
  };

  /**
   * cover to string, will return '' if force!=false
   * @param arg
   * @param {boolean} [force=true] if return string
   * @returns {*}
   */
  self.coverToStr = function(arg, force) {
    if (force == null) {
      force = true;
    }
    if (caro.isStr(arg)) {
      return arg;
    }
    if (arg === void 0) {
      if (force) {
        return 'undefined';
      }
      return '';
    }
    if (arg === null) {
      if (force) {
        return 'null';
      }
      return '';
    }
    if (caro.isObj(arg)) {
      if (force) {
        caro.coverFnToStrInObj(arg, false);
        arg = caro.coverToJson(arg);
        arg = caro.replaceAll(arg, '\\r', '\r');
        arg = caro.replaceAll(arg, '\\n', '\n');
        return arg;
      }
      return '';
    }
    if (caro.isFn(arg.toString)) {
      return arg.toString();
    }
    if (force) {
      return '';
    }
    return arg;
  };

  /**
   * cover to int, will return 0 if force!=false
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
    if (caro.isEmptyVal(int) && !force) {
      return arg;
    }
    return int || 0;
  };

  /**
   * cover to float, will return 0 if force!=false
   * @param arg
   * @param {boolean} [force=true] if return 0 when it's NaN
   * @returns {*}
   */
  self.coverToFloat = function(arg, force) {
    var float;
    if (force == null) {
      force = true;
    }
    float = parseFloat(arg);
    if (caro.isEmptyVal(float) && !force) {
      return arg;
    }
    return float || 0;
  };

  /**
   * cover to num,, will return 0 if force not false
   * @param arg
   * @param {boolean} [force=true] if return 0 when it's NaN
   * @returns {*}
   */
  self.coverToNum = function(arg, force) {
    var int;
    if (force == null) {
      force = true;
    }
    int = parseFloat(arg);
    if (caro.isEmptyVal(int) && !force) {
      return arg;
    }
    return int || 0;
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
   * cover to object, will return {} if force!=false
   * @param arg
   * @param {boolean} [force=true] if return object
   * @returns {*}
   */
  self.coverToObj = function(arg, force) {
    var r;
    if (force == null) {
      force = true;
    }
    if (caro.isObj(arg)) {
      return arg;
    }
    if (caro.isArr(arg)) {
      r = {};
      caro.each(arg, function(i, val) {
        return r[i] = val;
      });
      return r;
    }
    if (caro.isJson(arg)) {
      r = JSON.parse(arg);
      if (caro.isObj(r)) {
        return r;
      }
    }
    if (force) {
      return {};
    }
    return arg;
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
    force = true;
    replacer = null;
    space = 4;
    json = '';
    if (opt) {
      force = opt.force !== false;
      replacer = opt.replacer || replacer;
      space = opt.space !== void 0 ? opt.space : space;
    }
    if (space) {
      json = JSON.stringify(arg, replacer, space);
    } else {
      json = JSON.stringify(arg, replacer);
    }
    if (caro.isJson(json) || !force) {
      return json;
    }
    return '';
  };
})();
