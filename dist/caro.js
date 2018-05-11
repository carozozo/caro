/*! caro - v2.0.1- 2018-5-11 */
(function(g) {
  var caro, e, isNode;
  isNode = (typeof global !== "undefined" && global !== null) && (typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null);
  if (isNode) {
    caro = {};
    try {
      caro = require('lodash').runInContext();
    } catch (error) {
      e = error;
    }
    module.exports = caro;
    global.caro = caro;
  } else {
    caro = typeof _ !== "undefined" && _ !== null ? _ : {};
    g.caro = caro;
  }
})(this);

/*
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function () {
  var self = caro;
  /*
   * remove all items in array
   * @param {[]} arr
   * @returns {array}
   */
  self.cleanArr = function (arr) {
    arr.splice(0, arr.length);
    return arr;
  };
  /*
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoDuplicate = function (arr) {
    for (var i = 1; i < arguments.length; i++) {
      var val = arguments[i];
      if (arr.indexOf(val) > -1) continue;
      arr.push(val);
    }
    return arr;
  };
  /*
   * will not push to array if value is empty
   * @param {[]} arr
   * @param {...*} value
   * @returns {array}
   */
  self.pushNoEmptyVal = function (arr) {
    for (var i = 1; i < arguments.length; i++) {
      var val = arguments[i];
      if (caro.isEmptyVal(val)) continue;
      arr.push(val);
    }
    return arr;
  };
  /*
   * remove empty-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullEmptyVal = function (arr) {
    var emptyArr = [];
    var i = 0;
    while (i < arr.length && i >= 0) {
      var val = arr[i];
      if (caro.isEmptyVal(val)) {
        emptyArr.push(val);
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
    return emptyArr;
  };
  /*
   * only keep basic-value in array
   * @param {[]} arr
   * @returns {array}
   */
  self.pullUnBasicVal = function (arr) {
    var basicArr = [];
    var i = 0;
    while (i < arr.length && i >= 0) {
      var val = arr[i];
      if (!caro.isBasicVal(val)) {
        basicArr.push(val);
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
    return basicArr;
  };
  /*
   * pick up item from array by random
   * @param {[]} arr
   * @returns {boolean} [removeFromArr=false]
   */
  self.randomPick = function (arr, removeFromArr) {
    var randIndex = caro.randomInt(arr.length - 1);
    if (!removeFromArr) {
      return arr[randIndex];
    }
    return arr.splice(randIndex, 1)[0];
  };
  /*
   * get sum of value in array
   * @param {[]} arr
   * @param {boolean} [force=false] if cover to number when argument is not number
   * @returns {number}
   */
  self.sumOfArr = function (arr, force) {
    var total = 0;
    for (var i in arr) {
      var val = arr[i];
      if (typeof val === 'number') {
        total += val;
      } else if (force) {
        total += Number(val);
      }
    }
    return total;
  };
})();

/*
 * Helper
 * @author Caro.Huang
 */
