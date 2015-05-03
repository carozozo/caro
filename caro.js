/*! caro - v0.3.1 - 2015-05-03 */var caro = {};
if (typeof module !== 'undefined' && typeof exports !=='undefined') { 
 module.exports = caro;
}
(function () {
    'use strict';
    var self = caro;
    /**
     * clone arr
     * @param {[]} arr
     * @returns {Array}
     */
    self.cloneArr = function (arr) {
        if (!caro.isArr(arr)) {
            return [];
        }
        return arr.slice(0);
    };
    /**
     * extend arr
     * @param  {...[]} arr the arr that want to extend
     * @param {boolean} [duplicate=true] if extend duplicate-val
     * @returns {*}
     */
    self.extendArr = function (arr, duplicate) {
        var firstArr = null;
        var otherArr = [];
        var extend = function (arr) {
            caro.eachObj(arr, function (i, eachVal) {
                if (!duplicate) {
                    firstArr = caro.pushNoDup(firstArr, eachVal);
                    return;
                }
                firstArr.push(eachVal);
            });
        };
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isArr(arg)) {
                if (!firstArr) {
                    firstArr = caro.cloneArr(arg);
                } else {
                    otherArr.push(arg);
                }
            }
            if (caro.isBool(arg)) {
                duplicate = arg;
            }
        });
        duplicate = duplicate !== false;
        caro.eachObj(otherArr, function (i, eachArr) {
            extend(eachArr);
        });
        return firstArr;
    };
    /**
     * sort arr by key if value is obj
     * @param {[]} arr
     * @param {string} key
     * @param {boolean} [sort=true]
     * @returns {*}
     */
    self.sortByObjKey = function (arr, key, sort) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        sort = sort !== false;
        arr = caro.cloneArr(arr);
        arr.sort(function (a, b) {
            var order1 = a[key] || 0;
            var order2 = b[key] || 0;
            if (sort) {
                return ((order1 < order2) ? -1 : ((order1 > order2) ? 1 : 0));
            }
            return((order1 > order2) ? -1 : ((order1 < order2) ? 1 : 0));
        });
        return arr;
    };
    /**
     * get sum of val in arr
     * @param {[]} arr
     * @param {boolean} [force=false]
     * @returns {number}
     */
    self.sumOfArr = function (arr, force) {
        var sum = 0;
        if (!caro.isArr(arr)) {
            return 0;
        }
        force = force === true;
        caro.eachObj(arr, function (i, val) {
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
     * remove item from arr by index
     * @param {[]} arr
     * @param {...number} index
     * @returns {*}
     */
    self.removeByIndex = function (arr, index) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        var r = [];
        var aRemoveIndex = [];
        var checkIndexIfNeedRemove = function (i) {
            var needRemove = false;
            caro.eachObj(aRemoveIndex, function (j, removeIndex) {
                if (i === removeIndex) {
                    needRemove = true;
                }
            });
            return needRemove;
        };
        // collect the index that want to remove
        caro.eachObj(arguments, function (i, arg) {
            if (i === 0) {
                return;
            }
            arg = parseInt(arg);
            aRemoveIndex.push(arg);
        });
        caro.eachObj(arr, function (i, val) {
            if (!checkIndexIfNeedRemove(i)) {
                r.push(val);
            }
        });
        return r;
    };
    /**
     * remove the item from arr by val
     * @param {[]} arr
     * @param {...*} val
     * @returns {*}
     */
    self.removeByArrVal = function (arr, val) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        var r = [];
        var aRemoveVal = [];
        var checkValIfNeedRemove = function (val) {
            var needRemove = false;
            caro.eachObj(aRemoveVal, function (j, removeIndex) {
                if (val === removeIndex) {
                    needRemove = true;
                }
            });
            return needRemove;
        };
        // collect the index that want to remove
        caro.eachObj(arguments, function (i, arg) {
            if (i === 0) {
                return;
            }
            aRemoveVal.push(arg);
        });
        caro.eachObj(arr, function (i, val) {
            if (!checkValIfNeedRemove(val)) {
                r.push(val);
            }
        });
        return r;
    };
    /**
     * remove duplicate-val in arr
     * @param {[]} arr
     * @returns {*}
     */
    self.removeDup = function (arr) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        var r = [];
        caro.eachObj(arr, function (i, val) {
            if (r.indexOf(val) < 0) {
                r.push(val);
            }
        });
        return r;
    };
    /**
     * push val into arr if not exists
     * @param {[]} arr
     * @param {...*} val
     * @returns {*}
     */
    self.pushNoDup = function (arr, val) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        var r = caro.cloneArr(arr);
        caro.eachObj(arguments, function (i, val) {
            if (i === 0 || arr.indexOf(val) > -1) {
                return;
            }
            r.push(val);
        });
        return r;
    };
    /**
     * will not push to arr if value is empty
     * @param {[]} arr
     * @param {...*} val
     * @returns {*}
     */
    self.pushNoEmpty = function (arr, val) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        var r = caro.cloneArr(arr);
        var aValNeedPush = [];

        caro.eachObj(arguments, function (i, arg) {
            if (i === 0 || caro.isEmptyVal(arg)) {
                return;
            }
            aValNeedPush.push(arg);
        });
        caro.eachObj(aValNeedPush, function (i, valNeedPush) {
            r.push(valNeedPush);
        });
        return r;
    };
    /**
     * check if empty-value in arr
     * @param {...[]} arr
     * @returns {boolean}
     */
    self.hasEmptyInArr = function (arr) {
        var hasEmpty = false;
        var checkVal = function (arr) {
            if (!caro.isArr(arr)) {
                hasEmpty = true;
                return;
            }
            caro.eachObj(arr, function (i, val) {
                if (caro.isEmptyVal(val)) {
                    hasEmpty = true;
                    return false;
                }
                return true;
            });
        };
        caro.eachObj(arguments, function (i, arr) {
            if (hasEmpty) {
                return false;
            }
            checkVal(arr);
            return true;
        });
        return hasEmpty;
    };
})();
(function () {
    if (typeof module === 'undefined' && typeof exports === 'undefined') {
        return;
    }
    var self = caro;
    // https://www.npmjs.org/package/colors
    require('colors');
    var combineMsg = function (msg, variable) {
        msg = caro.coverToStr(msg);
        variable = caro.coverToStr(variable);
        msg += variable;
        return msg;
    };

    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (!msg) return;
        if (this.isOdd) {
            console.log(msg.green);
            this.isOdd = false;
            return;
        }
        console.log(msg.cyan);
        this.isOdd = true;
    };
    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log2 = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (!msg) return;
        if (this.isOdd) {
            console.log(msg.blue);
            this.isOdd = false;
            return;
        }
        console.log(msg.yellow);
        this.isOdd = true;
    };
    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log3 = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (!msg) return;
        if (this.isOdd) {
            console.log(msg.magenta);
            this.isOdd = false;
            return;
        }
        console.log(msg.red);
        this.isOdd = true;
    };
})();
(function () {
    if (typeof module === 'undefined' && typeof exports === 'undefined') {
        return;
    }
    var self = caro;
    // https://www.npmjs.com/package/moment
    var nMoment = require('moment');
    var defLocale = 'en';
    // save the custom format-type, e.g { en:{date:'MM/DD/YYYY'}, zh-tw :{date:'YYYY-MM-DD'} }
    var oShorthandFormat = {};
    var getDateTimeObj = function (dateTime) {
        if (dateTime)
            return nMoment(dateTime);
        // get now-time
        return nMoment();
    };
    var coverLocale = function (locale) {
        locale = caro.coverToStr(locale, false);
        return locale || defLocale;
    };
    var coverFormatType = function (shorthandFormat, locale) {
        locale = coverLocale(locale);
        var oLocale = oShorthandFormat[locale] || oShorthandFormat[defLocale] || {};
        // if no shorthandFormat, return the format that user set
        return oLocale[shorthandFormat] || shorthandFormat;
    };
    var returnMomentObjIfNoFormatType = function (oDateTime, formatType) {
        if (formatType === undefined) {
            return oDateTime;
        }
        return caro.formatDateTime(oDateTime, formatType);
    };

    /**
     * if set default locale first, then use formatDateTime(), will return format type by it
     * @param {string} locale
     */
    self.setDefaultLocale = function (locale) {
        locale = coverLocale(locale);
        defLocale = locale;
    };
    /**
     * @param {string} shorthandFormat the shorthand format type
     * @param {string} formatType the format type
     * @param {string} [locale] you can set different format type by locale
     */
    self.addDateTimeShortFormat = function (shorthandFormat, formatType, locale) {
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
    self.formatDateTime = function (dateTime, formatType, locale) {
        locale = coverLocale(locale);
        if (locale) {
            nMoment.locale(locale);
        }
        formatType = coverFormatType(formatType, locale);
        var oDateTime = getDateTimeObj(dateTime);
        var returnVal = oDateTime.format(formatType);
        // reset locale to en
        nMoment.locale(defLocale);
        return returnVal;
    };
    /**
     * get now-time
     * @param {string} [fmt] format-type
     * @param {string} [locale] localize date
     * @returns {string}
     */
    self.formatNow = function (fmt, locale) {
        return caro.formatDateTime(null, fmt, locale);
    };
    /**
     * add date-time unit
     * please refer {@link http://momentjs.com/docs/#/manipulating/add/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {number|string} amount
     * @param {string} unit time-unit
     * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
     * @returns {*}
     */
    self.addDateTime = function (dateTime, amount, unit, formatType) {
        var oDateTime = getDateTimeObj(dateTime);
        if (caro.isObj(amount)) {
            oDateTime.add(amount);
        } else {
            oDateTime.add(amount, unit);
        }
        return returnMomentObjIfNoFormatType(oDateTime, formatType);
    };
    /**
     * subtract date-time unit
     * please refer {@link http://momentjs.com/docs/#/manipulating/subtract/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {number|string} amount
     * @param {string} unit time-unit
     * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
     * @returns {*}
     */
    self.subtractDateTime = function (dateTime, amount, unit, formatType) {
        var oDateTime = getDateTimeObj(dateTime);
        if (caro.isObj(amount)) {
            oDateTime.subtract(amount);
        } else {
            oDateTime.subtract(amount, unit);
        }
        return returnMomentObjIfNoFormatType(oDateTime, formatType);
    };
    /**
     * get start of the unit
     * e.g. startOf('2013-01-01 23:00:00','day') = 2013-01-01 00:00:00
     * please refer {@link http://momentjs.com/docs/#/manipulating/start-of/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {string} unit time-unit
     * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
     * @returns {moment.Moment|*}
     */
    self.startOfDateTime = function (dateTime, unit, formatType) {
        var oDateTime = getDateTimeObj(dateTime);
        oDateTime.startOf(unit);
        return returnMomentObjIfNoFormatType(oDateTime, formatType);
    };
    /**
     * get end of the unit
     * please refer {@link http://momentjs.com/docs/#/manipulating/end-of/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {string} unit time-unit
     * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
     * @returns {moment.Moment|*}
     */
    self.endOfDateTime = function (dateTime, unit, formatType) {
        var oDateTime = getDateTimeObj(dateTime);
        oDateTime.endOf(unit);
        return returnMomentObjIfNoFormatType(oDateTime, formatType);
    };
    /**
     * get date-time with UTC
     * please refer {@link http://momentjs.com/docs/#/parsing/utc/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
     * @returns {*}
     */
    self.getUtc = function (dateTime, formatType) {
        var oDateTime = getDateTimeObj(dateTime);
        oDateTime.utc();
        return returnMomentObjIfNoFormatType(oDateTime, formatType);
    };
    /**
     * compare date-time if before target
     * please refer {@link http://momentjs.com/docs/#/query/is-before/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {?string|object} targetDateTime the str with date-time format, or moment-obj
     * @param {string} [unit] time-unit
     * @returns {*}
     */
    self.isBeforeDateTime = function (dateTime, targetDateTime, unit) {
        var oDateTime = getDateTimeObj(dateTime);
        var oDateTime2 = getDateTimeObj(targetDateTime);
        return oDateTime.isBefore(oDateTime2, unit);
    };
    /**
     * check date-time if after target
     * please refer {@link http://momentjs.com/docs/#/query/is-after/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {?string|object} targetDateTime the str with date-time format, or moment-obj
     * @param {string} [unit] time-unit
     * @returns {*}
     */
    self.isAfterDateTime = function (dateTime, targetDateTime, unit) {
        var oDateTime = getDateTimeObj(dateTime);
        var oDateTime2 = getDateTimeObj(targetDateTime);
        return oDateTime.isAfter(oDateTime2, unit);
    };
    /**
     * check date-time if same as target
     * please refer {@link http://momentjs.com/docs/#/query/is-same/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {?string|object} targetDateTime the str with date-time format, or moment-obj
     * @param {string} [unit] time-unit
     * @returns {*}
     */
    self.isSameDateTime = function (dateTime, targetDateTime, unit) {
        var oDateTime = getDateTimeObj(dateTime);
        var oDateTime2 = getDateTimeObj(targetDateTime);
        return oDateTime.isSame(oDateTime2, unit);
    };
    /**
     * check if a moment is between two other moments
     * please refer {@link http://momentjs.com/docs/#/query/is-between/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @param {?string|object} dateTime1 the str with date-time format, or moment-obj
     * @param {?string|object} dateTime2 the str with date-time format, or moment-obj
     * @param {string} [unit] time-unit
     * @returns {*}
     */
    self.isBetweenDateTime = function (dateTime, dateTime1, dateTime2, unit) {
        var oDateTime = getDateTimeObj(dateTime);
        var oDateTime1 = getDateTimeObj(dateTime1);
        var oDateTime2 = getDateTimeObj(dateTime2);
        return oDateTime.isBetween(oDateTime1, oDateTime2, unit);
    };
    /**
     * validate is date-time format
     * please refer {@link http://momentjs.com/docs/#/utilities/invalid/}
     * @param {?string|object} dateTime the str with date-time format, or moment-obj
     * @returns {*}
     */
    self.isValidDateTime = function (dateTime) {
        var oDateTime = getDateTimeObj(dateTime);
        return oDateTime.isValid();
    };
    /**
     * get different between 2 date-time
     * please refer {@link http://momentjs.com/docs/#/displaying/difference/}
     * @param {?string|object} dateTime1 the str with date-time format, or moment-obj
     * @param {?string|object} dateTime2 the str with date-time format, or moment-obj
     * @param {string} [unit] time-unit
     * @param {boolean} [withFloat=false]
     * @returns {number|*}
     */
    self.getDateTimeDiff = function (dateTime1, dateTime2, unit, withFloat) {
        withFloat = withFloat === true;
        var oDateTime1 = getDateTimeObj(dateTime1);
        var oDateTime2 = getDateTimeObj(dateTime2);
        return oDateTime1.diff(oDateTime2, unit, withFloat);
    };
})();
(function () {
    if (typeof module === 'undefined' && typeof exports === 'undefined') {
        return;
    }
    var self = caro;
    var nFs = require('fs');
    var fileSizeUnits1 = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var fileSizeUnits2 = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var getFileSize = function (path) {
        var status = caro.getFsStat(path);
        if (status) {
            return status.size;
        }
        if (caro.isNum(path)) {
            return path;
        }
        return null;
    };

    // FILE --
    /**
     * read file content, return false if failed
     * @param {string} path
     * @param {?string} [encoding=utf8]
     * @param {?string} [flag=null]
     * @returns {*}
     */
    self.readFileCaro = function (path, encoding, flag) {
        encoding = encoding || 'utf8';
        flag = flag || null;
        try {
            return nFs.readFileSync(path, {
                encoding: encoding,
                flag: flag
            });
        } catch (e) {
            return false;
        }
    };
    /**
     * write data to file, return false if failed
     * @param {string} path
     * @param {*} data
     * @param {?string} [encoding=utf8]
     * @param {?string} [flag=null]
     * @returns {*}
     */
    self.writeFileCaro = function (path, data, encoding, flag) {
        encoding = encoding || 'utf8';
        flag = flag || null;
        try {
            nFs.writeFileSync(path, data, {
                encoding: encoding,
                flag: flag
            });
            return true;
        } catch (e) {
            return false;
        }
    };
    /**
     * @param {...string} path
     * @returns {boolean}
     */
    self.deleteFile = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                nFs.unlinkSync(arg);
            } catch (e) {
                pass = false;
            }
        });
        return pass;
    };
    // DIR --
    /**
     * check if empty-folder, return false if anyone is false
     * @param {...string} path
     * @returns {boolean}
     */
    self.isEmptyDir = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isFsDir(arg)) {
                var count = 0;
                caro.readDirCb(arg, function () {
                    count++;
                });
                if (count > 0) {
                    pass = false;
                    return false;
                }
                return true;
            }
            else {
                pass = false;
                return false;
            }
        });
        return pass;
    };
    /**
     * get files under path
     * @param {string} path
     * @param {object} [opt]
     * @param {number} [opt.maxLevel=0] the dir-level you want to read, get all-level when 0
     * @param {boolean} [opt.getDir=true] if return dir-path
     * @param {boolean} [opt.getFile=true] if return file-path
     * @param {boolean|string|[]} [opt.getByExtend=false] if set as string, will only return files including same extend-name
     * @param {function(object)} [cb] cb with file-info
     * @returns {*}
     */
    self.readDirCb = function (path, opt, cb) {
        if (!caro.isFsDir(path)) {
            return;
        }
        var countLevel = 0;
        caro.eachObj(arguments, function (i, arg) {
            if (i === 0) {
                return;
            }
            if (caro.isObj(arg)) {
                opt = arg;
            }
            if (caro.isFn(arg)) {
                cb = arg;
            }
        });
        opt = opt || {};
        cb = cb || null;
        var maxLevel = opt.maxLevel ? parseInt(opt.maxLevel, 10) : 1;
        var getDir = opt.getDir !== false;
        var getFile = opt.getFile !== false;
        var getByExtend = (function () {
            var r = false;
            if (opt.getByExtend) {
                r = caro.splitStr(opt.getByExtend, ',');
                caro.eachObj(r, function (i, extendName) {
                    r[i] = caro.addHead(extendName, '.');
                });
            }
            return r;
        })();
        var pushFile = function (oFileInfo) {
            var extendName = oFileInfo.extendName;
            if (getByExtend && getByExtend.indexOf(extendName) < 0) {
                return;
            }
            caro.executeIfFn(cb, oFileInfo);
        };
        var readDir = function (rootPath, level) {
            if (!caro.isFsDir(rootPath)) {
                return;
            }
            var files = nFs.readdirSync(rootPath);
            if (maxLevel > 0 && level >= maxLevel) {
                return;
            }
            level++;
            caro.eachObj(files, function (i, basename) {
                var filename = caro.getFileName(basename, false);
                var extendName = caro.getExtendName(basename);
                var filePath = caro.normalizePath(rootPath, basename);
                var dirPath = caro.getDirPath(filePath);
                var fullPath = caro.coverToFullPath(filePath);
                var fullDirPath = caro.getDirPath(fullPath);
                var fileType = caro.getFileType(filePath);
                var oFileInfo = {
                    filename: filename,
                    extendName: extendName,
                    basename: basename,
                    filePath: filePath,
                    dirPath: dirPath,
                    fullPath: fullPath,
                    fullDirPath: fullDirPath,
                    fileType: fileType,
                    level: level - 1,
                    index: i
                };
                if (caro.isFsDir(filePath)) {
                    if (getDir) {
                        pushFile(oFileInfo);
                    }
                    readDir(filePath, level);
                    return;
                }
                if (caro.isFsFile(filePath)) {
                    if (getFile) {
                        pushFile(oFileInfo);
                    }
                }
            });
        };
        readDir(path, countLevel);
    };
    /**
     * create dir recursively, will create folder if path not exists
     * @param {string} path
     * @returns {*|string}
     */
    self.createDir = function (path) {
        path = caro.normalizePath(path);
        // [\\] for windows, [/] for linux
        var aPath = caro.splitStr(path, ['\\', '/']);
        var subPath = '';
        try {
            caro.eachObj(aPath, function (i, eachDir) {
                subPath = caro.normalizePath(subPath, eachDir);
                var exists = caro.fsExists(subPath);
                if (!exists) {
                    nFs.mkdirSync(subPath);
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    };
    /**
     * delete folder recursively
     * @param {string} path
     * @param {boolean} [force=false] force-delete even not empty
     * @returns {boolean}
     */
    self.deleteDir = function (path, force) {
        if (!caro.isFsDir(path)) {
            return false;
        }
        path = caro.normalizePath(path);
        force = force === true;
        var pass = true;
        var deleteUnderDir = function (rootPath, getFile) {
            getFile = getFile !== false;
            caro.readDirCb(rootPath, function (oFilInfo) {
                var filePath = oFilInfo.filePath;
                if (caro.isFsDir(filePath)) {
                    if (force) {
                        deleteUnderDir(filePath);
                        try {
                            nFs.rmdirSync(filePath);
                        } catch (e) {
                            pass = false;
                        }
                    }
                    return;
                }
                if (!caro.deleteFile(filePath)) {
                    pass = false;
                }
            }, {
                getFile: getFile
            });
        };
        deleteUnderDir(path, false);
        if (caro.isEmptyDir(path)) {
            nFs.rmdirSync(path);
        }
        return pass;
    };
    // COMMON --
    /**
     * check file if exists, return false when anyone is false
     * @param {...string} path
     * @returns {*}
     */
    self.fsExists = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                if (!nFs.existsSync(arg)) {
                    pass = false;
                    return false;
                }
            } catch (e) {
                pass = false;
                return false;
            }
            return true;
        });
        return pass;
    };
    /**
     * check if folder, return false when anyone is false
     * @param {...string} path
     * @returns {*}
     */
    self.isFsDir = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                var stat = caro.getFsStat(arg);
                pass = stat.isDirectory();
            } catch (e) {
                pass = false;
                return false;
            }
            return true;
        });
        return pass;
    };
    /**
     * @param {...string} path
     * @returns {*}
     */
    self.isFsFile = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                var stat = caro.getFsStat(arg);
                pass = stat.isFile();
            } catch (e) {
                pass = false;
                return false;
            }
            return true;
        });
        return pass;
    };
    /**
     * check if symbolic link
     * @param {...string} path
     * @returns {*}
     */
    self.isFsSymlink = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                var stat = caro.getFsStat(arg);
                pass = stat.isSymbolicLink();
            } catch (e) {
                pass = false;
                return false;
            }
            return true;
        });
        return pass;
    };
    /**
     * @param {string} path
     * @returns {string}
     */
    self.getFileType = function (path) {
        var r = '';
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
     * delete file or dir or link, return false delete failed
     * @param {...string} path
     * @param {boolean} [force]
     * @returns {boolean}
     */
    self.deleteFs = function (path, force) {
        var pass = true;
        var aPath = [];
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isBool(arg)) {
                force = arg;
                return;
            }
            if (caro.isStr(arg)) {
                aPath.push(arg);
            }
        });
        try {
            caro.eachObj(aPath, function (i, path) {
                if (caro.isFsDir(path)) {
                    if (!caro.deleteDir(path, force)) {
                        pass = false;
                    }
                    return;
                }
                if (!caro.deleteFile(path)) {
                    pass = false;
                }
            });
        } catch (e) {
            pass = false;
        }
        return pass;
    };
    /**
     * @param {string|...[]} path the file-path, you can also set as [path,newPath]
     * @param {string|...[]} newPath the new-path, you can also set as [path,newPath]
     * @param {boolean} [force] will create folder if there is no path for newPath
     * @returns {boolean}
     */
    self.renameFs = function (path, newPath, force) {
        var pass = true;
        var aPath = [];
        if (caro.isStr(path, newPath)) {
            aPath.push([path, newPath]);
        }
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isArr(arg)) {
                aPath.push(arg);
            }
            if (caro.isBool(arg)) {
                force = arg;
            }
        });
        // e.g. aPath=[[path, path2],[path3, path4]]
        caro.eachObj(aPath, function (i, pathMap) {
            var path1 = pathMap[0];
            var path2 = pathMap[1];
            try {
                if (force && caro.fsExists(path1)) {
                    var dirPath2 = caro.getDirPath(path2);
                    caro.createDir(dirPath2);
                }
                nFs.renameSync(path1, path2);
                if (!caro.fsExists(path2)) {
                    pass = false;
                }
            } catch (e) {
                pass = false;
            }
        });
        return pass;
    };
    /**
     * get file stat
     * @param {string} path
     * @param {string} [type=l] s = statSync, l = lstatSync, f = fstatSync
     * @returns {*}
     */
    self.getFsStat = function (path, type) {
        var stat = null;
        var aType = ['l', 's', 'f'];
        type = aType.indexOf(type) > -1 ? type : aType[0];
        try {
            switch (type) {
                case 's':
                    stat = nFs.lstatSync(path);
                    break;
                case 'f':
                    stat = nFs.fstatSync(path);
                    break;
                default :
                    stat = nFs.statSync(path);
                    break;
            }
        } catch (e) {
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
    self.getFsSize = function (path, fixed, unit) {
        var bytes = getFileSize(path);
        if (bytes === null) {
            return bytes;
        }
        caro.eachObj(arguments, function (i, arg) {
            if (i <= 0) {
                return;
            }
            if (caro.isNum(arg)) {
                fixed = parseInt(arg);
            }
            if (caro.isStr(arg)) {
                unit = arg;
            }
        });
        fixed = fixed || 1;
        var si = true;
        var index1 = fileSizeUnits1.indexOf(unit);
        var index2 = fileSizeUnits2.indexOf(unit);
        if (index2 > -1) {
            si = false;
        }
        var thresh = si ? 1000 : 1024;
        var index = si ? index1 : index2;
        var count = 0;
        if (index < 0) {
            return bytes;
        }
        do {
            bytes /= thresh;
            ++count;
        } while (count < index);
        return bytes.toFixed(fixed);
    };
    /**
     * get file size for human-reading
     * @param {number|string} path file-path or bytes
     * @param {number} [fixed=1] decimals of float
     * @param {boolean} [si=true] size-type, true decimal, false as binary
     * @returns {string}
     */
    self.humanFeSize = function (path, fixed, si) {
        var bytes = getFileSize(path);
        if (bytes === null) {
            return bytes;
        }
        caro.eachObj(arguments, function (i, arg) {
            if (i <= 0) {
                return;
            }
            if (caro.isNum(arg)) {
                fixed = parseInt(arg);
            }
            if (caro.isBool(arg)) {
                si = arg;
            }
        });
        fixed = fixed || 1;
        si = si !== false;
        var thresh = si ? 1000 : 1024;
        if (bytes < thresh) return bytes + ' B';
        var aUnit = si ? fileSizeUnits1 : fileSizeUnits2;
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (bytes >= thresh);
        return bytes.toFixed(fixed) + ' ' + aUnit[u];
    };
})();
(function () {
    'use strict';
    var self = caro;

    /**
     * check if arg is bool | str | num
     * @param {...} arg
     * @returns {boolean}
     */
    self.isBasicVal = function (arg) {
        return caro.checkIfPassCb(arguments, function (arg) {
            // return false if arg is not bool | str | num
            return !(!caro.isBool(arg) && !caro.isStr(arg) && !caro.isNum(arg));
        });
    };
    /**
     * check if value is empty ( {} | [] | null | '' | undefined )
     * @param {...} arg
     * @returns {boolean}
     */
    self.isEmptyVal = function (arg) {
        return caro.checkIfPassCb(arguments, function (arg) {
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
    self.isTrue = function (arg) {
        return caro.checkIfPassCb(arguments, function (arg) {
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
    self.isFalse = function (arg) {
        return caro.checkIfPassCb(arguments, function (arg) {
            if (caro.isStr(arg)) {
                arg = arg.toLowerCase();
            }
            return arg === false || arg === 'false' || arg === 0;
        });
    };
    /**
     * check all argument in arr by check-function, get false if check-function return false
     * @param {[]} arr
     * @param {function} checkFn
     * @param {boolean} [needAllPass=true] when returnIfAllPass=true, return true when all check-result are true
     * @returns {boolean}
     */
    self.checkIfPassCb = function (arr, checkFn, needAllPass) {
        needAllPass = needAllPass !== false;
        if (!Array.isArray(arr) && typeof arr !== 'object' || arr === null || !caro.isFn(checkFn)) {
            return false;
        }
        caro.eachObj(arr, function (i, arg) {
            var result = caro.executeIfFn(checkFn, arg);
            // need all pass, but result is false || no-need all pass, and result is true
            if ((needAllPass && result === false) || (!needAllPass && result === true)) {
                needAllPass = !needAllPass;
                return false;
            }
            return true;
        });
        return needAllPass;
    };
    /**
     * execute if first-argument is function
     * @param {function} fn
     * @param {...*} args function-arguments
     * @returns {*}
     */
    self.executeIfFn = function (fn, args) {
        var otherArgs = [];
        var r;
        caro.eachObj(arguments, function (i, arg) {
            if (i === 0 && caro.isFn(arg)) {
                fn = arg;
                return;
            }
            otherArgs.push(arg);
        });
        if (fn) {
            r = fn.apply(fn, otherArgs);
        }
        return r;
    };
    /**
     * get function name
     * @param {*} fn
     * @returns {string|*|String}
     */
    self.getFnName = function (fn) {
        if (!caro.isFn(fn)) {
            return null;
        }
        var r = fn.toString();
        r = r.substr('function '.length);
        r = r.substr(0, r.indexOf('('));
        return r;
    };
    /**
     * cover to arr
     * @param arg
     * @returns {*}
     */
    self.coverToArr = function (arg) {
        if (caro.isArr(arg)) {
            return arg;
        }
        return [arg];
    };
    /**
     * cover to str, will return '' if force!=false
     * @param arg
     * @param {boolean} [force=true] if return str
     * @returns {*}
     */
    self.coverToStr = function (arg, force) {
        if (caro.isStr(arg)) {
            return arg;
        }
        force = force !== false;
        if (arg === undefined) {
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
                // cover fn to str first, and not replace \r\n
                caro.coverFnToStrInObj(arg, {
                    replaceWrap: false
                });
                // after cover to json, replace \\r\\n to wrap
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
        if (force) {
            return '';
        }
        return arg;
    };
    /**
     * cover to int, will return 0 if force!=false
     * @param arg
     * @param {boolean} [force=true] if return int
     * @returns {*}
     */
    self.coverToInt = function (arg, force) {
        var int = parseInt(arg);
        force = force !== false;
        if (caro.isEmptyVal(int) && !force) {
            return arg;
        }
        int = int || 0;
        return int;
    };
    /**
     * cover to num,, will return 0 if force not false
     * @param arg
     * @param {boolean} [force=true]  if return num
     * @returns {*}
     */
    self.coverToNum = function (arg, force) {
        var int = parseFloat(arg);
        force = force !== false;
        if (caro.isEmptyVal(int) && !force) {
            return arg;
        }
        int = int || 0;
        return int;
    };
    /**
     * cover to obj, will return {} if force!=false
     * @param arg
     * @param {boolean} [force=true] if return object
     * @returns {*}
     */
    self.coverToObj = function (arg, force) {
        if (caro.isObj(arg)) {
            return arg;
        }
        force = force !== false;
        if (caro.isJson(arg)) {
            return JSON.parse(arg);
        }
        if (force) {
            return {};
        }
        return arg;
    };
    /**
     * @param arg
     * @param {object} [opt]
     * @param {boolean} [opt.force=true] if force cover to JSON
     * @param {function=null} [opt.replacer] the replace-function in each element
     * @param {space=4} [opt.space] the space for easy-reading after cover to JSON
     * @returns {*}
     */
    self.coverToJson = function (arg, opt) {
        var force = true;
        var replacer = null;
        var space = 4;
        var json = '';
        if (opt) {
            force = opt.force !== false;
            replacer = opt.replacer || replacer;
            space = opt.space !== undefined ? opt.space : space;
        }
        if (space) {
            json = JSON.stringify(arg, replacer, space);
        } else {
            json = JSON.stringify(arg, replacer);
        }
        if (caro.isJson(json) || !force) {
            return json;
        }
        return '';
    };
})();
(function () {
    if (typeof module === 'undefined' && typeof exports === 'undefined') {
        return;
    }
    var self = caro;
    var normalizeLogPath = function (logPath) {
        logPath = caro.normalizePath(logPath);
        return caro.addTail(logPath, '.log');
    };

    /**
     * read log-file ,and create it if not exists
     * @param logPath
     * @returns {*}
     */
    self.readLog = function (logPath) {
        logPath = normalizeLogPath(logPath);
        try {
            if (!caro.fsExists(logPath)) {
                return null;
            }
            return caro.readFileCaro(logPath);
        } catch (e) {
            console.error('caro.log', e);
            return null;
        }
    };
    /**
     * write log-file with data
     * create empty-file if data is empty
     * @param logPath
     * @param [data]
     * @returns {*}
     */
    self.writeLog = function (logPath, data) {
        data = data || '';
        logPath = normalizeLogPath(logPath);
        try {
            var size = caro.getFsSize(logPath);
            var maxSize = Math.pow(10, 6);
            if (size > maxSize) {
                console.error('caro.log: ', logPath + ' size ' + size + ' is more thane 1 MB');
                return;
            }
            data = caro.coverToStr(data);
            caro.writeFileCaro(logPath, data);
        } catch (e) {
            console.error('caro.log: ', e);
        }
    };
    /**
     * update log data
     * OPT
     * ifWrap: bool (default: true) - add wrap with add-data
     * prepend: bool (default: false) - add data in front of origin-data
     *
     * @param logPath
     * @param data
     * @param [opt]
     */
    self.updateLog = function (logPath, data, opt) {
        var originData = caro.readLog(logPath);
        var wrap = '\r\n';
        var ifWrap = true;
        var prepend = false;
        if (opt) {
            ifWrap = opt.ifWrap !== false;
            prepend = opt.prepend === true;
        }
        originData = originData || '';
        data = caro.coverToStr(data);
        if (originData && ifWrap) {
            if (prepend) {
                data += wrap;
            }
            else {
                originData += wrap;
            }
        }
        if (prepend) {
            data += originData;
        }
        else {
            data = originData + data;
        }
        caro.writeLog(logPath, data);
    };
    self.updateLogWithDayFileName = function (logPath, data, opt) {
        var today = caro.formatNow('YYYYMMDD');
        logPath = caro.addTail(logPath, '_' + today);
        caro.updateLog(logPath, data, opt);
    };
    /**
     * convenient-logger to [trace.log]
     * @param data
     * @param [opt]
     */
    self.traceLog = function (data, opt) {
        var logPath = 'trace';
        caro.updateLog(logPath, data, opt);
    };
})();
(function () {
    var self = caro;
    /**
     * change obj string-value by key, will change-all if aKey is empty
     * support-type: upper/lower/upperFirst
     * @param {object} obj
     * @param {string} type=upper|lower|upperFirst support-type
     * @param {string[]|[]} [keys] the assign-keys
     * @param {object} [opt]
     * @param {boolean} [opt.clone=false] if clone for not replacing original
     * @returns {*}
     */
    var changeStrValByObjKey = function (obj, type, keys, opt) {
        var aType = ['upper', 'lower', 'upperFirst'];
        if (!caro.isObj(obj) || aType.indexOf(type) < 0) {
            return obj;
        }
        var objRet = obj;
        var clone = false;
        if (opt) {
            clone = opt.clone === true;
        }
        if (clone) {
            objRet = caro.cloneObj(obj);
        }
        keys = keys || caro.getKeysInObj(objRet);
        keys = caro.splitStr(keys, ',');
        caro.eachObj(keys, function (i, key) {
            if (!caro.keysInObj(objRet, key)) {
                return;
            }
            var val = objRet[key];
            switch (type) {
                case 'upper':
                    objRet[key] = caro.upperStr(val);
                    break;
                case 'lower':
                    objRet[key] = caro.lowerStr(val);
                    break;
                case 'upperFirst':
                    objRet[key] = caro.upperFirst(val);
                    break;
            }
        });
        return objRet;
    };

    /**
     * like jQuery.each function
     * @param {object} obj
     * @param {function} cb callback-fn for each key & val
     */
    self.eachObj = function (obj, cb) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (parseInt(i) == i) {
                    i = parseInt(i);
                }
                if (cb && cb(i, obj[i]) === false) {
                    break;
                }
            }
        }
    };
    /**
     * @param {object} obj
     * @returns {Number}
     */
    self.getObjLength = function (obj) {
        return Object.keys(obj).length;
    };
    /**
     * extend obj similar jQuery.extend
     * @param {object} obj1
     * @param {object} obj2
     * @param {boolean} [deep=true]
     * @returns {*}
     */
    self.extendObj = function (obj1, obj2, deep) {
        deep = deep !== false;
        caro.eachObj(obj2, function (key, val) {
            if (deep) {
                obj1[key] = caro.cloneObj(val, deep);
                return;
            }
            obj1[key] = val;
        });
        return obj1;
    };
    /**
     * clone obj, will clone all under obj when deep !== false
     * @param {object} obj
     * @param {boolean} [deep=true]
     * @returns {*}
     */
    self.cloneObj = function (obj, deep) {
        deep = deep !== false;
        var clone = function (obj) {
            if (!caro.isObj(obj)) {
                return obj;
            }
            var copy = obj.constructor();
            caro.eachObj(obj, function (key, val) {
                if (deep) {
                    copy[key] = clone(val);
                    return;
                }
                copy[key] = val;
            });
            return copy;
        };
        return clone(obj);
    };
    /**
     * copy obj-value by key
     * @param {object} obj
     * @param {string[]|string} keys the element that want to copy by keys
     * @param {object} [opt]
     * @param {boolean} [opt.clone=true] if clone for not replacing original
     * @param {boolean} [opt.keep=true] if keep original element
     * @returns {{}}
     */
    self.copyByObjKey = function (obj, keys, opt) {
        var clone = true;
        var keep = true;
        var obj2 = {};
        keys = caro.splitStr(keys, ',');
        if (opt) {
            clone = opt.clone !== false;
            keep = opt.keep !== false;
        }
        caro.eachObj(keys, function (i, key) {
            if (clone)
                obj2[key] = caro.cloneObj(obj[key]);
            else
                obj2[key] = obj[key];
            if (!keep)
                delete obj[key];
        });
        return obj2;
    };
    /**
     * replace key in object
     * @param {object} obj
     * @param {function({})} cb callback-fn that include key, and return new-key if you want to replace
     * @param {object} [opt]
     * @param {boolean} [opt.clone=false] if clone for not replacing original
     * @returns {*}
     */
    self.replaceObjKey = function (obj, cb, opt) {
        var objRet = obj;
        var clone = false;
        if (opt) {
            clone = opt.clone === true;
        }
        if (clone) {
            objRet = caro.cloneObj(obj);
        }
        caro.eachObj(objRet, function (key, val) {
            var newKey = caro.executeIfFn(cb, key);
            if (newKey) {
                objRet[newKey] = val;
                delete objRet[key];
            }
        });
        return objRet;
    };
    /**
     * @param {object} obj
     * @param {function({})} cb callback-fn that include value, and return new-value if you want to replace
     * @param {object} [opt]
     * @param {boolean} [opt.deep=false] if deep-replace when element is obj
     * @param {boolean} [opt.clone=false] if clone for not replacing original
     * @returns {*}
     */
    self.replaceObjVal = function (obj, cb, opt) {
        var oClone = obj;
        var deep = false;
        var clone = false;
        var coverObjVal = function (o) {
            caro.eachObj(o, function (key, val) {
                if (caro.isObj(val) && deep) {
                    coverObjVal(val);
                    return;
                }
                var newVal = caro.executeIfFn(cb, val);
                if (newVal !== undefined) {
                    o[key] = newVal;
                }
            });
        };
        if (opt) {
            deep = opt.deep !== false;
            clone = opt.clone === true;
        }
        if (clone) {
            oClone = caro.cloneObj(obj);
        }
        coverObjVal(oClone);
        return oClone;
    };
    /**
     * @param {object} obj
     * @param {string[]|[]} [keys] the assign-keys
     * @param {object} [opt]
     * @param {boolean} [opt.clone=false] if clone for not replacing original
     * @returns {*}
     */
    self.upperCaseByObjKey = function (obj, keys, opt) {
        changeStrValByObjKey(obj, 'upper', keys, opt);
        return obj;
    };
    /**
     * @param {object} obj
     * @param {string[]|[]} [keys] the assign-keys
     * @param {object} [opt]
     * @param {boolean} [opt.clone=false] if clone for not replacing original
     * @returns {*}
     */
    self.lowerCaseByObjKey = function (obj, keys, opt) {
        changeStrValByObjKey(obj, 'lower', keys, opt);
        return obj;
    };
    /**
     * @param {object} obj
     * @param {string[]|[]} [keys] the assign-keys
     * @param {object} [opt]
     * @param {boolean} [opt.clone=false] if clone for not replacing original
     * @returns {*}
     */
    self.upperFirstByObjKey = function (obj, keys, opt) {
        changeStrValByObjKey(obj, 'upperFirst', keys, opt);
        return obj;
    };
    /**
     * @param {object} obj
     * @param {object} [opt]
     * @param {boolean} [opt.deep=true] if deep-replace when element is obj
     * @param {boolean} [opt.clone=false] if clone for not replacing original
     * @returns {*}
     */
    self.trimObjVal = function (obj, opt) {
        var deep = true;
        var clone = false;
        var objRet = obj;
        if (opt) {
            deep = opt.deep !== false;
            clone = opt.clone === true;
        }
        if (clone) {
            objRet = caro.cloneObj(obj);
        }
        caro.eachObj(objRet, function (key, val) {
            if (caro.isObj(val) && deep) {
                objRet[key] = caro.trimObjVal(val, opt);
            }
            if (caro.isStr(val)) {
                objRet[key] = val.trim();
            }
        });
        return objRet;
    };
    /**
     * check if key exists in obj, will return false when key not exist,no matter that other-keys are
     * @param {object} obj
     * @param {string[]|string} keys the keys that want to validate
     * @returns {boolean}
     */
    self.keysInObj = function (obj, keys) {
        if (!caro.isObj(obj)) {
            return false;
        }
        var pass = true;
        keys = caro.splitStr(keys, ',');
        caro.eachObj(keys, function (i, key) {
            if (!obj.hasOwnProperty(key)) {
                pass = false;
                return false;
            }
            return true;
        });
        return pass;
    };
    /**
     * get keys in obj, and get all if levelLimit = 0
     * @param {object} obj
     * @param {number} [levelLimit=1] the level of obj you want to get keys
     * @returns {Array}
     */
    self.getKeysInObj = function (obj, levelLimit) {
        var arr = [];
        if (!caro.isObj(obj)) {
            return arr;
        }
        var levelCount = 0;
        var getKey = function (obj) {
            levelCount++;
            caro.eachObj(obj, function (key, val) {
                if (levelLimit > 0 && levelCount > levelLimit) {
                    return;
                }
                arr.push(key);
                if (caro.isObj(val)) {
                    getKey(val);
                }
            });
            levelCount--;
        };
        obj = obj || {};
        levelLimit = (caro.coverToInt(levelLimit) > -1) ? levelLimit : 1;
        getKey(obj);
        return arr;
    };
    /**
     * @param {object} obj
     * @param {object} [opt]
     * @param {boolean} [opt.replaceWrap=true] if replace \r\n
     */
    self.coverFnToStrInObj = function (obj, opt) {
        var replaceWrap = true;
        if (opt) {
            replaceWrap = opt.replaceWrap !== false;
        }
        caro.eachObj(obj, function (key, val) {
            if (caro.isObj(val)) {
                caro.coverFnToStrInObj(val);
                return;
            }
            if (caro.isFn(val)) {
                var fnStr = val.toString();
                if (replaceWrap) {
                    fnStr = caro.replaceAll(fnStr, '\r', '');
                    fnStr = caro.replaceAll(fnStr, '\n', '');
                }
                obj[key] = fnStr;
            }
        });
        return obj;
    };
})();
(function () {
    if (typeof module === 'undefined' && typeof exports === 'undefined') {
        return;
    }
    var self = caro;
    var nPath = require('path');
    var absolutePath = (typeof (__dirname) !== 'undefined') ? __dirname : '';
    /**
     * set absolute root path
     * @param path
     * @returns {String}
     */
    self.setAbsolutePath = function (path) {
        path = caro.coverToStr(path);
        absolutePath = path;
        return absolutePath;
    };
    /**
     *
     * @returns {String}
     */
    self.getAbsolutePath = function () {
        return absolutePath;
    };
    /**
     * check if path contain absolute root path
     * @param {*} path
     * @returns {boolean}
     */
    self.isFullPath = function (path) {
        path = caro.normalizePath(path);
        return (path.indexOf(absolutePath) === 0);
    };
    /**
     * get dir-path of path
     * @param {string} path
     * @returns {string}
     */
    self.getDirPath = function (path) {
        return nPath.dirname(path);
    };
    /**
     * get file name from path
     * OPT
     * full: bool (default: true) - if get full file name
     * @param {string} path
     * @param {boolean} [getFull] return basename if true
     * @returns {*}
     */
    self.getFileName = function (path, getFull) {
        getFull = getFull !== false;
        if (!getFull) {
            var extendName = caro.getExtendName(path);
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
    self.getExtendName = function (path, withDot) {
        var extendName = nPath.extname(path);
        withDot = withDot !== false;
        if (!withDot) {
            extendName = extendName.replace('.', '');
        }
        return extendName;
    };
    /**
     * @param {...} path
     * @returns {string|*}
     */
    self.normalizePath = function (path) {
        var args = [];
        caro.eachObj(arguments, function (i, arg) {
            args[i] = caro.coverToStr(arg);
        });
        return nPath.join.apply(nPath, args);
    };
    /**
     * auto add server root-path if not exist
     * @param {...} path
     * @returns {*|string}
     */
    self.coverToFullPath = function (path) {
        path = caro.normalizePath.apply(this, arguments);
        if (!caro.isFullPath(path)) {
            path = nPath.join(absolutePath, path);
        }
        return path;
    };
})();
(function () {
    var self = caro;
    var changeCase = function (str, type, opt) {
        var r = [];
        var aType = ['toUpperCase', 'toLowerCase'];
        var start = null;
        var end = null;
        var force = true;
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
        type = (aType.indexOf(type) > -1) ? type : aType[0];
        start = caro.coverToInt(start);
        end = caro.coverToInt(end);
        r.push(str.slice(0, start));
        if (end) {
            r.push((str.slice(start, end))[type]());
            r.push(str.slice(end));
        } else {
            r.push((str.slice(start))[type]());
        }
        return r.join('');
    };

    self.isUpper = function (str) {
        str = caro.coverToStr(str, true);
        var upp = str.toUpperCase();
        return upp === str;
    };
    self.isJson = function (arg) {
        try {
            JSON.parse(arg);
        } catch (e) {
            return false;
        }
        return true;
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
    self.random = function (len, opt) {
        var text = '';
        var chars = [];
        var lower = true;
        var upper = true;
        var num = true;
        var exclude = [];
        len = (parseInt(len)) ? parseInt(len) : 1;
        if (opt) {
            lower = opt.lower !== false;
            upper = opt.upper !== false;
            num = opt.num !== false;
            exclude = opt.exclude || exclude;
        }
        if (lower)
            chars.push('abcdefghijklmnopqrstuvwxyz');
        if (upper)
            chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (num)
            chars.push('0123456789');
        chars = chars.join('');
        // cover to array if string
        exclude = caro.splitStr(exclude, ',');
        caro.eachObj(exclude, function (i, excludeStr) {
            chars = caro.replaceAll(String(chars), excludeStr, '');
        });
        for (var i = 0; i < len; i++)
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        return text;
    };
    /**
     * check str if ("true" | not-empty) / ("false" | empty) and covert to boolean
     * @param {string} str
     * @returns {boolean}
     */
    self.toBool = function (str) {
        if (!caro.isStr(str)) {
            return false;
        }
        if (!str) {
            // return false when str is empty
            return false;
        }
        str = str.toLowerCase();
        // return false when str='false', otherwise return true
        return (str != 'false');
    };
    /**
     * check if charts has in head of string
     * @param str
     * @param str2
     * @returns {*}
     */
    self.hasHead = function (str, str2) {
        if (!caro.isStr(str)) return false;
        if (!caro.isStr(str2)) return false;
        var index = str.indexOf(str2);
        return index === 0;
    };
    /**
     * add the head to string if not exist
     * @param {string} str
     * @param {string} addStr
     * @returns {*}
     */
    self.addHead = function (str, addStr) {
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
    self.hasTail = function (str, str2) {
        if (!caro.isStr(str)) return false;
        if (!caro.isStr(str2)) return false;
        var index = str.lastIndexOf(str2);
        var strLength = str.length;
        var strLength2 = str2.length;
        return strLength > strLength2 && index === strLength - strLength2;
    };
    /**
     * add the tail to string if not exist
     * @param {string} str
     * @param {string} addStr
     * @returns {*}
     */
    self.addTail = function (str, addStr) {
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
    self.wrapToBr = function (str) {
        if (!caro.isStr(str)) return str;
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
    self.brToWrap = function (str) {
        if (!caro.isStr(str)) return str;
        var regex = /<br\s*[\/]?>/gi;
        return str.replace(regex, "\n");
    };
    /**
     * split to array by '\r\n' | '\n' | '\r'
     * @param {string} str
     * @returns {*}
     */
    self.splitByWrap = function (str) {
        if (!caro.isStr(str)) return str;
        var aWrap = ['\r\n', '\r', '\n'];
        return caro.splitStr(str, aWrap);
    };
    /**
     * escape RegExp
     * @param {string} str
     * @returns {*|string}
     */
    self.escapeRegExp = function (str) {
        if (!caro.isStr(str)) return str;
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    };
    /**
     * TODO
     * replace all find in str
     * @param {string} str
     * @param {string} find
     * @param {string} replace
     * @returns {*|string}
     */
    self.replaceAll = function (str, find, replace) {
        if (!caro.isStr(str) || !caro.isStr(find) || !caro.isStr(replace)) return str;
        find = caro.escapeRegExp(find);
        var regex = new RegExp(find, "g");
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
    self.formatMoney = function (str, type, opt) {
        var r = [];
        var isObj = caro.isObj;
        var isStr = caro.isStr;
        var float = 2;
        var decimal = '.';
        var separated = ',';
        var prefix = '';
        caro.eachObj(arguments, function (i, arg) {
            if (i === '0') {
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
        }
        else if (type === 'int') {
            float = 0;
        } else if (isObj(opt)) {
            float = (float = Math.abs(opt.float)) > -1 ? float : 2;
            decimal = isStr(opt.decimal) ? opt.decimal : decimal;
            separated = isStr(opt.separated) ? opt.separated : separated;
            prefix = isStr(opt.prefix) ? opt.prefix : prefix;
        }
        var s = str < 0 ? '-' : '';
        var iStr = parseInt(Math.abs(str || 0).toFixed(float)).toString();
        var sepLength = (iStr.length > 3 ) ? (iStr.length % 3) : 0;
        var retStr = s + (sepLength ? iStr.substr(0, sepLength) + separated : '') + iStr.substr(sepLength).replace(/(\d{3})(?=\d)/g, '$1' + separated) + (float ? decimal + Math.abs(str - iStr).toFixed(float).slice(2) : '');
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
    self.insertBlankBefUpper = function (str) {
        if (!caro.isStr(str)) return str;
        var indexCount = 0;
        var aStr = str.split('');
        var aStrClone = caro.cloneArr(aStr);
        caro.eachObj(aStrClone, function (i, char) {
            var isUpper = caro.isUpper(char);
            if (indexCount > 0 && isUpper) {
                // add ' ' before upper-char
                aStr.splice(indexCount, 0, ' ');
                // aStr length + 1 after add ' ', so indexCount++;
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
    self.upperStr = function (str, opt) {
        return changeCase(str, 'upperCase', opt);
    };
    /**
     * @param {string} str
     * @returns {}
     */
    self.upperFirst = function (str) {
        if (!caro.isStr(str)) return str;
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
    self.lowerStr = function (str, opt) {
        return changeCase(str, 'toLowerCase', opt);
    };
    /**
     * @param {string} str
     * @param {boolean} [force=true] if force cover to str
     * @returns {}
     */
    self.trimStr = function (str, force) {
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
    self.splitStr = function (str, splitter, force) {
        if (caro.isArr(str)) {
            return str;
        }
        if (splitter === undefined) {
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
        // get mainSplit first
        // e.g. splitter=['a','ab','c']; => mainSplit='c'
        var mainSplit = splitter[0];
        caro.eachObj(splitter, function (j, eachSplit2) {
            if (mainSplit.length >= eachSplit2.length) {
                mainSplit = eachSplit2;
            }
        });
        if (!mainSplit) {
            return str;
        }
        // replace all splitter to mainSplitter
        // e.g. str='caro.huang, is handsome'; splitter=['.', ',']; => str='caro,huang, is handsome'
        caro.eachObj(splitter, function (i, eachSplit) {
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
    self.serializeUrl = function (url, oArgs, coverEmpty) {
        var count = 0;
        var aArgs = ['?'];
        url = caro.coverToStr(url);
        oArgs = caro.coverToObj(oArgs);
        coverEmpty = coverEmpty === true;
        caro.eachObj(oArgs, function (key, val) {
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
(function () {
    'use strict';
    var self = caro;
    var checkType = function (args, type) {
        var pass = true;
        caro.eachObj(args, function (i, arg) {
            if (typeof arg !== type) {
                pass = false;
            }
        });
        return pass;
    };

    /**
     * @param {...} arg
     * @returns {boolean}
     */
    self.isBool = function (arg) {
        return checkType(arguments, 'boolean');
    };
    /**
     * @param {...} arg
     * @returns {boolean}
     */
    self.isStr = function (arg) {
        return checkType(arguments, 'string');
    };
    /**
     * @param {...} arg
     * @returns {boolean}
     */
    self.isFn = function (arg) {
        return checkType(arguments, 'function');
    };
    /**
     * @param {...} arg
     * @returns {boolean}
     */
    self.isNum = function (arg) {
        return checkType(arguments, 'number');
    };
    /**
     * @param {...} arg
     * @returns {boolean}
     */
    self.isInt = function (arg) {
        if (!checkType.apply(null, arguments)) {
            return false;
        }
        return caro.checkIfPassCb(arguments, function (val) {
            var int = parseInt(val);
            return int === val;
        });
    };
    /**
     * @param {...} arg
     * @returns {*}
     */
    self.isArr = function (arg) {
        return caro.checkIfPassCb(arguments, function (val) {
            return Array.isArray(val);
        });
    };
    /**
     * @param {...} arg
     * @returns {*}
     */
    self.isNull = function (arg) {
        return caro.checkIfPassCb(arguments, function (val) {
            return val === null;
        });
    };
    /**
     * @param {...} arg
     * @returns {boolean}
     */
    self.isObj = function (arg) {
        if (!checkType(arguments, 'object')) {
            return false;
        }
        return caro.checkIfPassCb(arguments, function (val) {
            // Note: array and null is object in js
            return !caro.isNull(val) && !caro.isArr(val);
        });
    };
    /**
     * @param {...} arg
     * @returns {boolean}
     */
    self.isRegExp = function (arg) {
        return caro.checkIfPassCb(arguments, function (val) {
            return val instanceof RegExp;
        });
    };
    /* -------------------- Node.js only -------------------- */
    if (typeof module === 'undefined' && typeof exports === 'undefined') {
        return;
    }
    /**
     * @param {...} arg
     * @returns {Boolean}
     */
    self.isBuf = function (arg) {
        return caro.checkIfPassCb(arguments, function (val) {
            // Buffer is only working on node.js
            try {
                return Buffer.isBuffer(val);
            } catch (e) {
                return false;
            }
        });
    };
})();