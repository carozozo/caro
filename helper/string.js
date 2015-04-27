/**
 * The helper of common string functions
 * @namespace caro
 * @author Caro.Huang
 */
module.exports = (function () {
    // https://www.npmjs.com/package/validator
    var self = require('validator');
    var changeCase = function (str, type, opt) {
        var ret = [];
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
        ret.push(str.slice(0, start));
        if (end) {
            ret.push((str.slice(start, end))[type]());
            ret.push(str.slice(end));
        } else {
            ret.push((str.slice(start))[type]());
        }
        return ret.join('');
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
        return  (str != 'false');
    };
    /**
     * add the head to string if not exist
     * @param {string} str
     * @param {string} addStr
     * @returns {*}
     */
    self.addHead = function (str, addStr) {
        if (!caro.isStr(str)) return str;
        var index = str.indexOf(addStr);
        if (index !== 0) {
            str = addStr + str;
        }
        return str;
    };
    /**
     * add the tail to string if not exist
     * @param {string} str
     * @param {string} addStr
     * @returns {*}
     */
    self.addTail = function (str, addStr) {
        if (!caro.isStr(str)) return str;
        var index = str.lastIndexOf(addStr);
        var strLength = str.length;
        var addLength = addStr.length;
        if (strLength < addLength || index !== strLength - addLength) {
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
        ret = caro.splitStr(str, aWrap);
        return ret;
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
        var ret = [];
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
            ret.push(prefix);
        }
        ret.push(retStr);
        return ret.join(' ');
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
            var isUpper = caro.isUpperCase(char);
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
    return self;
})();