
/*
 * String
 * @author Caro.Huang
 */
(function() {
  var changeCase, self;
  self = caro;
  changeCase = function(str, type, startOrCb, end) {
    var cb, strArr;
    if (startOrCb == null) {
      startOrCb = 0;
    }
    if (end == null) {
      end = null;
    }
    cb = null;
    if (!end) {
      end = str.length;
    }
    strArr = str.split('');
    if (caro.isFunction(startOrCb)) {
      cb = startOrCb;
      caro.forEach(strArr, function(letter, i) {
        if (cb(letter, i) === true) {
          return strArr[i] = letter[type]();
        }
      });
    } else {
      caro.forEach(strArr, function(letter, i) {
        if (i >= startOrCb && i < end) {
          return strArr[i] = letter[type]();
        }
      });
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
    if (!caro.startsWith(str, addStr)) {
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
    if (!caro.isString(str)) {
      return str;
    }
    if (!caro.endsWith(str, addStr)) {
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

  /*
   * lowercase string
   * @param {string} str
   * @param {object} [opt]
   * @param {number|function} [opt.startOrCb] the start-index you want to lowercase
   * or callback-function, will lowercase when callback return true
   * @param {number} [opt.end] the end-index you want to lowercase
   * @param {boolean} [opt.force] if force cover to string
   * @returns {*}
   */
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
    find = caro.escapeRegExp(find);
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
    var mainSplit;
    if (caro.isArray(str)) {
      return str;
    }
    if (!splitter) {
      return [];
    }
    if (!caro.isArray(splitter)) {
      splitter = [splitter];
    }
    mainSplit = splitter[0];
    caro.forEach(splitter, function(eachSplit) {
      if (!caro.isString(eachSplit)) {
        return;
      }
      if (mainSplit.length < 2) {
        return false;
      }
      if (mainSplit.length > eachSplit.length) {
        mainSplit = eachSplit;
      }
    });
    if (!caro.isString(mainSplit)) {
      return [];
    }

    /* replace all splitter to mainSplitter
     * e.g. string='caro.huang, is handsome'; splitter=['.', ','];
     * => string='caro,huang, is handsome'
     */
    caro.forEach(splitter, function(eachSplit) {
      if (!caro.isString(eachSplit)) {
        return;
      }
      str = caro.replaceAll(str, eachSplit, mainSplit);
    });
    return str.split(mainSplit);
  };

  /*
   * check string if ("true" | not-empty) / ("false" | empty) and covert to boolean
   * @param {string} str
   * @returns {boolean}
   */
  self.strToBool = function(str) {
    str = str.toLowerCase();
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
    if (!caro.isString(str)) {
      return str;
    }
    str = str.replace(/\r\n/g, '<br />');
    str = str.replace(/\n/g, '<br />');
    str = str.replace(/\r/g, '<br />');
    return str;
  };
})();