(function () {
  var self = caro;
  /*
   * execute if first-argument is function
   * @param {function} fn
   * @param {...*} args function-arguments
   * @returns {*}
   */
  self.executeIfFn = function (fn) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      var val = arguments[i];
      args.push(val);
    }
    if (typeof fn === 'function') {
      return fn.apply(fn, args);
    }
  };
  /*
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
  self.formatMoney = function (arg, type, opt) {
    var r = [];
    for (var i = 1; i < arguments.length; i++) {
      var val = arguments[i];
      if (typeof val === 'object') {
        opt = val;
      }
      if (typeof val === 'string') {
        type = val;
      }
    }
    opt = opt || {};
    var float = Math.abs(caro.toInteger(opt.float));
    var decimal = typeof opt.decimal === 'string' ? opt.decimal : '.';
    var separated = typeof opt.decimal === 'separated' ? opt.separated : ',';
    var prefix = typeof opt.prefix === 'string' ? opt.prefix : '';
    var forceFloat = opt.forceFloat === true;
    var s = arg < 0 ? '-' : '';
    switch (type) {
      case 'sInt':
        float = 0;
        prefix = '$';
        break;
      case 'int':
        float = 0;
    }
    arg = caro.toNumber(arg);
    arg = caro.toString(arg);
    var aStr = arg.split('.');
    var iStr = aStr[0];
    var fStr = aStr[1] ? aStr[1].slice(0, float) : '';
    if (forceFloat) {
      for (var j = 0; j <= float - fStr.length; j++) {
        fStr += '0';
      }
    }
    var sepLength = iStr.length > 3 ? iStr.length % 3 : 0;
    r.push(prefix);
    r.push(s + (sepLength ? iStr.substr(0, sepLength) + separated : ''));
    r.push(iStr.substr(sepLength).replace(/(\d{3})(?=\d)/g, '$1' + separated));
    r.push(fStr ? decimal + fStr : '');
    return r.join('');
  };
  /*
   * get function name
   * @param {*} fn
   * @returns {string|*|String}
   */
  self.getFnName = function (fn) {
    if (typeof fn !== 'function') {
      return null;
    }
    var r = fn.toString();
    r = r.substr('function '.length);
    r = r.substr(0, r.indexOf('('));
    return r;
  };
  /*
   * get function content
   * @param {*} fn
   * @returns {string|*|String}
   */
  self.getFnBody = function (fn) {
    if (typeof fn !== 'function') {
      return null;
    }
    var entire = fn.toString();
    return entire.slice(entire.indexOf('{') + 1, entire.lastIndexOf('}'));
  };
  /*
   * get stack-information list
   * @param {number} [start=0] the start-index of list
   * @param {number} [length=null] the list length you want get
   * @returns {array}
   */
  self.getStackList = function (start, length) {
    var r = [];
    var err = new Error();
    var stack = err.stack;
    var aStack = caro.splitByWrap(stack).slice(2);
    var end = 0;

    start = start || 0;
    length = length || null;

    if (length) {
      end = start + length - 1;
    } else {
      end = aStack.length - 1;
    }
    for (var i = 0; i < aStack.length; i++) {
      var sStack = aStack[i];
      if (i < start || i > end) {
        continue;
      }
      var data = {};
      var reg = /^\s*at\s*/i;
      sStack = sStack.replace(reg, '');
      reg = /(.*)\s+\((.*):(\d*):(\d*)\)/gi;
      var reg2 = /()(.*):(\d*):(\d*)/gi;
      var info = reg.exec(sStack) || reg2.exec(sStack);
      if (!info || info.length !== 5) {
        continue;
      }
      data.stack = info[0];
      data.method = info[1];
      data.path = info[2];
      data.line = info[3];
      data.position = info[4];
      data.file = self.getFileName(data.path);
      r.push(data);
    }
    return r;
  };
  /*
   * easy-use for setInterval
   * @param {function} fn the function you want to exclude
   * @param {integer} ms milliseconds
   * @param {integer} [times=0] the times that function exclude, will never stop when 0
   * @returns {string}
   */
  self.setInterval = function (fn, ms, times) {
    var interval;
    var count = 0;

    times = times ? parseInt(times, 10) : 0;

    return interval = setInterval(function () {
      if (times && count === times) {
        clearInterval(interval);
        return;
      }
      if (fn(++count) === false && !times) {
        clearInterval(interval);
      }
    }, ms);
  };
  /*
   * create random string
   * @param {number} len the length of random
   * @param {object} [opt]
   * @param {boolean} [opt.lower=true] if include lowercase
   * @param {boolean} [opt.upper=true] if include uppercase
   * @param {boolean} [opt.num=true]
   * @param {string} [opt.exclude=[]] the charts that excluded
   * @returns {string}
   */
  self.random = function (len, opt) {
    var text = '';
    var chars = [];

    len = parseInt(len) ? parseInt(len) : 1;
    opt = opt || {};

    var lower = opt.lower !== false;
    var upper = opt.upper !== false;
    var num = opt.num !== false;
    // cover to array if string
    var exclude = opt.exclude || [];
    exclude = typeof exclude === 'string' ? exclude.split(',') : exclude;

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
    for (var j = 0; j < exclude.length; j++) {
      var excludeStr = exclude[j];
      excludeStr = excludeStr.trim();
      chars = caro.replaceAll(chars, excludeStr, '');
    }
    var i = 0;
    while (i < len) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
      i++;
    }
    return text;
  };
  /*
   * random an integer
   * @param {number} max
   * @param {number} [min=0]
   * @returns {number}
   */
  self.randomInt = function (max, min) {
    max = max ? parseInt(max, 10) : 0;
    min = min ? parseInt(min, 10) : 0;
    if (min > max) {
      min = 0;
    }
    var rand = Math.random() * (max - min + 1);
    return Math.floor(rand + min);
  };
  /*
   * random an number
   * @param {number} max
   * @param {number} [min=0]
   * @returns {number}
   */
  self.randomNum = function (max, min) {
    max = max ? parseInt(max, 10) : 0;
    min = min ? parseInt(min, 10) : 0;
    if (min > max) {
      min = 0;
    }
    return Math.random() * (max - min) + min;
  };
  /*
   * serialize object-arguments to url
   * @param {string} url
   * @param {object} oArgs the argument you want to cover (e.g. {a:1, b:2})
   * @param {boolean} [coverEmpty=false] if cover when value is empty
   * @returns {*}
   */
  self.serializeUrl = function (url, oArgs, coverEmpty) {
    var count = 0;
    var aArgs = ['?'];
    for (var key in oArgs) {
      var val = oArgs[key];
      if (caro.isEmptyVal(val)) {
        if (!coverEmpty) continue;
        val = '';
      }
      if (count > 0) {
        aArgs.push('&');
      }
      aArgs.push(key);
      aArgs.push('=');
      aArgs.push(val);
      count++;
    }
    return url + aArgs.join('');
  };
})();

