/**
 * The helper of common fns
 * @author Caro.Huang
 */
module.exports = (function () {
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
            return caro.getObjLength(val) < 1;
        }
        if (self.isArr(val)) {
            return val.length < 1;
        }
        return !val && val !== 0;
    };
    self.isTrue = function (arg) {
        if (self.isStr(arg))  arg = arg.toLowerCase();
        return arg === true || arg === 'true' || arg == 1;
    };
    self.isFalse = function (arg) {
        if (self.isStr(arg))  arg = arg.toLowerCase();
        return arg === false || arg === 'false' || arg == 0;
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
        caro.eachObj(arguments, function (i, arg) {
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
     * cover to str, will return '' if opt.force not false
     * @param arg
     * @param [opt]
     * @returns {*}
     */
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
    /**
     * cover to int, will return 0 if opt.force not false
     * @param arg
     * @param [opt]
     * @returns {*}
     */
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
    /**
     * cover to num,, will return 0 if opt.force not false
     * @param arg
     * @param [opt]
     * @returns {*}
     */
    self.coverToNum = function (arg, opt) {
        var force = true;
        var int = parseFloat(arg);
        if (opt) {
            force = opt.force !== false;
        }
        if (self.isEmptyVal(int) && !force) {
            return arg;
        }
        int = int || 0;
        return int;
    };
    /**
     * cover to obj, will return 0 if opt.force not false
     * @param arg
     * @param opt
     * @returns {*}
     */
    self.coverToObj = function (arg, opt) {
        var force = true;
        if (self.isObj(arg)) return arg;
        if (opt) {
            force = opt.force !== false;
        }
        if (caro.isJson(arg)) {
            return JSON.parse(arg);
        }
        if (force) {
            return {};
        }
        return arg;
    };
    return self;
})();