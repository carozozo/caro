
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
    start = null;
    end = null;
    force = true;
    if (opt) {
      start = !caro.isEmptyVal(opt.start) ? opt.start : start;
      end = opt.end || end;
      force = opt.force !== false;
    }
    if (!caro.isStr(str)) {
      if (!force) {
        return str;
      }
      str = '';
    }
    type = aType.indexOf(type) > -1 ? type : aType[0];
    start = caro.coverToInt(start);
    end = caro.coverToInt(end);
    r.push(str.slice(0, start));
    if (end) {
      r.push(str.slice(start, end)[type]());
      r.push(str.slice(end));
    } else {
      r.push(str.slice(start)[type]());
    }
    return r.join('');
  };
  self.isUpper = function(str) {
    var upp;
    str = caro.coverToStr(str, true);
    upp = str.toUpperCase();
    return upp === str;
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
    lower = true;
    upper = true;
    num = true;
    exclude = [];
    len = parseInt(len) ? parseInt(len) : 1;
    if (opt) {
      lower = opt.lower !== false;
      upper = opt.upper !== false;
      num = opt.num !== false;
      exclude = opt.exclude || exclude;
    }
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
    exclude = caro.splitStr(exclude, ',');
    caro.eachObj(exclude, function(i, excludeStr) {
      chars = caro.replaceAll(String(chars), excludeStr, '');
    });
    i = 0;
    while (i < len) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
      i++;
    }
    return text;
  };

  /**
   * check str if ("true" | not-empty) / ("false" | empty) and covert to boolean
   * @param {string} str
   * @returns {boolean}
   */
  self.toBool = function(str) {
    if (!caro.isStr(str)) {
      return false;
    }
    if (!str) {
      return false;
    }
    str = str.toLowerCase();
    return str !== 'false';
  };

  /**
   * check if charts has in head of string
   * @param str
   * @param str2
   * @returns {*}
   */
  self.hasHead = function(str, str2) {
    var index;
    if (!caro.isStr(str)) {
      return false;
    }
    if (!caro.isStr(str2)) {
      return false;
    }
    index = str.indexOf(str2);
    return index === 0;
  };

  /**
   * add the head to string if not exist
   * @param {string} str
   * @param {string} addStr
   * @returns {*}
   */
  self.addHead = function(str, addStr) {
    if (!caro.hasHead(str, addStr)) {
      str = addStr + str;
    }
    return str;
  };

  /**
   * check if charts has in tail of string
   * @param str
   * @param str2
   * @returns {*}
   */
  self.hasTail = function(str, str2) {
    var index, strLength, strLength2;
    if (!caro.isStr(str)) {
      return false;
    }
    if (!caro.isStr(str2)) {
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
    if (!caro.hasTail(str, addStr)) {
      str += addStr;
    }
    return str;
  };

  /**
   * replace \r\n | \r | \n to <br/>
   * @param {string} str
   * @returns {*|string}
   */
  self.wrapToBr = function(str) {
    if (!caro.isStr(str)) {
      return str;
    }
    str = str.replace(/\r\n/g, '<br />');
    str = str.replace(/\n/g, '<br />');
    str = str.replace(/\r/g, '<br />');
    return str;
  };

  /**
   * replace the <br/> to \n
   * @param {string} str
   * @returns {*|string}
   */
  self.brToWrap = function(str) {
    var regex;
    if (!caro.isStr(str)) {
      return str;
    }
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
    if (!caro.isStr(str)) {
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
    if (!caro.isStr(str)) {
      return str;
    }
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  };

  /**
   * TODO
   * replace all find in str
   * @param {string} str
   * @param {string} find
   * @param {string} replace
   * @returns {*|string}
   */
  self.replaceAll = function(str, find, replace) {
    var regex;
    if (!caro.isStr(str) || !caro.isStr(find) || !caro.isStr(replace)) {
      return str;
    }
    find = caro.escapeRegExp(find);
    regex = new RegExp(find, 'g');
    return str.replace(regex, replace);
  };

  /**
   * format str to money type like 1,000.00
   * @param {string|number} str
   * @param {string} [type=int|sInt] format-type, if type is set, the opt will not work
   * @param {object} [opt]
   * @param {number} [opt.float=2]
   * @param [opt.decimal=.]
   * @param [opt.separated=,]
   * @param [opt.prefix]
   * @returns {string}
   */
  self.formatMoney = function(str, type, opt) {
    var decimal, float, iStr, isObj, isStr, prefix, r, retStr, s, sepLength, separated;
    r = [];
    isObj = caro.isObj;
    isStr = caro.isStr;
    float = 2;
    decimal = '.';
    separated = ',';
    prefix = '';
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0) {
        return;
      }
      if (isObj(arg)) {
        opt = arg;
      }
      if (isStr(arg)) {
        type = arg;
      }
    });
    if (type === 'sInt') {
      float = 0;
      prefix = '$';
    } else if (type === 'int') {
      float = 0;
    } else if (isObj(opt)) {
      float = (float = Math.abs(opt.float)) > -1 ? float : 2;
      decimal = isStr(opt.decimal) ? opt.decimal : decimal;
      separated = isStr(opt.separated) ? opt.separated : separated;
      prefix = isStr(opt.prefix) ? opt.prefix : prefix;
    }
    s = str < 0 ? '-' : '';
    iStr = parseInt(Math.abs(str || 0).toFixed(float)).toString();
    sepLength = iStr.length > 3 ? iStr.length % 3 : 0;
    retStr = s + (sepLength ? iStr.substr(0, sepLength) + separated : '') + iStr.substr(sepLength).replace(/(\d{3})(?=\d)/g, '$1' + separated) + (float ? decimal + Math.abs(str - iStr).toFixed(float).slice(2) : '');
    if (prefix) {
      r.push(prefix);
    }
    r.push(retStr);
    return r.join(' ');
  };

  /**
   * e.g. ThisIsWord -> This Is Word
   * @param {string} str
   * @returns {string}
   */
  self.insertBlankBefUpper = function(str) {
    var aStr, aStrClone, indexCount;
    if (!caro.isStr(str)) {
      return str;
    }
    indexCount = 0;
    aStr = str.split('');
    aStrClone = caro.cloneArr(aStr);
    caro.eachObj(aStrClone, function(i, char) {
      var isUpper;
      isUpper = caro.isUpper(char);
      if (indexCount > 0 && isUpper) {
        aStr.splice(indexCount, 0, ' ');
        indexCount++;
      }
      indexCount++;
    });
    return aStr.join('');
  };

  /**
   * @param {string} str
   * @param {object} [opt]
   * @param {number} [opt.start] the start-index you want to uppercase
   * @param {number} [opt.end] the end-index you want to uppercase
   * @param {boolean} [opt.force] if force cover to str
   * @returns {}
   */
  self.upperStr = function(str, opt) {
    return changeCase(str, 'upperCase', opt);
  };

  /**
   * @param {string} str
   * @returns {}
   */
  self.upperFirst = function(str) {
    if (!caro.isStr(str)) {
      return str;
    }
    return caro.upperStr(str, {
      start: 0,
      end: 1
    });
  };

  /**
   * @param {string} str
   * @param {object} [opt]
   * @param {number} [opt.start] the start-index you want to lowercase
   * @param {number} [opt.end] the end-index you want to lowercase
   * @param {boolean} [opt.force] if force cover to str
   * @returns {}
   */
  self.lowerStr = function(str, opt) {
    return changeCase(str, 'toLowerCase', opt);
  };

  /**
   * @param {string} str
   * @param {boolean} [force=true] if force cover to str
   * @returns {}
   */
  self.trimStr = function(str, force) {
    force = force !== false;
    if (!caro.isStr(str)) {
      if (!force) {
        return str;
      }
      str = '';
    }
    return str.trim();
  };

  /**
   * @param {string} str
   * @param {string|string[]} splitter
   * @param {boolean} [force=true] if force cover to str
   * @returns {*}
   */
  self.splitStr = function(str, splitter, force) {
    var mainSplit;
    if (caro.isArr(str)) {
      return str;
    }
    if (splitter === void 0) {
      return [];
    }
    splitter = caro.coverToArr(splitter);
    force = force !== false;
    if (!caro.isStr(str)) {
      if (!force) {
        return str;
      }
      return [];
    }
    mainSplit = splitter[0];
    caro.eachObj(splitter, function(j, eachSplit2) {
      if (mainSplit.length >= eachSplit2.length) {
        mainSplit = eachSplit2;
      }
    });
    if (!mainSplit) {
      return str;
    }
    caro.eachObj(splitter, function(i, eachSplit) {
      str = caro.replaceAll(str, eachSplit, mainSplit);
    });
    return str.split(mainSplit);
  };

  /**
   * serialize obj-arguments to url
   * @param {string} url
   * @param {object} oArgs the argument you want to cover (e.g. {a:1,b:2})
   * @param {boolean} [coverEmpty=false] if cover when value is empty
   * @returns {*}
   */
  self.serializeUrl = function(url, oArgs, coverEmpty) {
    var aArgs, count;
    count = 0;
    aArgs = ['?'];
    url = caro.coverToStr(url);
    oArgs = caro.coverToObj(oArgs);
    coverEmpty = coverEmpty === true;
    caro.eachObj(oArgs, function(key, val) {
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
    url += aArgs.join('');
    return url;
  };
})();