/*
 * Loop
 * @author Caro.Huang
 */
(function () {
  var self = caro;
  /*
   * for-loop function
   * @param {function} fn for-loop function, will break-loop when return false
   * @param {number} start
   * @param {number} end
   * @param {number} step add the step in each function-called
   */
  self.loop = function (fn, start, end, step) {
    start = start ? parseInt(start, 10) : 0;
    end = end ? parseInt(end, 10) : 0;
    step = step ? parseInt(step, 10) : 1;
    if (start > end) {
      step = -Math.abs(step);
    }

    var i;
    const compare = function () {
      if (start < end) {
        return i <= end;
      }
      return i >= end;
    };

    for (i = start; compare(); i += step) {
      var res = fn(i);
      if (res === false) break;
    }
  };
})();

/*
 * Object
 * @author Caro.Huang
 */
(function() {
  var self = caro;
  /*
   * assign elements to from obj2 to obj1 by keys
   * won't replace obj1 value if exists when argument-replace is false
   * @param {object} obj1
   * @param {object} obj2
   * @param {array} keys the keys in obj2 that you want sand to obj1
   * @param {boolean} [replace=true] won't replace obj1 elements if obj1 has same key when false
   */
  self.assignByKeys = function(obj1, obj2, keys, replace) {
    replace = replace !== undefined ? replace : true;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (obj2.hasOwnProperty(key) && (replace || !obj1.hasOwnProperty(key))) {
        obj1[key] = obj2[key];
      }
    }
    return obj1;
  };
  /*
   * catch other object-values to target-object
   * @param {object} obj
   * @return {object}
   */
  self.catching = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      var eachObj = arguments[i];
      if (i === 0) {
        continue;
      }
      for (var eachKey in eachObj) {
        var eachVal = eachObj[eachKey];
        if (obj.hasOwnProperty(eachKey)) {
          obj[eachKey] = eachVal;
        }
      }
    }
    return obj;
  };
  /*
   * group by argument type
   * @param {object|array} arg
   * @return {object}
   */
  self.classify = function(arg) {
    var aStr = [];
    var aBool = [];
    var aArr = [];
    var aNum = [];
    var aObj = [];
    var aFn = [];
    for (var key = 0 in arg) {
      var val = arg[key];
      if (typeof val === 'boolean') {
        aBool.push(val);
      } else if (typeof val === 'string') {
        aStr.push(val);
      } else if (typeof val === 'number') {
        aNum.push(val);
      } else if (Array.isArray(val)) {
        aArr.push(val);
      } else if (typeof val === 'function') {
        aFn.push(val);
      } else if (typeof val === 'object') {
        aObj.push(val);
      }
    }
    return {
      bool: aBool,
      str: aStr,
      num: aNum,
      arr: aArr,
      obj: aObj,
      fn: aFn
    };
  };
  /*
   * get keys that object1 has but object2 not
   * @param {object} obj1
   * @param {object} obj2
   * @return {array}
   */
  self.differentKeys = function(obj1, obj2, reverse) {
    var keysA, keysB;
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);

    if (!reverse) {
      keysA = keys1;
      keysB = keys2;
    } else {
      keysA = keys2;
      keysB = keys1;
    }

    var difArr = [];
    for (var i = 0;  i < keysA.length; i++) {
      var val = keysA[i];
      if (keysB.indexOf(val) < 0) {
        difArr.push(val);
      }
    }
    return difArr;
  };
  /*
   * check if all keys are equal between objects
   * @param {object} obj1
   * @param {object} obj2
   * @return {boolean}
   */
  self.hasEqualKeys = function(obj1, obj2) {
    var size1 = caro.differentKeys(obj1, obj2).length;
    var size2 = caro.differentKeys(obj1, obj2, true).length;
    return size1 === 0 && size2 === 0;
  };
  /*
   * get keys that is same between objects
   * @param {object} obj1
   * @param {object} obj2
   * @return {array}
   */
  self.sameKeys = function(obj1, obj2) {
    var keys = Object.keys(obj1);
    var diffKeys = caro.differentKeys(obj1, obj2);
    var ret = [];
    for (var i = 0;  i < keys.length; i++) {
      var val = keys[i];
      if (diffKeys.indexOf(val) < 0) {
        ret.push(val);
      }
    }
    return ret;
  };
})();

