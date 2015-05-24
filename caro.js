/*! caro - v0.6.4 - 2015-05-24 */
(function(g) {
  var caro, isNode;
  caro = typeof _ !== "undefined" && _ !== null ? _ : {};
  g.caro = caro;
  isNode = (function() {
    return (typeof global !== "undefined" && global !== null) && (typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null);
  })();
  if (isNode) {
    caro = require('lodash');
    module.exports = caro;
    global.caro = caro;
  }
  return caro.isNode = isNode;
})(this);


/**
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * get sum of value in array
   * @param {[]} arr
   * @param {boolean} [force=false]
   * @returns {number}
   */
  self.sumOfArr = function(arr, force) {
    var sum;
    if (force == null) {
      force = false;
    }
    sum = 0;
    caro.each(arr, function(i, val) {
      if (caro.isNumber(val)) {
        sum += val;
      }
      if (force) {
        sum += parseFloat(val) || 0;
      }
    });
    return sum;
  };

  /**
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoDup = function(arr, val) {
    caro.eachArgs(arguments, function(i, val) {
      if (i === 0 || arr.indexOf(val) > -1) {
        return;
      }
      arr.push(val);
    });
    return arr;
  };

  /**
   * will not push to array if value is empty
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoEmpty = function(arr, val) {
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0 || caro.isEmptyVal(arg)) {
        return;
      }
      arr.push(arg);
    });
    return arr;
  };

  /**
   * check if empty-value in array
   * @param {...[]} arr
   * @returns {boolean}
   */
  self.hasEmptyInArr = function(arr) {
    var checkVal, hasEmpty;
    hasEmpty = false;
    checkVal = function(arr) {
      caro.each(arr, function(i, val) {
        if (caro.isEmptyVal(val)) {
          hasEmpty = true;
          return false;
        }
      });
    };
    caro.each(arguments, function(i, arr) {
      if (hasEmpty) {
        return false;
      }
      checkVal(arr);
    });
    return hasEmpty;
  };

  /**
   * remove empty-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.removeEmptyInArr = function(arr) {
    var r;
    r = [];
    caro.each(arr, function(i, val) {
      if (!caro.isEmptyVal(val)) {
        r.push(val);
      }
    });
    return arr = r;
  };

  /**
   * only keep basic-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.basicArr = function(arr) {
    var r;
    r = [];
    caro.each(arr, function(i, val) {
      if (caro.isBasicVal(val)) {
        r.push(val);
      }
    });
    return arr = r;
  };
})();


/**
 * Console
 * @author Caro.Huang
 */
(function() {
  var colors, combineMsg, doConsole, self;
  self = caro;
  colors = caro.isNode ? require('colors') : null;
  combineMsg = function(msg, variable) {
    msg = caro.cloneObj(msg);
    variable = caro.cloneObj(variable);
    msg = caro.coverToStr(msg);
    if (caro.isUndefined(variable)) {
      variable = '';
    }
    variable = caro.coverToStr(variable);
    msg += variable;
    return msg;
  };
  doConsole = function(args, color) {
    var msg, variable;
    if (caro.getObjLength(args) <= 0) {
      return console.log();
    }
    msg = args[0];
    variable = args[1];
    msg = combineMsg(msg, variable);
    if (colors) {
      msg = msg[color];
    }
    console.log(msg);
  };

  /**
   * print different console.log color in odd/even line
   * @param msg
   * @param [variable]
   */
  self.log = function(msg, variable) {
    if (this.isOdd) {
      doConsole(arguments, 'green');
      this.isOdd = false;
      return;
    }
    doConsole(arguments, 'cyan');
    this.isOdd = true;
  };

  /**
   * print different console.log color in odd/even line
   * @param msg
   * @param [variable]
   */
  self.log2 = function(msg, variable) {
    if (this.isOdd) {
      doConsole(arguments, 'blue');
      this.isOdd = false;
      return;
    }
    doConsole(arguments, 'yellow');
    this.isOdd = true;
  };

  /**
   * print different console.log color in odd/even line
   * @param msg
   * @param [variable]
   */
  self.log3 = function(msg, variable) {
    if (this.isOdd) {
      doConsole(arguments, 'magenta');
      this.isOdd = false;
      return;
    }
    doConsole(arguments, 'red');
    this.isOdd = true;
  };
})();


/**
 * DateTime
 * @author Caro.Huang
 */
