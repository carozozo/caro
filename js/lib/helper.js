
/*
 * Helper
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /*
   * check all argument in array by check-function,
   * get false if check-function return false
   * @param {[]} array
   * @param {function} checkFn
   * @param {boolean} [needAllPass=true] when returnIfAllPass=true, return true when all check-result are true
   * @returns {boolean}
   */
  self.checkIfPass = function(arr, checkFn, needAllPass) {
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

  /*
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

  /*
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

  /*
   * get function content
   * @param {*} fn
   * @returns {string|*|String}
   */
  self.getFnBody = function(fn) {
    var entire;
    if (!caro.isFunction(fn)) {
      return null;
    }
    entire = fn.toString();
    return entire.slice(entire.indexOf('{') + 1, entire.lastIndexOf('}'));
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
    opt = opt || {};
    float = Math.abs(caro.toInteger(opt.float));
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
    arg = caro.toNumber(arg);
    arg = caro.toString(arg);
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

  /*
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

  /*
   * get stack-information list
   * @param {number} [start=0] the start-index of list
   * @param {number} [length=null] the list length you want get
   * @returns {array}
   */
  self.getStackList = function(start, length) {
    var aStack, end, err, r, stack;
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
    caro.forEach(aStack, function(sStack, i) {
      var data, info, reg, reg2;
      if (i < start || i > end) {
        return;
      }
      data = {};
      reg = /^\s*at\s*/i;
      sStack = sStack.replace(reg, '');
      reg = /(.*)\s+\((.*):(\d*):(\d*)\)/gi;
      reg2 = /()(.*):(\d*):(\d*)/gi;
      info = reg.exec(sStack) || reg2.exec(sStack);
      if (!info || info.length !== 5) {
        return;
      }
      data.stack = info[0];
      data.method = info[1];
      data.path = info[2];
      data.line = info[3];
      data.position = info[4];
      data.file = self.getFileName(data.path);
      return r.push(data);
    });
    return r;
  };
})();
