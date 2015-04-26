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
        return typeof(arg) === 'object' && arg !== null && !caro.isArr(arg);
    };
    self.isArr = function (arg) {
        return Array.isArray(arg);
    };
    self.isBasicVal = function (arg) {
        return caro.isBool(arg) || caro.isStr(arg) || caro.isNum(arg);
    };
    /**
     * check if value is empty ({}/[]/undefined/null/'')
     * @param val
     * @returns {boolean}
     */
    self.isEmptyVal = function (val) {
        if (caro.isObj(val)) {
            return caro.getObjLength(val) < 1;
        }
        if (caro.isArr(val)) {
            return val.length < 1;
        }
        return !val && val !== 0;
    };
    self.isTrue = function (arg) {
        if (caro.isStr(arg))  arg = arg.toLowerCase();
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
        var ret;
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isFn(arg)) {
                fn = arg;
                return;
            }
            otherArgs.push(arg);
        });
        if (fn) {
            ret = fn.apply(fn, otherArgs);
        }
        return ret;
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
        if (caro.isStr(arg)) {
            return arg;
        }
        if (caro.isObj(arg)) {
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
        if (arg!==undefined && caro.isFn(arg.toString)) {
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
        if (caro.isEmptyVal(int) && !force) {
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
        if (caro.isEmptyVal(int) && !force) {
            return arg;
        }
        int = int || 0;
        return int;
    };
    /**
     * cover to obj, will return {} if opt.force not false
     * @param arg
     * @param opt
     * @returns {*}
     */
    self.coverToObj = function (arg, opt) {
        var force = true;
        if (caro.isObj(arg)) return arg;
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
    /**
     * OPT
     * force: bool (default: true) - if force-cover
     * replace: fn (default: null) - the replace-fn in each element
     * space: int (default:2) - the space for easy-read
     * @param arg
     * @param [opt]
     * @returns {*}
     */
    self.coverToJson = function (arg, opt) {
        var force = true;
        var replace = null;
        var space = 4;
        var json = '';
        if (opt) {
            force = opt.force !== false;
            replace = opt.replace || replace;
            space = opt.space !== undefined ? opt.space : space;
        }
        if (space) {
            json = JSON.stringify(arg, replace, space);
        } else {
            json = JSON.stringify(arg, replace);
        }
        if (caro.isJson(json) || !force) {
            return json;
        }
        return '';
    };
    return self;
})();