(function() {
  var coverFormatType, coverLocale, defLocale, getDateTimeObj, nMoment, oShorthandFormat, returnDateTimeStr, self;
  nMoment = caro.isNode ? require('moment') : typeof moment !== "undefined" && moment !== null ? moment : null;
  if (nMoment == null) {
    return;
  }
  self = caro;
  defLocale = 'en';
  oShorthandFormat = {};
  getDateTimeObj = function(dateTime) {
    if (dateTime) {
      return nMoment(dateTime);
    }
    return nMoment();
  };
  coverLocale = function(locale) {
    if (caro.isString(locale)) {
      return locale;
    } else {
      return defLocale;
    }
  };
  coverFormatType = function(shorthandFormat, locale) {
    var oLocale;
    locale = coverLocale(locale);
    oLocale = oShorthandFormat[locale] || oShorthandFormat[defLocale] || {};
    return oLocale[shorthandFormat] || shorthandFormat;
  };
  returnDateTimeStr = function(oDateTime, formatType) {
    return caro.formatDateTime(oDateTime, formatType);
  };

  /**
   * set default locale
   * @param {string} locale
   */
  self.setDefaultLocale = function(locale) {
    locale = coverLocale(locale);
    defLocale = locale;
  };

  /**
   * set default locale
   * @return {string}
   */
  self.getDefaultLocale = function() {
    return defLocale;
  };

  /**
   * @param {string} shorthandFormat the shorthand format type
   * @param {string} formatType the format type
   * @param {string} [locale] you can set different format type by locale
   */
  self.addDateTimeShortFormat = function(shorthandFormat, formatType, locale) {
    locale = coverLocale(locale);
    oShorthandFormat[locale] = oShorthandFormat[locale] || {};
    oShorthandFormat[locale][shorthandFormat] = formatType;
  };

  /**
   * @param {?string|object} dateTime
   * @param {string} [formatType] format-type
   * @param {string} [locale] localize date
   * @returns {string}
   */
  self.formatDateTime = function(dateTime, formatType, locale) {
    var oDateTime, returnVal;
    locale = coverLocale(locale);
    if (locale) {
      nMoment.locale(locale);
    }
    formatType = coverFormatType(formatType, locale);
    oDateTime = getDateTimeObj(dateTime);
    returnVal = oDateTime.format(formatType);
    nMoment.locale(defLocale);
    return returnVal;
  };

  /**
   * get now-time
   * @param {string} [fmt] format-type
   * @param {string} [locale] localize date
   * @returns {string}
   */
  self.formatNow = function(fmt, locale) {
    return caro.formatDateTime(null, fmt, locale);
  };

  /**
   * add date-time unit
   * please refer {@link http://momentjs.com/docs/#/manipulating/add/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {number|string} amount
   * @param {string} unit time-unit
   * @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
   * @returns {*}
   */
  self.addDateTime = function(dateTime, amount, unit, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    if (caro.isObject(amount)) {
      oDateTime.add(amount);
    } else {
      oDateTime.add(amount, unit);
    }
    return returnDateTimeStr(oDateTime, formatType);
  };

  /**
   * subtract date-time unit
   * please refer {@link http://momentjs.com/docs/#/manipulating/subtract/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {number|string} amount
   * @param {string} unit time-unit
   * @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
   * @returns {*}
   */
  self.subtractDateTime = function(dateTime, amount, unit, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    if (caro.isObject(amount)) {
      oDateTime.subtract(amount);
    } else {
      oDateTime.subtract(amount, unit);
    }
    return returnDateTimeStr(oDateTime, formatType);
  };

  /**
   * get start of the unit
   * e.g. startOf('2013-01-01 23:00:00','day') = 2013-01-01 00:00:00
   * please refer {@link http://momentjs.com/docs/#/manipulating/start-of/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {string} unit time-unit
   * @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
   * @returns {moment.Moment|*}
   */
  self.startOfDateTime = function(dateTime, unit, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime.startOf(unit);
    return returnDateTimeStr(oDateTime, formatType);
  };

  /**
   * get end of the unit
   * please refer {@link http://momentjs.com/docs/#/manipulating/end-of/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {string} unit time-unit
   * @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
   * @returns {moment.Moment|*}
   */
  self.endOfDateTime = function(dateTime, unit, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime.endOf(unit);
    return returnDateTimeStr(oDateTime, formatType);
  };

  /**
   * get date-time with UTC
   * please refer {@link http://momentjs.com/docs/#/parsing/utc/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
   * @returns {*}
   */
  self.getUtc = function(dateTime, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime.utc();
    return returnDateTimeStr(oDateTime, formatType);
  };

  /**
   * compare date-time if before target
   * please refer {@link http://momentjs.com/docs/#/query/is-before/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {?string|object} targetDateTime the string with date-time format, or moment-object
   * @param {string} [unit] time-unit
   * @returns {*}
   */
  self.isBeforeDateTime = function(dateTime, targetDateTime, unit) {
    var oDateTime, oDateTime2;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime2 = getDateTimeObj(targetDateTime);
    return oDateTime.isBefore(oDateTime2, unit);
  };

  /**
   * check date-time if after target
   * please refer {@link http://momentjs.com/docs/#/query/is-after/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {?string|object} targetDateTime the string with date-time format, or moment-object
   * @param {string} [unit] time-unit
   * @returns {*}
   */
  self.isAfterDateTime = function(dateTime, targetDateTime, unit) {
    var oDateTime, oDateTime2;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime2 = getDateTimeObj(targetDateTime);
    return oDateTime.isAfter(oDateTime2, unit);
  };

  /**
   * check date-time if same as target
   * please refer {@link http://momentjs.com/docs/#/query/is-same/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {?string|object} targetDateTime the string with date-time format, or moment-object
   * @param {string} [unit] time-unit
   * @returns {*}
   */
  self.isSameDateTime = function(dateTime, targetDateTime, unit) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    return oDateTime.isSame(targetDateTime, unit);
  };

  /**
   * check if a moment is between two other moments
   * please refer {@link http://momentjs.com/docs/#/query/is-between/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @param {?string|object} dateTime1 the string with date-time format, or moment-object
   * @param {?string|object} dateTime2 the string with date-time format, or moment-object
   * @param {string} [unit] time-unit
   * @returns {*}
   */
  self.isBetweenDateTime = function(dateTime, dateTime1, dateTime2, unit) {
    var oDateTime, oDateTime1, oDateTime2;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime1 = getDateTimeObj(dateTime1);
    oDateTime2 = getDateTimeObj(dateTime2);
    return oDateTime.isBetween(oDateTime1, oDateTime2, unit);
  };

  /**
   * validate is date-time format
   * please refer {@link http://momentjs.com/docs/#/utilities/invalid/}
   * @param {?string|object} dateTime the string with date-time format, or moment-object
   * @returns {*}
   */
  self.isValidDateTime = function(dateTime) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    return oDateTime.isValid();
  };

  /**
   * get different between 2 date-time
   * please refer {@link http://momentjs.com/docs/#/displaying/difference/}
   * @param {?string|object} dateTime1 the string with date-time format, or moment-object
   * @param {?string|object} dateTime2 the string with date-time format, or moment-object
   * @param {string} [unit] time-unit
   * @param {boolean} [withFloat=false]
   * @returns {number|*}
   */
  self.getDateTimeDiff = function(dateTime1, dateTime2, unit, withFloat) {
    var oDateTime1, oDateTime2;
    if (withFloat == null) {
      withFloat = false;
    }
    oDateTime1 = getDateTimeObj(dateTime1);
    oDateTime2 = getDateTimeObj(dateTime2);
    return oDateTime1.diff(oDateTime2, unit, withFloat);
  };
})();


