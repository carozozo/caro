/*! caro - v0.5.11 - 2015-05-22 */
(function(g) {
  'use strict';
  var caro;
  caro = {};
  caro.isNode = (function() {
    return (typeof global !== "undefined" && global !== null) && (typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null);
  })();
  g.caro = caro;
  if (caro.isNode) {
    module.exports = caro;
    return global.caro = caro;
  }
})(this);

(function() {
  if (caro.isNode) {
    caro.nMoment = require('moment');
  } else {
    if (typeof moment !== "undefined" && moment !== null) {
      caro.nMoment = moment;
    }
  }
})();


/**
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * sort array
   * @param {[]} arr
   * @param {boolean} [sort=true] if sort by ASC
   * @returns {*}
   */
  self.sortArr = function(arr, sort) {
    if (sort == null) {
      sort = true;
    }
    arr.sort(function(a, b) {
      if (sort) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      }
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
    return arr;
  };

  /**
   * sort array by key if value is object
   * @param {[]} arr
   * @param {string} key
   * @param {boolean} [sort=true] if sort by ASC
   * @returns {*}
   */
  self.sortByObjKey = function(arr, key, sort) {
    if (sort == null) {
      sort = true;
    }
    arr.sort(function(a, b) {
      var order1, order2;
      order1 = a[key] || 0;
      order2 = b[key] || 0;
      if (sort) {
        if (order1 < order2) {
          return -1;
        } else if (order1 > order2) {
          return 1;
        } else {
          return 0;
        }
      }
      if (order1 > order2) {
        return -1;
      } else if (order1 < order2) {
        return 1;
      } else {
        return 0;
      }
    });
    return arr;
  };

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
      if (caro.isNum(val)) {
        sum += val;
      }
      if (force) {
        sum += parseFloat(val) || 0;
      }
    });
    return sum;
  };

  /**
   * remove item from array by index
   * @param {[]} arr
   * @param {...number} index
   * @returns {*}
   */
  self.removeByIndex = function(arr, index) {
    var aRemoveIndex, checkIndexIfNeedRemove, r;
    r = [];
    aRemoveIndex = [];
    checkIndexIfNeedRemove = function(i) {
      var needRemove;
      needRemove = false;
      caro.each(aRemoveIndex, function(j, removeIndex) {
        if (i === removeIndex) {
          needRemove = true;
          return false;
        }
      });
      return needRemove;
    };
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0) {
        return;
      }
      arg = parseInt(arg);
      aRemoveIndex.push(arg);
    });
    caro.each(arr, function(i, val) {
      if (!checkIndexIfNeedRemove(i)) {
        r.push(val);
      }
    });
    arr = r;
    return r;
  };

  /**
   * remove the item from array by value
   * @param {[]} arr
   * @param {...*} value
   * @returns {*}
   */
  self.removeByArrVal = function(arr, val) {
    var aRemoveVal, checkValIfNeedRemove, r;
    r = [];
    aRemoveVal = [];
    checkValIfNeedRemove = function(val) {
      var needRemove;
      needRemove = false;
      caro.each(aRemoveVal, function(j, removeIndex) {
        if (val === removeIndex) {
          needRemove = true;
        }
      });
      return needRemove;
    };
    caro.eachArgs(arguments, function(i, arg) {
      if (i === 0) {
        return;
      }
      aRemoveVal.push(arg);
    });
    caro.each(arr, function(i, val) {
      if (!checkValIfNeedRemove(val)) {
        r.push(val);
      }
    });
    arr = r;
    return r;
  };

  /**
   * remove duplicate-value in array
   * @param {[]} arr
   * @returns {*}
   */
  self.removeDup = function(arr) {
    var r;
    r = [];
    caro.each(arr, function(i, val) {
      if (r.indexOf(val) < 0) {
        r.push(val);
      }
    });
    return arr = r;
  };

  /**
   * push value into array if not exists
   * @param {[]} arr
   * @param {...*} value
   * @returns {*}
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
   * @returns {*}
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
    if (caro.isUndef(variable)) {
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
  if (caro.nMoment == null) {
    return;
  }
  self = caro;
  nMoment = self.nMoment;
  defLocale = 'en';
  oShorthandFormat = {};
  getDateTimeObj = function(dateTime) {
    if (dateTime) {
      return nMoment(dateTime);
    }
    return nMoment();
  };
  coverLocale = function(locale) {
    locale = caro.coverToStr(locale, false);
    return locale || defLocale;
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
    if (caro.isObj(amount)) {
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
    if (caro.isObj(amount)) {
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
 * FileSystem
 * @author Caro.Huang
 */