/*
 * Path
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;
  /*
   * get dir-path
   * @param {string} path
   * @return {string}
   */
  self.getDirPath = function(path) {
    var filename;
    filename = caro.getFileName(path);
    return path = caro.replaceLast(path, filename, '');
  };
  /*
   * get file name in path
   * @param {string} path
   * @param {boolean} [getFull] if return file-name by full (with extend-name)
   * @return {string}
   */
  self.getFileName = function(path, getFull) {
    var extendName, lastIndex, lastIndex2;
    getFull = getFull !== false;
    lastIndex = path.lastIndexOf('\\');
    lastIndex2 = path.lastIndexOf('/');
    path = path.slice(lastIndex + 1);
    path = path.slice(lastIndex2 + 1);
    if (getFull) {
      return path;
    }
    extendName = caro.getExtendName(path);
    return path.replace(extendName, '');
  };
  /*
   * get extend name of file
   * @param {string} path
   * @param {boolean} [withDot] if return extend-name with '.'
   * @return {string}
   */
  self.getExtendName = function(path, withDot) {
    var aFileName, extendName, fileName;
    withDot = withDot !== false;
    fileName = caro.getFileName(path);
    aFileName = caro.splitStr(fileName, '.');
    if (aFileName.length === 1) {
      return '';
    }
    extendName = aFileName[aFileName.length - 1];
    if (withDot) {
      extendName = '.' + extendName;
    }
    return extendName;
  };
})();

/*
 * String
 * @author Caro.Huang
 */
