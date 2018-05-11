/*
 * String
 * @author Caro.Huang
 */
(function () {
  var self = caro;
  var changeCase = function (str, type, startOrCb, end) {
    startOrCb = startOrCb || 0;

    var cb = null;
    if (!end) {
      end = str.length;
    }
    var strArr = str.split('');
    if (typeof startOrCb === 'function') {
      cb = startOrCb;
      for (var i = 0; i < strArr.length; i++) {
        var letter = strArr[i];
        if (cb(letter, i) === true) {
          strArr[i] = letter[type]();
        }
      }
    } else {
      for (var j = 0; j < strArr.length; j++) {
        letter = strArr[j];
        if (j >= startOrCb && j < end) {
          strArr[j] = letter[type]();
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
  self.addHead = function (str, addStr) {
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
  self.addTail = function (str, addStr) {
    var length = addStr.length;
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
  self.brToWrap = function (str) {
    var regex = /<br\s*[\/]?>/gi;
    return str.replace(regex, '\n');
  };
  /*
   * insert string to another
   * @param {string} str1
   * @param {string} str2 the string want to insert
   * postion {integer} [position]
   */
  self.insertStr = function (str1, str2, position) {
    position = position || str1.length;
    return [str1.slice(0, position), str2, str1.slice(position)].join('');
  };
  self.lowerStr = function (str, startOrCb, end) {
    return changeCase(str, 'toLowerCase', startOrCb, end);
  };
  /*
   * replace all find in string
   * @param {string} str
   * @param {string} find
   * @param {string} replace
   * @returns {*|string}
   */
  self.replaceAll = function (str, find, replace) {
    find = find.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    var regex = new RegExp(find, 'g');
    return str.replace(regex, replace);
  };
  /*
   * replace last find in string
   * @param {string} str
   * @param {string} find
   * @param {string} replace
   * @returns {*|string}
   */
  self.replaceLast = function (str, find, replace) {
    var lastIndex = str.lastIndexOf(find);
    var str1 = str.slice(0, lastIndex);
    var str2 = str.slice(lastIndex);
    return str1 + str2.replace(find, replace);
  };
  /*
   * split to array by '\r\n' | '\n' | '\r'
   * @param {string} str
   * @returns {*}
   */
  self.splitByWrap = function (str) {
    var aWrap = ['\r\n', '\r', '\n'];
    return caro.splitStr(str, aWrap);
  };
  /*
   * split string
   * @param {string} str
   * @param {string|string[]} splitter it should be string-array or string
   * @returns {*}
   */
  self.splitStr = function (str, splitter) {
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
    var mainSplit = splitter[0];
    for (var i = 0; i < splitter.length; i++) {
      var eachSplit = splitter[i];
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
    for (var j = 0; j < splitter.length; j++) {
      eachSplit = splitter[j];
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
  self.strToBool = function (str) {
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
  self.upperStr = function (str, startOrCb, end) {
    return changeCase(str, 'toUpperCase', startOrCb, end);
  };
  /*
   * replace \r\n | \r | \n to <br/>
   * @param {string} str
   * @returns {string}
   */
  self.wrapToBr = function (str) {
    str = str.replace(/\r\n/g, '<br />');
    str = str.replace(/\n/g, '<br />');
    str = str.replace(/\r/g, '<br />');
    return str;
  };
})();
