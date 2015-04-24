/**
 * The helper of common fns
 * @author Caro.Huang
 */
caroh.helper = (function () {
    var self = {};

    self.isBool = function (arg) {
        return typeof(arg) === 'boolean';
    };
    self.isStr = function (arg) {
        return typeof(arg) === 'string';
    };
    self.isNum = function (arg) {
        return typeof(arg) === 'number';
    };
    self.isFn = function (arg) {
        return typeof(arg) === 'function';
    };
    self.isObj = function (arg) {
        // Note: array and null is object in js
        return typeof(arg) === 'object' && arg !== null && !self.isArr(arg);
    };
    self.isArr = function (arg) {
        return Array.isArray(arg);
    };
    self.isBasicVal = function (arg) {
        return self.isBool(arg) || self.isStr(arg) || self.isNum(arg);
    };
    /**
     * check if value is empty ({}/[]/undefined/null/'')
     * @param val
     * @returns {boolean}
     */
    self.isEmptyVal = function (val) {
        if (self.isObj(val)) {
            return tl.object.getObjLength(val) < 1;
        }
        if (self.isArr(val)) {
            return val.length < 1;
        }
        return !val && val !== 0;
    };
    self.isTrue = function (arg) {
        return arg === true || arg === 'true' || arg == 1;
    };
    self.notFalse = function (arg) {
        return arg !== false || arg !== 'false' || arg !== 0;
    };
    /**
     * execute if first-argument is function
     * ex.
     * executeIfFn(fn,arg1,arg2,...)
     * will return value as fn(arg1,arg2,...)
     * @returns {*}
     */
    self.executeIfFn = function () {
        var fn = null;
        var otherArgs = [];
        tl.object.eachObj(arguments, function (i, arg) {
            if (self.isFn(arg)) {
                fn = arg;
                return;
            }
            otherArgs.push(arg);
        });
        if (fn) {
            fn = fn.apply(fn, otherArgs);
        }
        return fn;
    };
    self.composePhoneNum = function (countryCode, areaCode, phoneNumber) {
        countryCode = self.isStr(countryCode) ? '+' + countryCode : '';
        areaCode = self.isStr(areaCode) ? areaCode : '';
        phoneNumber = self.isStr(phoneNumber) ? phoneNumber : '';
        var arr = [countryCode, areaCode, phoneNumber];
        return arr.join(' ');
    };
    self.coverToArr = function (arg) {
        if (caro.lHelper.isArr(arg)) {
            return arg;
        }
        return [arg];
    };
    self.coverToStr = function (arg, opt) {
        var force = true;
        if (opt) {
            force = opt.force !== false;
        }
        if (self.isStr(arg)) {
            return arg;
        }
        if (arg && self.isFn(arg.toString)) {
            return arg.toString();
        }
        if (force) return '';
        return arg;
    };
    self.coverToInt = function (arg, opt) {
        var force = true;
        var int = parseInt(arg);
        if (opt) {
            force = opt.force !== false;
        }
        if (self.isEmptyVal(int) && !force) {
            return arg;
        }
        int = int || 0;
        return int;
    };
    self.coverToObj = function (arg, opt) {
        var force = true;
        if (self.isObj(arg)) return arg;
        if (opt) {
            force = opt.force !== false;
        }
        if (tl.string.isJson(arg)) {
            return JSON.parse(arg);
        }
        if (force) {
            return {};
        }
        return arg;
    };
    /**
     * check if has same value with assigned-key in obj
     * EX
     * obj1 = {a: 1, b: 2};
     * obj2 = {a: 'a', b: 1, c: 3, d: 4};
     * hasSameValInObj([obj1, 'a'], [obj2, 'b']) => compare obj1[a] === obj2[b] => true
     * hasSameValInObj([obj1, 'a'], [obj2, 'b', 'c']) => compare obj1[a] === obj2[b] => true
     * hasSameValInObj(obj1, obj2, 'a'); => compare obj1[a] === obj2[a] => false
     * hasSameValInObj(obj1, obj2, 'd'); => compare obj1[d] === obj2[d] => false
     * @param arr1
     * @param arr2
     * @param [key]
     * @returns {boolean}
     */
    self.hasSameValInObj = function (arr1, arr2, key) {
        var validate = true;
        var getObjAndKeys = function (arr) {
            // arr assign-format should like [obj,key1,key2...]
            // validate will be false if arr not match the assign-format
            var obj = {};
            var aKey = [];
            tl.object.eachObj(arr, function (i, arg) {
                if (i === 0) {
                    if (self.isObj(arg)) {
                        obj = arg;
                        return true;
                    }
                    validate = false;
                    return validate;
                }
                if (self.isStr(arg)) {
                    aKey.push(arg);
                    return true;
                }
                validate = false;
                return validate;
            });
            return {
                obj: obj,
                aKey: aKey
            };
        };
        // ex. arr1 = [{a: 1, b: 2}, 'a'], arr1 = [{a: 1, b: 1, c: 3, d: 4}, 'b']
        // => compare arr1[a] === arr2[b]
        validate = self.isArr(arr1) && self.isArr(arr2) && arr1.length <= arr2.length;
        if (!validate) {
            // ex. arr1 = {a: 1, b: 2}, arr2 = {a: 1, b: 1, c: 3, d: 4}, key = 'a'
            // compare arr1[a] === arr2[a]
            validate = self.isObj(arr1) && self.isObj(arr2) && self.isStr(key);
            if (!validate) {
                return validate;
            }
            // cover arguments to assign-format
            arr1 = [arr1, key];
            arr2 = [arr2, key];
        }
        var objAndKeys = getObjAndKeys(arr1);
        if (!validate) {
            // arr1 not match the assign-format
            return validate;
        }
        var obj1 = objAndKeys.obj;
        var aKey1 = objAndKeys.aKey;
        objAndKeys = getObjAndKeys(arr2);
        if (!validate) {
            // arr2 not match the assign-format
            return validate;
        }
        var obj2 = objAndKeys.obj;
        var aKey2 = objAndKeys.aKey;
        tl.object.eachObj(aKey1, function (i, key1) {
            var key2 = aKey2[i];
            if (!tl.object.keyInObj(obj1, key1) || !tl.object.keyInObj(obj2, key2)) {
                validate = false;
                return false;
            }
            var val1 = obj1[key1];
            var val2 = obj2[key2];
            if (val1 !== val2) {
                validate = false;
                return false;
            }
            return true;
        });
        return validate;
    };

    /**
     * convenience formatting to full-string of start-of-day
     * EX.
     * 2013-01-01 23:00:00 => 2013-01-01 00:00:00
     * 2013-01-01 00:00:00 => 2013-01-01T00:00:00.000+0800
     * 2013-01-01T00:00:00.000+0800 => 2013-01-01T00:00:00.000%2B0800
     * @param date
     * @returns {*}
     */
    self.encodeStartOfDayFull = function (date) {
        if (date) {
            date = tl.dateTime.startOf(date, 'day');
            date = tl.dateTime.formatFull(date);
            date = tl.string.encodeUrl(date);
        }
        return date;
    };
    /**
     * convenience formatting to full-string of end-of-day
     * EX.
     * 2013-01-01 01:00:00 => 2013-01-01 23:59:59
     * 2013-01-01 23:59:59 => 2013-01-01T23:59:59.999+0800
     * 2013-01-01T23:59:59.999+0800 => 2013-01-01T23:59:59.999%2B0800
     * @param date
     * @returns {*}
     */
    self.encodeEndOfDayFull = function (date) {
        if (date) {
            date = tl.dateTime.endOf(date, 'day');
            date = tl.dateTime.formatFull(date);
            date = tl.string.encodeUrl(date);
        }
        return date;
    };
    return self;
})();