(function() {
  var changeCase, self;
  self = caro;
  changeCase = function(str, type, startOrCb = 0, end = null) {
    var cb, i, j, k, len, len1, letter, strArr;
    cb = null;
    if (!end) {
      end = str.length;
    }
    strArr = str.split('');
    if (typeof startOrCb === 'function') {
      cb = startOrCb;
      for (i = j = 0, len = strArr.length; j < len; i = ++j) {
        letter = strArr[i];
        if (cb(letter, i) === true) {
          strArr[i] = letter[type]();
        }
      }
    } else {
      for (i = k = 0, len1 = strArr.length; k < len1; i = ++k) {
        letter = strArr[i];
        if (i >= startOrCb && i < end) {
          strArr[i] = letter[type]();
        }
      }
    }
    return strArr.join('');
  };
  /*
   * add the head to string if not exist
   * @param {string} str
   * @param {string} addStr
   * @returns {*}
   */
  self.addHead = function(str, addStr) {
    if (str.indexOf(addStr) !== 0) {
      str = addStr + str;
    }
    return str;
  };
  /*
   * add the tail to string if not exist
   * @param {string} str
   * @param {string} addStr
   * @returns {*}
   */
  self.addTail = function(str, addStr) {
    var length;
    length = addStr.length;
    if (str.lastIndexOf(addStr) !== str.length - length) {
      str += addStr;
    }
    return str;
  };
  /*
   * replace the <br /> to \n
   * @param {string} str
   * @returns {string}
   */
  self.brToWrap = function(str) {
    var regex;
    regex = /<br\s*[\/]?>/gi;
    return str.replace(regex, '\n');
  };
  /*
   * insert string to another
   * @param {string} str1
   * @param {string} str2 the string want to insert
   * postion {integer} [position]
   */
  self.insertStr = function(str1, str2, position) {
    position = position || str1.length;
    return [str1.slice(0, position), str2, str1.slice(position)].join('');
  };
  self.lowerStr = function(str, startOrCb, end) {
    return changeCase(str, 'toLowerCase', startOrCb, end);
  };
  /*
   * replace all find in string
   * @param {string} str
   * @param {string} find
   * @param {string} replace
   * @returns {*|string}
   */
  self.replaceAll = function(str, find, replace) {
    var regex;
    find = find.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    regex = new RegExp(find, 'g');
    return str.replace(regex, replace);
  };
  /*
   * replace last find in string
   * @param {string} str
   * @param {string} find
   * @param {string} replace
   * @returns {*|string}
   */
  self.replaceLast = function(str, find, replace) {
    var lastIndex, str1, str2;
    lastIndex = str.lastIndexOf(find);
    str1 = str.slice(0, lastIndex);
    str2 = str.slice(lastIndex);
    return str1 + str2.replace(find, replace);
  };
  /*
   * split to array by '\r\n' | '\n' | '\r'
   * @param {string} str
   * @returns {*}
   */
  self.splitByWrap = function(str) {
    var aWrap;
    aWrap = ['\r\n', '\r', '\n'];
    return caro.splitStr(str, aWrap);
  };
  /*
   * split string
   * @param {string} str
   * @param {string|string[]} splitter it should be string-array or string
   * @returns {*}
   */
  self.splitStr = function(str, splitter) {
    var eachSplit, j, k, len, len1, mainSplit;
    if (Array.isArray(str)) {
      return str;
    }
    if (!splitter) {
      return [];
    }
    if (!Array.isArray(splitter)) {
      splitter = [splitter];
    }
    // e.g. splitter=['aa', 'ab', 'c', 'd']; => mainSplit='c'
    mainSplit = splitter[0];
    for (j = 0, len = splitter.length; j < len; j++) {
      eachSplit = splitter[j];
      if (typeof eachSplit !== 'string') {
        continue;
      }
      if (mainSplit.length < 2) {
        break;
      }
      if (mainSplit.length > eachSplit.length) {
        mainSplit = eachSplit;
      }
    }
    if (typeof mainSplit !== 'string') {
      return [];
    }
/* replace all splitter to mainSplitter
 * e.g. string='caro.huang, is handsome'; splitter=['.', ','];
 * => string='caro,huang, is handsome'
 */
    for (k = 0, len1 = splitter.length; k < len1; k++) {
      eachSplit = splitter[k];
      if (typeof eachSplit !== 'string') {
        continue;
      }
      str = caro.replaceAll(str, eachSplit, mainSplit);
    }
    return str.split(mainSplit);
  };
  /*
   * check string if ("true" | not-empty) / ("false" | empty) and covert to boolean
   * @param {string} str
   * @returns {boolean}
   */
  self.strToBool = function(str) {
    str = str.toLowerCase();
    // return false when string='false' or '', otherwise return true
    return str !== '' && str !== 'false';
  };
  /*
   * uppercase string
   * @param {string} str
   * @param {number|function} [startOrCb] the start-index you want to uppercase
   * or callback-function, will uppercase when callback return true
   * @param {number} [end] the end-index you want to uppercase
   * @returns {*}
   */
  self.upperStr = function(str, startOrCb, end) {
    return changeCase(str, 'toUpperCase', startOrCb, end);
  };
  /*
   * replace \r\n | \r | \n to <br/>
   * @param {string} str
   * @returns {string}
   */
  self.wrapToBr = function(str) {
    str = str.replace(/\r\n/g, '<br />');
    str = str.replace(/\n/g, '<br />');
    str = str.replace(/\r/g, '<br />');
    return str;
  };
})();

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
      if (arg === null || arg === void 0) {
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
   * check if integer
   * @param {*} arg
   * @returns {boolean}
   */
  self.isInteger = function(arg) {
    var int;
    if (typeof arg !== 'number') {
      return false;
    }
    int = parseInt(arg);
    return int === arg;
  };
  /*
   * check if JSON, return false is one of them not match
   * @param {*} arg
   * @returns {boolean}
   */
  self.isJson = function(arg) {
    var e;
    try {
      JSON.parse(arg);
    } catch (error) {
      e = error;
      return false;
    }
    return true;
  };
  /*
   * check if argument is object-like JSON, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObjJson = function(arg) {
    var e, r;
    try {
      r = JSON.parse(arg);
      return typeof r === 'object';
    } catch (error) {
      e = error;
    }
    return false;
  };
  /*
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
  /*
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
  self.toFixedNumber = function(arg, dec = 2) {
    var r;
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