(function() {
  var coverToFalseIfEmptyArr, fileSizeUnits1, fileSizeUnits2, getArgs, getFileSize, nFs, self, showErr, traceMode;
  if (!caro.isNode) {
    return;
  }
  self = caro;
  nFs = require('fs');
  fileSizeUnits1 = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  fileSizeUnits2 = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  traceMode = false;
  showErr = function(e) {
    if (traceMode) {
      return console.error(e);
    }
  };
  getArgs = function(args) {
    var aArr, aBool, aFn, aNum, aStr;
    aStr = [];
    aFn = [];
    aBool = [];
    aArr = [];
    aNum = [];
    caro.each(args, function(i, arg) {
      if (caro.isFn(arg)) {
        aFn.push(arg);
        return;
      }
      if (caro.isBool(arg)) {
        aBool.push(arg);
        return;
      }
      if (caro.isStr(arg)) {
        aStr.push(arg);
        return;
      }
      if (caro.isArr(arg)) {
        aArr.push(arg);
        return;
      }
      if (caro.isNum(arg)) {
        aNum.push(arg);
        return;
      }
    });
    return {
      fn: aFn,
      bool: aBool,
      str: aStr,
      arr: aArr,
      num: aNum
    };
  };
  coverToFalseIfEmptyArr = function(arr) {
    if (arr.length < 1) {
      return false;
    }
    return arr;
  };
  getFileSize = function(path) {
    var status;
    status = caro.getFsStat(path);
    if (status) {
      return status.size;
    }
    if (caro.isNum(path)) {
      return path;
    }
    return null;
  };

  /**
   * set trace-mode, will console.error when got exception
   * @returns {boolean}
   */
  self.setFsTrace = function(bool) {
    return traceMode = bool === true;
  };

  /**
   * read file content, return false if failed
   * @param {string} path
   * @param {?string} [encoding=utf8]
   * @param {?string} [flag=null]
   * @returns {*}
   */
  self.readFileCaro = function(path, encoding, flag) {
    var e;
    if (encoding == null) {
      encoding = 'utf8';
    }
    if (flag == null) {
      flag = null;
    }
    try {
      return nFs.readFileSync(path, {
        encoding: encoding,
        flag: flag
      });
    } catch (_error) {
      e = _error;
      showErr(e);
    }
    return false;
  };

  /**
   * write data to file, return false if failed
   * @param {string} path
   * @param {*} data
   * @param {?string} [encoding=utf8]
   * @param {?string} [flag=null]
   * @returns {*}
   */
  self.writeFileCaro = function(path, data, encoding, flag) {
    var e;
    if (encoding == null) {
      encoding = 'utf8';
    }
    if (flag == null) {
      flag = null;
    }
    try {
      nFs.writeFileSync(path, data, {
        encoding: encoding,
        flag: flag
      });
      return true;
    } catch (_error) {
      e = _error;
      showErr(e);
    }
    return false;
  };

  /**
   * check if empty-folder, return false if anyone is false
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {boolean}
   */
  self.isEmptyDir = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var count, e;
      try {
        count = nFs.readdirSync(path);
        if (count.length > 0) {
          pass = false;
        }
        caro.executeIfFn(cb, false, path);
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        caro.executeIfFn(cb, e, path);
      }
    });
    return pass;
  };

  /**
   * get files under path
   * @param {string} path
   * @param {function(object)} [cb] cb with file-info
   * @param {object} [opt]
   * @param {number} [opt.maxLayer=1] the dir-layer you want to read, get all-layer when 0
   * @param {boolean} [opt.getDir=true] if return dir-path
   * @param {boolean} [opt.getFile=true] if return file-path
   * @param {boolean|string|[]} [opt.getByExtend=false] if set as string, will only return files including same extend-name
   * @returns {*}
   */
  self.readDirCb = function(path, cb, opt) {
    var countLayer, getByExtend, getDir, getFile, maxLayer, pushFile, readDir;
    if (opt == null) {
      opt = {};
    }
    countLayer = 0;
    maxLayer = opt.maxLayer != null ? parseInt(opt.maxLayer, 10) : 1;
    getDir = opt.getDir !== false;
    getFile = opt.getFile !== false;
    getByExtend = (function() {
      var r;
      r = false;
      if (opt.getByExtend) {
        r = caro.splitStr(opt.getByExtend, ',');
        caro.each(r, function(i, extendName) {
          r[i] = caro.addHead(extendName, '.');
        });
      }
      return r;
    })();
    pushFile = function(oFileInfo) {
      var extendName;
      extendName = oFileInfo.extendName;
      if (getByExtend && getByExtend.indexOf(extendName) < 0) {
        return;
      }
      return cb(false, oFileInfo);
    };
    readDir = function(rootPath, layer) {
      var e, files;
      if (maxLayer > 0 && layer >= maxLayer) {
        return;
      }
      try {
        files = nFs.readdirSync(rootPath);
      } catch (_error) {
        e = _error;
        showErr(e);
        cb(e);
      }
      layer++;
      caro.each(files, function(i, basename) {
        var dirPath, extendName, filePath, fileType, filename, fullDirPath, fullPath, oFileInfo;
        filename = caro.getFileName(basename, false);
        extendName = caro.getExtendName(basename);
        filePath = caro.normalizePath(rootPath, basename);
        dirPath = caro.getDirPath(filePath);
        fullPath = caro.coverToFullPath(filePath);
        fullDirPath = caro.getDirPath(fullPath);
        fileType = caro.getFileType(filePath);
        oFileInfo = {
          filename: filename,
          extendName: extendName,
          basename: basename,
          filePath: filePath,
          dirPath: dirPath,
          fullPath: fullPath,
          fullDirPath: fullDirPath,
          fileType: fileType,
          layer: layer - 1,
          index: i
        };
        if (caro.isFsDir(filePath)) {
          if (getDir && pushFile(oFileInfo) === false) {
            return false;
          }
          readDir(filePath, layer);
          return;
        }
        if (caro.isFsFile(filePath) && getFile && pushFile(oFileInfo) === false) {
          return false;
        }
      });
    };
    readDir(path, countLayer);
  };

  /**
   * create dir recursively, will create folder if path not exists
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {*|string}
   */
  self.createDir = function(path, cb) {
    var aPath, args, createDir, err, pass;
    err = [];
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    createDir = function(dirPath) {
      var subPath;
      subPath = '';
      aPath = caro.splitStr(dirPath, ['\\', '/']);
      caro.each(aPath, function(i, eachDir) {
        var e, exists;
        subPath = caro.normalizePath(subPath, eachDir);
        exists = caro.fsExists(subPath);
        if (exists) {
          return;
        }
        try {
          nFs.mkdirSync(subPath);
        } catch (_error) {
          e = _error;
          showErr(e);
          pass = false;
          err.push(e);
        }
      });
      return err;
    };
    caro.each(aPath, function(i, dirPath) {
      err = [];
      err = createDir(dirPath);
      err = coverToFalseIfEmptyArr(err);
      return caro.executeIfFn(cb, err, dirPath);
    });
    return pass;
  };

  /**
   * check file if exists, return false when anyone is false
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {*}
   */
  self.fsExists = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var e, err;
      err = false;
      try {
        if (!nFs.existsSync(path)) {
          pass = false;
        }
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path);
    });
    return pass;
  };

  /**
   * check if folder, return false when anyone is false
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {*}
   */
  self.isFsDir = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var e, err, stat;
      err = false;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isDirectory());
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path);
    });
    return pass;
  };

  /**
   * check if file, return false when anyone is false
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {*}
   */
  self.isFsFile = function(path) {
    var aPath, args, cb, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var e, err, stat;
      err = false;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isFile());
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path);
    });
    return pass;
  };

  /**
   * check if symbolic link, return false when anyone is false
   * @param {function} [cb] the callback-function for each path
   * @param {...string} path
   * @returns {*}
   */
  self.isFsSymlink = function(path) {
    var aPath, args, cb, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var e, err, stat;
      err = false;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isSymbolicLink());
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path);
    });
    return pass;
  };

  /**
   * @param {string} path
   * @returns {string}
   */
  self.getFileType = function(path) {
    var r;
    r = '';
    if (caro.isFsDir(path)) {
      r = 'dir';
    }
    if (caro.isFsFile(path)) {
      r = 'file';
    }
    if (caro.isFsSymlink(path)) {
      r = 'link';
    }
    return r;
  };

  /**
   * delete file/folder recursively
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @param {boolean} [force=false] force-delete even not empty
   * @returns {boolean}
   */
  self.deleteFs = function(path, cb, force) {
    var aPath, args, deleteFileOrDir, err, pass, tryAndCatchErr;
    err = [];
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    force = args.bool[0];
    tryAndCatchErr = function(fn) {
      var e;
      try {
        fn();
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err.push(e);
      }
    };
    deleteFileOrDir = function(path) {
      if (caro.isFsFile(path) && force) {
        tryAndCatchErr(function() {
          return nFs.unlinkSync(path);
        });
        return;
      }
      if (caro.isFsDir(path)) {
        tryAndCatchErr(function() {
          var files;
          files = nFs.readdirSync(path);
          caro.each(files, function(i, file) {
            var subPath;
            subPath = caro.normalizePath(path, file);
            deleteFileOrDir(subPath);
          });
        });
      }
      tryAndCatchErr(function() {
        return nFs.rmdirSync(path);
      });
      return err;
    };
    caro.each(aPath, function(i, dirPath) {
      err = [];
      err = deleteFileOrDir(dirPath);
      err = coverToFalseIfEmptyArr(err);
      return caro.executeIfFn(cb, err, dirPath);
    });
    return pass;
  };

  /**
   * @param {string|...[]} path the file-path, you can also set as [path,newPath]
   * @param {string|...[]} newPath the new-path, you can also set as [path,newPath]
   * @param {function} [cb] the callback-function for each path
   * @param {boolean} [force=false] will create folder if there is no path for newPath
   * @returns {boolean}
   */
  self.renameFs = function(path, newPath, cb, force) {
    var aPathMap, args, pass;
    if (force == null) {
      force = false;
    }
    pass = true;
    aPathMap = [];
    args = getArgs(arguments);
    cb = args.fn[0];
    force = args.bool[0];
    aPathMap = (function() {
      if (caro.isStr(path, newPath)) {
        return [path, newPath];
      }
      return args.arr;
    })();
    caro.each(aPathMap, function(i, pathMap) {
      var dirPath2, e, err, path1, path2;
      err = false;
      path1 = pathMap[0];
      path2 = pathMap[1];
      try {
        if (force && caro.fsExists(path1)) {
          dirPath2 = caro.getDirPath(path2);
          caro.createDir(dirPath2);
        }
        nFs.renameSync(path1, path2);
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path1, path2);
    });
    return pass;
  };

  /**
   * get file stat
   * @param {string} path
   * @param {string} [type=l] s = statSync, l = lstatSync, f = fstatSync
   * @returns {*}
   */
  self.getFsStat = function(path, type) {
    var aType, e, stat;
    if (type == null) {
      type = 'l';
    }
    stat = null;
    aType = ['l', 's', 'f'];
    type = aType.indexOf(type) > -1 ? type : aType[0];
    try {
      switch (type) {
        case 's':
          stat = nFs.lstatSync(path);
          break;
        case 'f':
          stat = nFs.fstatSync(path);
          break;
        default:
          stat = nFs.statSync(path);
          break;
      }
    } catch (_error) {
      e = _error;
      showErr(e);
    }
    return stat;
  };

  /**
   * get file size, default in bytes or set by unit
   * @param {number|string} path file-path or bytes
   * @param {number} [fixed=1] decimals of float
   * @param {string} [unit] the file-size unit
   * @returns {}
   */
  self.getFsSize = function(path, fixed, unit) {
    var args, bytes, count, index, index1, index2, si, thresh;
    if (fixed == null) {
      fixed = 1;
    }
    bytes = getFileSize(path);
    if (bytes === null) {
      return bytes;
    }
    args = caro.objToArr(arguments);
    args.shift();
    args = getArgs(args);
    fixed = caro.coverToInt(args.num[0]);
    fixed = fixed > -1 ? fixed : 1;
    unit = args.str[0];
    si = true;
    unit = caro.upperFirst(unit);
    unit = caro.upperStr(unit, {
      start: -1
    });
    index1 = fileSizeUnits1.indexOf(unit);
    index2 = fileSizeUnits2.indexOf(unit);
    if (index2 > -1) {
      si = false;
    }
    index = si ? index1 : index2;
    if (index < 0) {
      return bytes;
    }
    count = 0;
    thresh = si ? 1000 : 1024;
    while (count < index) {
      bytes /= thresh;
      ++count;
    }
    return caro.coverToNum(bytes.toFixed(fixed));
  };

  /**
   * get file size for human-reading
   * @param {number|string} path file-path or bytes
   * @param {number} [fixed=1] decimals of float
   * @param {boolean} [si=true] size-type, true decimal, false as binary
   * @returns {string}
   */
  self.humanFeSize = function(path, fixed, si) {
    var aUnit, bytes, thresh, u;
    if (fixed == null) {
      fixed = 1;
    }
    if (si == null) {
      si = true;
    }
    bytes = getFileSize(path);
    if (bytes === null) {
      return bytes;
    }
    thresh = si ? 1000 : 1024;
    if (bytes < thresh) {
      return bytes + ' B';
    }
    aUnit = si ? fileSizeUnits1 : fileSizeUnits2;
    u = -1;
    while (bytes >= thresh) {
      bytes /= thresh;
      ++u;
    }
    return caro.coverToFixed(bytes, fixed) + ' ' + aUnit[u];
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
    if (!Array.isArray(arr) && typeof arr !== 'object' || !caro.isFn(checkFn)) {
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
    if (caro.isFn(fn)) {
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
    if (!force) {
      return arg;
    }
    return '';
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
    try {
      r = JSON.parse(arg);
      if (caro.isObj(r)) {
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
   * for-loop the arg and callback of key/value
   * @param {*} arg
   * @param {function} cb callback-function for each key & value
   */
  self.each = function(arg, cb) {
    var isArr, key, val;
    isArr = Array.isArray(arg);
    for (key in arg) {
      val = arg[key];
      if (isArr) {
        key = parseInt(key);
      }
      if (cb && cb(key, val) === false) {
        break;
      }
    }
  };

  /**
    * for-loop the arg and callback of int-key/value
    * @param arg
    * @param {function} cb callback-function for each key & value
   */
  self.eachArgs = function(arg, cb) {
    var i;
    for (i in arg) {
      i = parseInt(i);
      if (cb && cb(i, arg[i]) === false) {
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
    if (!caro.isObj(obj) || aType.indexOf(type) < 0) {
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
      if (!caro.isStr(val)) {
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
    if (caro.isArr(arg)) {
      arg.push(val);
    } else if (caro.isObj(arg)) {
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
    if (!caro.isBool(deep)) {
      r = deep;
      deep = false;
    }
    caro.eachArgs(arguments, function(key, arg) {
      var results, val;
      if (!r && caro.isObjOrArr(arg)) {
        r = arg;
        return true;
      }
      results = [];
      for (key in arg) {
        val = arg[key];
        if (caro.isObj(r) && caro.keysInObj(r, key) && !deep) {
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
    if (!caro.isObjOrArr(arg)) {
      return arg;
    }
    r = caro.isArr(arg) ? [] : {};
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
        if (caro.isObj(val) && deep) {
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
    if (!caro.isObj(obj)) {
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
    if (!caro.isObj(obj)) {
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
        if (caro.isObj(val)) {
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
      if (caro.isObjOrArr(val)) {
        caro.coverFnToStrInObj(val);
      } else if (caro.isFn(val)) {
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
    if (!caro.isStr(path)) {
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
    if (!caro.isStr(str, str2)) {
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
    if (!caro.isStr(str, addStr)) {
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
   * @param {string} str
   * @param {string} addStr
   * @returns {*}
   */
  self.addTail = function(str, addStr) {
    if (!caro.isStr(str, addStr)) {
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
    if (!caro.isStr(str)) {
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
   * replace all find in string
   * @param {string} str
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
   * @param {string} str
   * @returns {string}
   */
  self.insertBlankBefUpper = function(str) {
    var aStr, r;
    if (!caro.isStr(str)) {
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
    char = caro.isStr(char) ? char : ' ';
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
    if (caro.isArr(str)) {
      return str;
    }
    if (!splitter) {
      return [];
    }
    splitter = caro.coverToArr(splitter);
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
   * check if boolean, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isBool = function(arg) {
    return checkType(arguments, 'boolean');
  };

  /**
   * check if string, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isStr = function(arg) {
    return checkType(arguments, 'string');
  };

  /**
   * check if function, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isFn = function(arg) {
    return checkType(arguments, 'function');
  };

  /**
   * check if undefined, return false is one of them not match
   * @param {...} arg
   * @returns {*}
   */
  self.isUndef = function(arg) {
    return checkType(arguments, 'undefined');
  };

  /**
   * check if number, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isNum = function(arg) {
    return checkType(arguments, 'number');
  };

  /**
   * check if integer, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isInt = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      var int;
      int = parseInt(val);
      return int === val;
    });
  };

  /**
   * check if array, return false is one of them not match
   * @param {...} arg
   * @returns {*}
   */
  self.isArr = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      return Array.isArray(val);
    });
  };

  /**
   * check if null, return false is one of them not match
   * @param {...} arg
   * @returns {*}
   */
  self.isNull = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      return val === null;
    });
  };

  /**
   * check if JSON, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isJson = function(arg) {
    var pass;
    pass = true;
    caro.each(arguments, function(i, arg) {
      var e;
      try {
        JSON.parse(arg);
      } catch (_error) {
        e = _error;
        pass = false;
        return false;
      }
    });
    return pass;
  };

  /**
   * check if argument is object-like JSON, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObjJson = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      var e, r;
      try {
        r = JSON.parse(val);
        return caro.isObj(r);
      } catch (_error) {
        e = _error;
        return false;
      }
    });
  };

  /**
   * check if object, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObj = function(arg) {
    if (!checkType(arguments, 'object')) {
      return false;
    }
    return caro.checkIfPassCb(arguments, function(val) {
      return !caro.isNull(val) && !caro.isArr(val);
    });
  };

  /**
   * check if object or array, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObjOrArr = function(arg) {
    if (!checkType(arguments, 'object')) {
      return false;
    }
    return caro.checkIfPassCb(arguments, function(val) {
      return !caro.isNull(val);
    });
  };

  /**
   * check if RegExp, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isRegExp = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      return val instanceof RegExp;
    });
  };

  /* -------------------- Node.js only -------------------- */
  if (!caro.isNode) {
    return;
  }

  /**
   * check if Buffer, return false is one of them not match
   * @param {...} arg
   * @returns {Boolean}
   */
  self.isBuf = function(arg) {
    return caro.checkIfPassCb(arguments, function(val) {
      var e;
      try {
        return Buffer.isBuffer(val);
      } catch (_error) {
        e = _error;
        return false;
      }
    });
  };
})();
