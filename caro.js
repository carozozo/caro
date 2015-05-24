/*! caro - v0.6.20 - 2015-05-24 */
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
   * @param {boolean} [force=false] if cover to number when argument is not number
   * @returns {number}
   */
  self.sumOfArr = function(arr, force) {
    if (force == null) {
      force = false;
    }
    return caro.reduce(arr, function(total, n) {
      if (!caro.isNumber(n) && !force) {
        return total;
      }
      return total + Number(n);
    });
  };

  /**
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoDuplicate = function(arr, val) {
    var args;
    args = caro.drop(arguments);
    caro.forEach(args, function(val) {
      if (arr.indexOf(val) > -1) {
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
  self.pushNoEmptyVal = function(arr, val) {
    var args;
    args = caro.drop(arguments);
    caro.forEach(args, function(arg) {
      if (caro.isEmptyVal(arg)) {
        return;
      }
      arr.push(arg);
    });
    return arr;
  };

  /**
   * remove empty-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullEmptyVal = function(arr) {
    return caro.remove(arr, function(n) {
      return !caro.isEmptyVal(n);
    });
  };

  /**
   * only keep basic-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullUnBasicVal = function(arr) {
    return caro.remove(arr, function(n) {
      return caro.isBasicVal(n);
    });
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
    caro.forEach(arr, function(arg) {
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
    args = caro.drop(arguments);
    if (caro.isFunction(fn)) {
      return fn.apply(fn, args);
    }
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
    caro.forEach(arguments, function(arg, i) {
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
   * @param {number} start
   * @param {number} end
   * @param {number} step add the step in each function-called
   */
  self.loop = function(fn, start, end, step) {
    var compareFn;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = 0;
    }
    if (step == null) {
      step = 1;
    }
    compareFn = caro.lte;
    if (start > end) {
      compareFn = caro.gte;
      step = -step;
    }
    while (compareFn(start, end)) {
      if (fn(start) === false) {
        break;
      }
      start += step;
    }
  };
})();


/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

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
    caro.forEach(r, function(val, key) {
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
    caro.forEach(obj, function(val) {
      r.push(val);
    });
    return r;
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
    caro.forEach(exclude, function(excludeStr) {
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
    caro.forEach(aStr, function(val, i) {
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
      caro.forEach(splitter, function(eachSplit, j) {
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
    caro.forEach(splitter, function(eachSplit) {
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
    caro.forEach(oArgs, function(val, key) {
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
      if (caro.isNumber(arg) || caro.isBoolean(arg)) {
        return false;
      }
      return caro.size(arg) < 1;
    });
  };

  /**
   * check if value is true | 'true' | 1
   * @param {...} arg
   * @returns {boolean}
   */
  self.isEasingTrue = function(arg) {
    if (caro.isString(arg)) {
      arg = arg.toLowerCase();
    }
    return arg === true || arg === 'true' || arg === 1;
  };

  /**
   * check if value is false | 'false' | 0
   * @param arg
   * @returns {boolean}
   */
  self.isEasingFalse = function(arg) {
    if (caro.isString(arg)) {
      arg = arg.toLowerCase();
    }
    return arg === false || arg === 'false' || arg === 0;
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

  /**
   * check if string is uppercase
   * @param {...string} str
   * @returns {boolean}
   */
  self.isUpper = function(str) {
    var upp;
    upp = str.toUpperCase();
    if (upp !== str) {
      return false;
    }
    return true;
  };

  /**
   * check if string is lowercase
   * @param {string} str
   * @returns {boolean}
   */
  self.isLower = function(str) {
    var low;
    low = str.toLowerCase();
    if (low !== str) {
      return false;
    }
    return true;
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
