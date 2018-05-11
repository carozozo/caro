/*
 * Helper
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;
  /*
   * execute if first-argument is function
   * @param {function} fn
   * @param {...*} args function-arguments
   * @returns {*}
   */
  self.executeIfFn = function(fn) {
    var args, i, j, len1, val;
    args = [];
    for (i = j = 0, len1 = arguments.length; j < len1; i = ++j) {
      val = arguments[i];
      if (i === 0) {
        continue;
      }
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
  self.formatMoney = function(arg, type, opt) {
    var aStr, decimal, fStr, float, forceFloat, i, iStr, j, k, len1, prefix, r, ref, s, sepLength, separated, val;
    r = [];
    for (i = j = 0, len1 = arguments.length; j < len1; i = ++j) {
      val = arguments[i];
      if (i === 0) {
        continue;
      }
      if (typeof val === 'object') {
        opt = val;
      }
      if (typeof val === 'string') {
        type = val;
      }
    }
    opt = opt || {};
    float = Math.abs(caro.toInteger(opt.float));
    decimal = typeof opt.decimal === 'string' ? opt.decimal : '.';
    separated = typeof opt.decimal === 'separated' ? opt.separated : ',';
    prefix = typeof opt.prefix === 'string' ? opt.prefix : '';
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
    arg = caro.toNumber(arg);
    arg = caro.toString(arg);
    aStr = arg.split('.');
    iStr = aStr[0];
    fStr = aStr[1] ? aStr[1].slice(0, float) : '';
    if (forceFloat) {
      for (i = k = 1, ref = float - fStr.length; (1 <= ref ? k <= ref : k >= ref); i = 1 <= ref ? ++k : --k) {
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
  /*
   * get function name
   * @param {*} fn
   * @returns {string|*|String}
   */
  self.getFnName = function(fn) {
    var r;
    if (typeof fn !== 'function') {
      return null;
    }
    r = fn.toString();
    r = r.substr('function '.length);
    r = r.substr(0, r.indexOf('('));
    return r;
  };
  /*
   * get function content
   * @param {*} fn
   * @returns {string|*|String}
   */
  self.getFnBody = function(fn) {
    var entire;
    if (typeof fn !== 'function') {
      return null;
    }
    entire = fn.toString();
    return entire.slice(entire.indexOf('{') + 1, entire.lastIndexOf('}'));
  };
  /*
   * get stack-information list
   * @param {number} [start=0] the start-index of list
   * @param {number} [length=null] the list length you want get
   * @returns {array}
   */
  self.getStackList = function(start, length) {
    var aStack, data, end, err, i, info, j, len1, r, reg, reg2, sStack, stack;
    r = [];
    err = new Error();
    stack = err.stack;
    aStack = caro.splitByWrap(stack).slice(2);
    start = start || 0;
    length = length || null;
    if (length) {
      end = start + length - 1;
    } else {
      end = aStack.length - 1;
    }
    for (i = j = 0, len1 = aStack.length; j < len1; i = ++j) {
      sStack = aStack[i];
      if (i < start || i > end) {
        continue;
      }
      data = {};
      reg = /^\s*at\s*/i;
      sStack = sStack.replace(reg, '');
      reg = /(.*)\s+\((.*):(\d*):(\d*)\)/gi;
      reg2 = /()(.*):(\d*):(\d*)/gi;
      info = reg.exec(sStack) || reg2.exec(sStack);
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
  self.setInterval = function(fn, ms, times = 0) {
    var count, interval;
    count = 0;
    return interval = setInterval(function() {
      if (times && count === times) {
        clearInterval(interval);
        return;
      }
      if (fn() === false && !times) {
        clearInterval(interval);
      }
      return count++;
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
  self.random = function(len, opt) {
    var chars, exclude, excludeStr, i, j, len1, lower, num, text, upper;
    text = '';
    chars = [];
    len = parseInt(len) ? parseInt(len) : 1;
    opt = opt || {};
    lower = opt.lower !== false;
    upper = opt.upper !== false;
    num = opt.num !== false;
    // cover to array if string
    exclude = opt.exclude || [];
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
    for (j = 0, len1 = exclude.length; j < len1; j++) {
      excludeStr = exclude[j];
      excludeStr = excludeStr.trim();
      chars = caro.replaceAll(chars, excludeStr, '');
    }
    i = 0;
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
  self.randomInt = function(max, min) {
    var rand;
    max = parseInt(max) || 0;
    min = parseInt(min) || 0;
    if (min > max) {
      min = 0;
    }
    rand = Math.random() * (max - min + 1);
    return Math.floor(rand + min);
  };
  /*
   * random an number
   * @param {number} max
   * @param {number} [min=0]
   * @returns {number}
   */
  self.randomNum = function(max = 0, min = 0) {
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
  self.serializeUrl = function(url, oArgs, coverEmpty = false) {
    var aArgs, count, key, val;
    count = 0;
    aArgs = ['?'];
    for (key in oArgs) {
      val = oArgs[key];
      if (caro.isEmptyVal(val)) {
        if (!coverEmpty) {
          continue;
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
    }
    return url += aArgs.join('');
  };
})();