/**
 * Helper
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * check if arg is boolean | string | number
   * @param {...} arg
   * @returns {boolean}
   */
  self.isBasicVal = function(arg) {
    return caro.checkIfPassCb(arguments, function(arg) {
      return !(!caro.isBoolean(arg) && !caro.isString(arg) && !caro.isNumber(arg));
    });
  };

  /**
   * check if value is empty ( {} | [] | null | '' | undefined )
   * @param {...} arg
   * @returns {boolean}
   */
  self.isEmptyVal = function(arg) {
    return caro.checkIfPassCb(arguments, function(arg) {
      if (caro.isObject(arg)) {
        return caro.getObjLength(arg) < 1;
      }
      if (caro.isArray(arg)) {
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
      if (caro.isString(arg)) {
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
      if (caro.isString(arg)) {
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
    if (!Array.isArray(arr) && typeof arr !== 'object' || !caro.isFunction(checkFn)) {
      return false;
    }
    caro.each(arr, function(i, arg) {
      var result;
      result = checkFn(arg);
      if (needAllPass && result === false || !needAllPass && result === true) {
        needAllPass = !needAllPass;
        return false;
      }
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
      if (i < 1) {
        return;
      }
      otherArgs.push(arg);
    });
    if (caro.isFunction(fn)) {
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
    if (!caro.isFunction(fn)) {
      return null;
    }
    r = fn.toString();
    r = r.substr('function '.length);
    r = r.substr(0, r.indexOf('('));
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
      if (caro.isObject(arg)) {
        return opt = arg;
      }
      if (caro.isString(arg)) {
        return type = arg;
      }
    });
    opt = caro.coverToObj(opt);
    float = Math.abs(caro.coverToInt(opt.float));
    decimal = caro.isString(opt.decimal) ? opt.decimal : '.';
    separated = caro.isString(opt.separated) ? opt.separated : ',';
    prefix = caro.isString(opt.prefix) ? opt.prefix : '';
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
    arg = caro.coverToNum(arg);
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
      caro.each(arg, function(i, val) {
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


/**
 * Log
 * @author Caro.Huang
 */
(function() {
  var extendName, logPath, normalizeLogPath, self, showErr, traceMode;
  if (!caro.isNode) {
    return;
  }
  self = caro;
  logPath = '';
  extendName = '.log';
  traceMode = false;
  showErr = function(e) {
    if (traceMode) {
      return console.error(e);
    }
  };
  normalizeLogPath = function(path) {
    path = caro.normalizePath(logPath, path);
    return caro.addTail(path, extendName);
  };

  /**
   * set trace-mode, will console.error when got exception
   * @returns {boolean}
   */
  self.setLogTrace = function(bool) {
    return traceMode = bool === true;
  };

  /**
   * set the path that log placed
   * @param {string} path
   * @returns {boolean}
   */
  self.setLogRoot = function(path) {
    if (path == null) {
      path = logPath;
    }
    path = caro.coverToStr(path);
    path = caro.normalizePath(path);
    if (caro.createDir(path)) {
      logPath = path;
      return true;
    }
    return false;
  };

  /**
   * get the path that log placed
   * @returns {string}
   */
  self.getLogRoot = function() {
    return logPath;
  };

  /**
   * set the extend-name of log file
   * @param {string} name=.log
   * @returns {boolean}
   */
  self.setLogExtendName = function(name) {
    if (name == null) {
      name = extendName;
    }
    name = caro.coverToStr(name);
    if (!name) {
      return false;
    }
    name = caro.addHead(name, '.');
    extendName = name;
    return true;
  };

  /**
   * get the extend-name of log file
   * @return {string}
   */
  self.getLogExtendName = function() {
    return extendName;
  };

  /**
   * read log-file ,and create it if not exists
   * @param path
   * @returns {*}
   */
  self.readLog = function(path) {
    var e;
    path = normalizeLogPath(path);
    try {
      if (!caro.fsExists(path)) {
        return null;
      }
      return caro.readFileCaro(path);
    } catch (_error) {
      e = _error;
      showErr(e);
      return null;
    }
  };

  /**
   * write log-file with data
   * create empty-file if data is empty
   * @param {string} path
   * @param {*} [data='']
   * @returns {boolean}
   */
  self.writeLog = function(path, data) {
    var e, maxSize, size;
    if (data == null) {
      data = '';
    }
    path = normalizeLogPath(path);
    try {
      size = caro.getFsSize(path);
      maxSize = Math.pow(10, 6);
      if (size > maxSize) {
        console.error('caro.log: ', path + ' size ' + size + ' is more thane 1 MB');
        return false;
      }
      data = caro.coverToStr(data);
      return caro.writeFileCaro(path, data);
    } catch (_error) {
      e = _error;
      showErr(e);
    }
    return false;
  };

  /**
   * update log data
   * @param {string} path
   * @param {*} [data='']
   * @param {object} [opt={}]
   * @param {boolean} [opt.ifWrap=true] add wrap with add-data
   * @param {boolean} [opt.prepend=false] add data in front of origin-data
   * @returns {boolean}
   */
  self.updateLog = function(path, data, opt) {
    var ifWrap, originData, prepend, wrap;
    if (opt == null) {
      opt = {};
    }
    originData = caro.readLog(path);
    wrap = '\r\n';
    ifWrap = true;
    prepend = false;
    if (opt) {
      ifWrap = opt.ifWrap !== false;
      prepend = opt.prepend === true;
    }
    originData = originData || '';
    data = caro.coverToStr(data);
    if (originData && ifWrap) {
      if (prepend) {
        data += wrap;
      } else {
        originData += wrap;
      }
    }
    if (prepend) {
      data += originData;
    } else {
      data = originData + data;
    }
    return caro.writeLog(path, data);
  };

  /**
   * update log data
   * @param {string} path
   * @param {*} [data='']
   * @param {object} [opt={}]
   * @param {boolean} [opt.dateFirst=true] if set the date in first-filename
   * @param {boolean} [opt.ifWrap=true] add wrap with add-data
   * @param {boolean} [opt.prepend=false] add data in front of origin-data
   * @returns {boolean}
   */
  self.updateLogWithDayFileName = function(path, data, opt) {
    var dateFirst, today;
    if (opt == null) {
      opt = {};
    }
    today = caro.formatNow('YYYYMMDD');
    dateFirst = opt.dateFirst !== false ? true : false;
    if (dateFirst) {
      path = caro.addTail(today, '_' + path);
    } else {
      path = caro.addTail(path, '_' + today);
    }
    return caro.updateLog(path, data, opt);
  };

  /**
   * create trace.log for convenience
   * @param {*} [data='']
   * @param {object} [opt={}]
   * @param {boolean} [opt.ifWrap=true] add wrap with add-data
   * @param {boolean} [opt.prepend=false] add data in front of origin-data
   * @returns {boolean}
   */
  self.traceLog = function(data, opt) {
    var path;
    path = 'trace';
    return caro.updateLog(path, data, opt);
  };
})();


/**
 * Loop
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * for-loop function
   * @param {function} fn for-loop function, will break-loop when function return false
   * @param {integer} start
   * @param {integer} end
   * @param {integer} step add the step in each function-called
   * @param {end} start
   */
  self.loop = function(fn, start, end, step) {
    var realEnd, realStart, step2;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = 0;
    }
    if (step == null) {
      step = 1;
    }
    if (start < end) {
      realStart = start;
      realEnd = end;
      step2 = step;
    } else {
      realStart = end;
      realEnd = start;
      step2 = -step;
    }
    while (realStart <= realEnd) {
      if (fn(start) === false) {
        break;
      }
      start += step2;
      realStart += step;
    }
  };

  /**
   * for-loop the arg and callback of key/value
   * @param {array|object} arg
   * @param {function} cb callback-function for each key & value
   */
  self.each = function(arg, cb) {
    var isArray, key, val;
    isArray = Array.isArray(arg);
    for (key in arg) {
      val = arg[key];
      if (isArray) {
        key = parseInt(key);
      }
      if (cb(key, val) === false) {
        break;
      }
    }
  };

  /**
   * for-loop the arg and callback of int-key/value
   * @param {array|object} arg
   * @param {function} cb callback-function for each key & value
   */
  self.eachArgs = function(arg, cb) {
    var i;
    for (i in arg) {
      i = parseInt(i);
      if (cb(i, arg[i]) === false) {
        break;
      }
    }
  };
})();


/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var changeStrValByObjKey, pushValToObjOrArr, self;
  self = caro;

  /**
   * change object string-value by key, will change-all if aKey is empty
   * support-type: upper/lower/upperFirst
   * @param {object} obj
   * @param {string} type=upper|lower|upperFirst support-type
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  changeStrValByObjKey = function(obj, type, keys) {
    var aType, r;
    aType = ['upper', 'lower', 'upperFirst', 'trim'];
    r = obj;
    if (!caro.isObject(obj) || aType.indexOf(type) < 0) {
      return obj;
    }
    keys = keys || caro.getKeysInObj(r);
    keys = caro.splitStr(keys, ',');
    caro.each(keys, function(i, key) {
      var opt, val;
      if (!caro.keysInObj(r, key)) {
        return;
      }
      val = r[key];
      if (!caro.isString(val)) {
        return;
      }
      opt = {
        force: false
      };
      switch (type) {
        case 'upper':
          r[key] = caro.upperStr(val, opt);
          break;
        case 'lower':
          r[key] = caro.lowerStr(val, opt);
          break;
        case 'upperFirst':
          r[key] = caro.upperFirst(val, false);
          break;
        case 'trim':
          r[key] = caro.trimStr(val, false);
      }
    });
    return r;
  };
  pushValToObjOrArr = function(arg, key, val) {
    if (caro.isArray(arg)) {
      arg.push(val);
    } else if (caro.isObject(arg)) {
      arg[key] = val;
    }
  };

  /**
   * get object-length
   * @param {object} obj
   * @returns {Number}
   */
  self.getObjLength = function(obj) {
    return Object.keys(obj).length;
  };

  /**
   * extend object, similar jQuery.extend
   * @param {boolean} [deep=false] extend-recursive
   * @param {object...|array...} arg
   * @returns {*}
   */
  self.extendObj = function(deep, arg) {
    var r;
    if (deep == null) {
      deep = false;
    }
    r = null;
    if (!caro.isBoolean(deep)) {
      r = deep;
      deep = false;
    }
    caro.eachArgs(arguments, function(key, arg) {
      var results, val;
      if (!r && caro.isObject(arg)) {
        r = arg;
        return true;
      }
      results = [];
      for (key in arg) {
        val = arg[key];
        if (caro.isObject(val) && caro.keysInObj(r, key) && !deep) {
          continue;
        }
        results.push(pushValToObjOrArr(r, key, val));
      }
      return results;
    });
    return r;
  };

  /**
   * clone object
   * @param {object} obj
   * @param {boolean} [deep=false] if clone all under object
   * @returns {*}
   */
  self.cloneObj = function(arg, deep) {
    var r;
    if (deep == null) {
      deep = false;
    }
    if (!caro.isObject(arg)) {
      return arg;
    }
    r = caro.isArray(arg) ? [] : {};
    caro.extendObj(r, arg);
    if (deep) {
      caro.each(r, function(key, val) {
        return r[key] = caro.cloneObj(val);
      });
    }
    return r;
  };

  /**
   * replace key in object
   * @param {object} obj
   * @param {function({})} cb callback-function that include key, and return new-key if you want to replace
   * @returns {*}
   */
  self.replaceObjKey = function(obj, cb) {
    var r;
    r = obj;
    caro.each(r, function(key, val) {
      var newKey;
      newKey = caro.executeIfFn(cb, key);
      if (newKey) {
        r[newKey] = val;
        delete r[key];
      }
    });
    return r;
  };

  /**
   * replace value in object
   * @param {object} obj
   * @param {function({})} cb callback-function that include value, and return new-value if you want to replace
   * @param {boolean} [deep=false] if deep-replace when element is object
   * @returns {*}
   */
  self.replaceObjVal = function(obj, cb, deep) {
    var coverObjVal, r;
    if (deep == null) {
      deep = false;
    }
    r = obj;
    coverObjVal = function(o) {
      caro.each(o, function(key, val) {
        var newVal;
        if (caro.isObject(val) && deep) {
          coverObjVal(val);
          return;
        }
        newVal = caro.executeIfFn(cb, val);
        if (newVal !== void 0) {
          o[key] = newVal;
        }
      });
    };
    coverObjVal(r);
    return r;
  };

  /**
   * upper-case value in object by key, will replace-all if key is empty
   * @param {object} obj
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  self.upperCaseByObjKey = function(obj, keys) {
    return changeStrValByObjKey(obj, 'upper', keys);
  };

  /**
   * lower-case value in object by key, will replace-all if key is empty
   * @param {object} obj
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  self.lowerCaseByObjKey = function(obj, keys) {
    return changeStrValByObjKey(obj, 'lower', keys);
  };

  /**
   * upper-case the first char of value in object by key, will replace-all if key is empty
   * @param {object} obj
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  self.upperFirstByObjKey = function(obj, keys) {
    return changeStrValByObjKey(obj, 'upperFirst', keys);
  };

  /**
   * trim value in object by key, will replace-all if key is empty
   * @param {object} obj
   * @param {string[]|string} [keys] the assign-keys
   * @returns {*}
   */
  self.trimByObjKey = function(obj, keys) {
    return changeStrValByObjKey(obj, 'trim', keys);
  };

  /**
   * check if key exists in object, will return false when key not exist, no matter that other-keys are
   * @param {object} obj
   * @param {string[]|string} keys the keys that want to validate
   * @returns {boolean}
   */
  self.keysInObj = function(obj, keys) {
    var pass;
    if (!caro.isObject(obj)) {
      return false;
    }
    pass = true;
    keys = caro.splitStr(keys, ',');
    caro.each(keys, function(i, key) {
      if (!obj.hasOwnProperty(key)) {
        pass = false;
        return false;
      }
    });
    return pass;
  };

  /**
   * get keys in object, and get all if levelLimit = 0
   * @param {object} obj
   * @param {number} [levelLimit=1] the level of object you want to get keys
   * @returns {Array}
   */
  self.getKeysInObj = function(obj, levelLimit) {
    var getKey, levelCount, r;
    r = [];
    if (!caro.isObject(obj)) {
      return r;
    }
    levelLimit = caro.coverToInt(levelLimit, false) > -1 ? levelLimit : 1;
    levelCount = 0;
    getKey = function(obj) {
      levelCount++;
      caro.each(obj, function(key, val) {
        if (levelLimit > 0 && levelCount > levelLimit) {
          return;
        }
        r.push(key);
        if (caro.isObject(val)) {
          getKey(val);
        }
      });
      levelCount--;
    };
    getKey(obj);
    return r;
  };

  /**
   * covert to string if element is function in object
   * @param {object} obj
   * @param {boolean} [replaceWrap=true] if replace \r\n
   */
  self.coverFnToStrInObj = function(obj, replaceWrap) {
    var r;
    if (replaceWrap == null) {
      replaceWrap = true;
    }
    r = obj;
    caro.each(r, function(key, val) {
      var fnStr;
      if (caro.isPlainObject(val)) {
        caro.coverFnToStrInObj(val);
      } else if (caro.isFunction(val)) {
        fnStr = val.toString();
        if (replaceWrap) {
          fnStr = fnStr.replace(/([\r]\s*|[\n]\s*)/g, '');
        } else {
          fnStr = fnStr.replace(/[\r]\s*/g, '\r ');
          fnStr = fnStr.replace(/[\n]\s*/g, '\n ');
        }
        r[key] = fnStr;
      }
    });
    return r;
  };

  /**
   * cover object to array
   * @param {...object} obj
   * @returns {Array}
   */
  self.objToArr = function(obj) {
    var r;
    r = [];
    caro.each(obj, function(i, val) {
      r.push(val);
    });
    return r;
  };
})();


/**
 * Path
 * @author Caro.Huang
 */
(function() {
  var absolutePath, nPath, self;
  if (!caro.isNode) {
    return;
  }
  self = caro;
  nPath = require('path');
  absolutePath = typeof __dirname !== 'undefined' ? __dirname : '';

  /**
   * set absolute root path
   * @param path
   * @returns {String}
   */
  self.setAbsolutePath = function(path) {
    if (!caro.isString(path)) {
      return false;
    }
    return absolutePath = caro.normalizePath(path);
  };

  /**
   * get absolute root path
   * @returns {String}
   */
  self.getAbsolutePath = function() {
    return absolutePath;
  };

  /**
     * @param {...} path
     * @returns {string|*}
   */
  self.normalizePath = function(path) {
    var args;
    args = caro.objToArr(arguments);
    return nPath.join.apply(nPath, args);
  };

  /**
   * check if path contain absolute root path
   * @param {*...} path
   * @returns {boolean}
   */
  self.isFullPath = function(path) {
    var pass;
    pass = true;
    caro.each(arguments, function(i, val) {
      val = caro.normalizePath(val);
      if (val.indexOf(absolutePath) !== 0) {
        pass = false;
        return false;
      }
    });
    return pass;
  };

  /**
   * get dir-path of path
   * @param {string} path
   * @returns {string}
   */
  self.getDirPath = function(path) {
    return nPath.dirname(path);
  };

  /**
   * get file name from path
   * @param {string} path
   * @param {boolean} [getFull=true] return basename if true
   * @returns {*}
   */
  self.getFileName = function(path, getFull) {
    var extendName;
    if (getFull == null) {
      getFull = true;
    }
    if (!getFull) {
      extendName = caro.getExtendName(path);
      return nPath.basename(path, extendName);
    }
    return nPath.basename(path);
  };

  /**
   * EX
   * getExtendName('aa/bb/cc.txt') => get '.txt'
   * @param path
   * @param {boolean} [withDot=true]
   * @returns {*}
   */
  self.getExtendName = function(path, withDot) {
    var extendName;
    if (withDot == null) {
      withDot = true;
    }
    extendName = nPath.extname(path);
    if (!withDot) {
      extendName = extendName.replace('.', '');
    }
    return extendName;
  };

  /**
   * auto add server root-path if not exist
   * @param {...} path
   * @returns {*|string}
   */
  self.coverToFullPath = function(path) {
    path = caro.normalizePath.apply(this, arguments);
    if (!caro.isFullPath(path)) {
      path = nPath.join(absolutePath, path);
    }
    return path;
  };
})();


/**
 * String
 * @author Caro.Huang
 */
(function() {
  var changeCase, self;
  self = caro;
  changeCase = function(str, type, opt) {
    var aType, end, force, r, start;
    r = [];
    aType = ['toUpperCase', 'toLowerCase'];
    opt = caro.coverToObj(opt);
    start = caro.coverToInt(opt.start);
    end = caro.coverToInt(opt.end) > 0 ? caro.coverToInt(opt.end) : null;
    force = opt.force !== false;
    if (!caro.isString(str)) {
      if (!force) {
        return str;
      }
      str = '';
    }
    type = aType.indexOf(type) > -1 ? type : aType[0];
    r.push(str.slice(0, start));
    if (end) {
      r.push(str.slice(start, end)[type]());
      r.push(str.slice(end));
    } else {
      r.push(str.slice(start)[type]());
    }
    return r.join('');
  };

  /**
   * check if string is uppercase
   * @param {...string} str
   * @returns {boolean}
   */
  self.isUpper = function(str) {
    var pass;
    pass = true;
    caro.checkIfPassCb(arguments, function(str) {
      var upp;
      upp = str.toUpperCase();
      if (upp !== str) {
        return pass = false;
      }
    });
    return pass;
  };

  /**
   * check if string is lowercase
   * @param {string} str
   * @returns {boolean}
   */
  self.isLower = function(str) {
    var pass;
    pass = true;
    caro.checkIfPassCb(arguments, function(str) {
      var low;
      low = str.toLowerCase();
      if (low !== str) {
        return pass = false;
      }
    });
    return pass;
  };

  /**
   * create random string
   * @param {number} len the length of random
   * @param {object} [opt]
   * @param {boolean} [opt.lower=true] if include lowercase
   * @param {boolean} [opt.upper=true] if include uppercase
   * @param {boolean} [opt.num=true]
   * @param {string} [opt.exclude=[]] the charts that excluded
   * @returns {string}
   */
  self.random = function(len, opt) {
    var chars, exclude, i, lower, num, text, upper;
    text = '';
    chars = [];
    len = parseInt(len) ? parseInt(len) : 1;
    opt = caro.coverToObj(opt);
    lower = opt.lower !== false;
    upper = opt.upper !== false;
    num = opt.num !== false;
    exclude = opt.exclude || [];
    exclude = caro.splitStr(exclude, ',');
    if (lower) {
      chars.push('abcdefghijklmnopqrstuvwxyz');
    }
    if (upper) {
      chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (num) {
      chars.push('0123456789');
    }
    chars = chars.join('');
    caro.each(exclude, function(i, excludeStr) {
      chars = caro.replaceAll(chars, excludeStr, '');
    });
    i = 0;
    while (i < len) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
      i++;
    }
    return text;
  };

  /**
   * check string if ("true" | not-empty) / ("false" | empty) and covert to boolean
   * @param {string} str
   * @returns {boolean}
   */
  self.strToBool = function(str) {
    str = str.toLowerCase();
    return str !== '' && str !== 'false';
  };

  /**
   * check if charts has in head of string
   * @param {string} str
   * @param {string} str2
   * @returns {*}
   */
  self.hasHead = function(str, str2) {
    if (!caro.isString(str)) {
      return false;
    }
    return str.indexOf(str2) === 0;
  };

  /**
   * add the head to string if not exist
   * @param {string} str
   * @param {string} addStr
   * @returns {*}
   */
  self.addHead = function(str, addStr) {
    if (!caro.isString(str)) {
      return str;
    }
    if (!caro.hasHead(str, addStr)) {
      str = addStr + str;
    }
    return str;
  };

  /**
   * check if charts has in tail of string
   * @param {string} str
   * @param {string} str2
   * @returns {*}
   */
  self.hasTail = function(str, str2) {
    var index, strLength, strLength2;
    if (!caro.isString(str)) {
      return false;
    }
    index = str.lastIndexOf(str2);
    strLength = str.length;
    strLength2 = str2.length;
    return strLength > strLength2 && index === strLength - strLength2;
  };

  /**
   * add the tail to string if not exist
   * @param {string} str
   * @param {string} addStr
   * @returns {*}
   */
  self.addTail = function(str, addStr) {
    if (!caro.isString(str)) {
      return str;
    }
    if (!caro.hasTail(str, addStr)) {
      str += addStr;
    }
    return str;
  };

  /**
   * replace \r\n | \r | \n to <br/>
   * @param {string} str
   * @returns {string}
   */
  self.wrapToBr = function(str) {
    if (!caro.isString(str)) {
      return str;
    }
    str = str.replace(/\r\n/g, '<br />');
    str = str.replace(/\n/g, '<br />');
    str = str.replace(/\r/g, '<br />');
    return str;
  };

  /**
   * replace the <br /> to \n
   * @param {string} str
   * @returns {string}
   */
  self.brToWrap = function(str) {
    var regex;
    regex = /<br\s*[\/]?>/gi;
    return str.replace(regex, '\n');
  };

  /**
   * split to array by '\r\n' | '\n' | '\r'
   * @param {string} str
   * @returns {*}
   */
  self.splitByWrap = function(str) {
    var aWrap;
    if (!caro.isString(str)) {
      return str;
    }
    aWrap = ['\r\n', '\r', '\n'];
    return caro.splitStr(str, aWrap);
  };

  /**
   * escape RegExp
   * @param {string} str
   * @returns {*|string}
   */
  self.escapeRegExp = function(str) {
    if (!caro.isString(str)) {
      return str;
    }
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  };

  /**
   * replace all find in string
   * @param {string} str
   * @param {string} find
   * @param {string} replace
   * @returns {*|string}
   */
  self.replaceAll = function(str, find, replace) {
    var isRegExp, regex;
    isRegExp = caro.isRegExp(find);
    if (!caro.isString(str, find, replace) && !isRegExp) {
      return str;
    }
    regex = find;
    if (!isRegExp) {
      find = caro.escapeRegExp(find);
      regex = new RegExp(find, 'g');
    }
    return str.replace(regex, replace);
  };

  /**
   * e.g. ThisIsWord -> This Is Word
   * @param {string} str
   * @returns {string}
   */
  self.insertBlankBefUpper = function(str) {
    var aStr, r;
    if (!caro.isString(str)) {
      return str;
    }
    r = [];
    aStr = str.split('');
    caro.each(aStr, function(i, val) {
      if (i > 0 && caro.isUpper(val)) {
        r.push(' ');
      }
      return r.push(val);
    });
    return r.join('');
  };

  /**
   * uppercase string
   * @param {string} str
   * @param {object} [opt]
   * @param {number} [opt.start] the start-index you want to uppercase
   * @param {number} [opt.end] the end-index you want to uppercase
   * @param {boolean} [opt.force] if force cover to string
   * @returns {*}
   */
  self.upperStr = function(str, opt) {
    return changeCase(str, 'upperCase', opt);
  };

  /**
   * uppercase first-chat in string
   * @param {string} str
   * @param {boolean} [force] if force cover to string
   * @returns {*}
   */
  self.upperFirst = function(str, force) {
    var opt;
    opt = {
      start: 0,
      end: 1,
      force: force !== false
    };
    return caro.upperStr(str, opt);
  };

  /**
   * lowercase string
   * @param {string} str
   * @param {object} [opt]
   * @param {number} [opt.start] the start-index you want to lowercase
   * @param {number} [opt.end] the end-index you want to lowercase
   * @param {boolean} [opt.force] if force cover to string
   * @returns {*}
   */
  self.lowerStr = function(str, opt) {
    return changeCase(str, 'toLowerCase', opt);
  };

  /**
   * trim string, you can set what you want you trim
   * @param {string} str
   * @param {string} [target=' '] the chars you want to trim
   * @param {boolean} [side] the side of string, true is head, false is tail, otherwise is booth
   * @returns {}
   */
  self.trimStr = function(str, char, side) {
    var regExpFirst, regExpLast;
    char = caro.isString(char) ? char : ' ';
    char = caro.escapeRegExp(char);
    if (side === true || side !== false) {
      regExpFirst = new RegExp('^' + char + '+');
      str = str.replace(regExpFirst, '');
    }
    if (side === false || side !== true) {
      regExpLast = new RegExp(char + '+$');
      str = str.replace(regExpLast, '');
    }
    return str;
  };

  /**
   * split string
   * @param {string} str
   * @param {string|string[]} splitter it should be string-array or string
   * @returns {*}
   */
  self.splitStr = function(str, splitter) {
    var mainSplit;
    if (caro.isArray(str)) {
      return str;
    }
    if (!splitter) {
      return [];
    }
    splitter = caro.coverToArr(splitter);
    mainSplit = splitter[0];
    if (mainSplit.length > 1) {
      caro.each(splitter, function(j, eachSplit) {
        if (!caro.isString(eachSplit)) {
          return;
        }
        if (mainSplit < 2) {
          return;
        }
        if (mainSplit.length >= eachSplit.length) {
          mainSplit = eachSplit;
        }
      });
    }
    if (!caro.isString(mainSplit)) {
      return str;
    }
    caro.each(splitter, function(i, eachSplit) {
      if (!caro.isString(eachSplit)) {
        return;
      }
      str = caro.replaceAll(str, eachSplit, mainSplit);
    });
    return str.split(mainSplit);
  };

  /**
   * serialize object-arguments to url
   * @param {string} url
   * @param {object} oArgs the argument you want to cover (e.g. {a:1, b:2})
   * @param {boolean} [coverEmpty=false] if cover when value is empty
   * @returns {*}
   */
  self.serializeUrl = function(url, oArgs, coverEmpty) {
    var aArgs, count;
    if (coverEmpty == null) {
      coverEmpty = false;
    }
    count = 0;
    aArgs = ['?'];
    caro.each(oArgs, function(key, val) {
      if (caro.isEmptyVal(val)) {
        if (!coverEmpty) {
          return;
        }
        val = '';
      }
      if (count > 0) {
        aArgs.push('&');
      }
      aArgs.push(key);
      aArgs.push('=');
      aArgs.push(val);
      count++;
    });
    return url += aArgs.join('');
  };
})();


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
   * check if integer
   * @param {*} arg
   * @returns {boolean}
   */
  self.isInteger = function(arg) {
    var int;
    if (!caro.isNumber(arg)) {
      return false;
    }
    int = parseInt(arg);
    return int === arg;
  };

  /**
   * check if JSON, return false is one of them not match
   * @param {*} arg
   * @returns {boolean}
   */
  self.isJson = function(arg) {
    var e;
    try {
      JSON.parse(arg);
    } catch (_error) {
      e = _error;
      return false;
    }
    return true;
  };

  /**
   * check if argument is object-like JSON, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObjJson = function(arg) {
    var e, r;
    try {
      r = JSON.parse(arg);
      return caro.isObject(r);
    } catch (_error) {
      e = _error;
    }
    return false;
  };
})();
