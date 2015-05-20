
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
    if (!caro.isStr(str)) {
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
    caro.each(exclude, function(i, excludeStr) {
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
   * check string if ("true" | not-empty) / ("false" | empty) and covert to boolean
   * @param {string} string
   * @returns {boolean}
   */
  self.strToBool = function(str) {
    if (!caro.isStr(str) || !str) {
      return false;
    }
    str = str.toLowerCase();
    return str !== 'false';
  };

  /**
   * check if charts has in head of string
   * @param string
   * @param str2
   * @returns {*}
   */
  self.hasHead = function(str, str2) {
    if (!caro.isStr(str, str2)) {
      return false;
    }
    return str.indexOf(str2) === 0;
  };

  /**
   * add the head to string if not exist
   * @param {string} string
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
   * @param string
   * @param str2
   * @returns {*}
   */
  self.hasTail = function(str, str2) {
    var index, strLength, strLength2;
    if (!caro.isStr(str, str2)) {
      return false;
    }
    index = str.lastIndexOf(str2);
    strLength = str.length;
    strLength2 = str2.length;
    return strLength > strLength2 && index === strLength - strLength2;
  };

  /**
   * add the tail to string if not exist
   * @param {string} string
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
   * @param {string} string
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
   * @param {string} string
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
   * @param {string} string
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
   * @param {string} string
   * @returns {*|string}
   */
  self.escapeRegExp = function(str) {
    if (!caro.isStr(str)) {
      return str;
    }
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  };

  /**
   * replace all find in string
   * @param {string} string
   * @param {string} find
   * @param {string} replace
   * @returns {*|string}
   */
  self.replaceAll = function(str, find, replace) {
    var isRegExp, regex;
    isRegExp = caro.isRegExp(find);
    if (!caro.isStr(str, find, replace) && !isRegExp) {
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
   * @param {string} string
   * @returns {string}
   */
  self.insertBlankBefUpper = function(str) {
    var aStr, aStrClone, indexCount;
    if (!caro.isStr(str)) {
      return str;
    }
    indexCount = 0;
    aStr = str.split('');
    aStrClone = caro.cloneObj(aStr);
    caro.each(aStrClone, function(i, char) {
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
   * @param {string} string
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
   * @param {string} string
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
   * @param {string} string
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
   * @param {string} string
   * @param {boolean} [force=true] if force cover to string
   * @returns {}
   */
  self.trimStr = function(str, force) {
    if (force == null) {
      force = true;
    }
    if (!caro.isStr(str)) {
      if (!force) {
        return str;
      }
      str = '';
    }
    return str.trim();
  };

  /**
   * @param {string} string
   * @param {string|string[]} splitter
   * @param {boolean} [force=true] if force cover to string
   * @returns {*}
   */
  self.splitStr = function(str, splitter, force) {
    var mainSplit;
    if (caro.isArr(str)) {
      return str;
    }
    if (!splitter) {
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
    if (mainSplit.length > 1) {
      caro.each(splitter, function(j, eachSplit) {
        if (!caro.isStr(eachSplit)) {
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
    if (!caro.isStr(mainSplit)) {
      return str;
    }
    caro.each(splitter, function(i, eachSplit) {
      if (!caro.isStr(eachSplit)) {
        return;
      }
      str = caro.replaceAll(str, eachSplit, mainSplit);
    });
    return str.split(mainSplit);
  };

  /**
   * serialize object-arguments to url
   * @param {string} url
   * @param {object} oArgs the argument you want to cover (e.g. {a:1,b:2})
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
    url = caro.coverToStr(url);
    oArgs = caro.coverToObj(oArgs);
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
