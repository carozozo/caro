/**
 * The helper of common fns
 * @namespace caro
 * @author Caro.Huang
 */
module.exports = (function () {
    "use strict";
    var self = {};

    /**
     * @param arg
     * @returns {boolean}
     */
    self.isBool = function (arg) {
        return typeof arg === 'boolean';
    };
    /**
     * @param arg
     * @returns {boolean}
     */
    self.isStr = function (arg) {
        return typeof arg === 'string';
    };
    /**
     * @param arg
     * @returns {boolean}
     */
    self.isNum = function (arg) {
        return typeof(arg) === 'number';
    };
    /**
     * @param arg
     * @returns {boolean}
     */
    self.isFn = function (arg) {
        return typeof(arg) === 'function';
    };
    /**
     * @param arg
     * @returns {boolean}
     */
    self.isObj = function (arg) {
        // Note: array and null is object in js
        return typeof(arg) === 'object' && arg !== null && !caro.isArr(arg);
    };
    /**
     * @param arg
     * @returns {*}
     */
    self.isArr = function (arg) {
        return Array.isArray(arg);
    };
    /**
     * check if arg is bool | str | num
     * @param arg
     * @returns {boolean}
     */
    self.isBasicVal = function (arg) {
        return caro.isBool(arg) || caro.isStr(arg) || caro.isNum(arg);
    };
    /**
     * check if value is empty ({}/[]/undefined/null/'')
     * @param arg
     * @returns {boolean}
     */
    self.isEmptyVal = function (arg) {
        if (caro.isObj(arg)) {
            return caro.getObjLength(arg) < 1;
        }
        if (caro.isArr(arg)) {
            return arg.length < 1;
        }
        return !arg && arg !== 0;
    };
    /**
     * check if value is true | 'true' | 1
     * @param arg
     * @returns {boolean}
     */
    self.isTrue = function (arg) {
        if (caro.isStr(arg)) {
            arg = arg.toLowerCase();
        }
        return arg === true || arg === 'true' || arg === 1;
    };
    /**
     * check if value is false | 'false' | 0
     * @param arg
     * @returns {boolean}
     */
    self.isFalse = function (arg) {
        if (self.isStr(arg)) {
            arg = arg.toLowerCase();
        }
        return arg === false || arg === 'false' || arg === 0;
    };
    /**
     * execute if first-argument is function
     * @param {function} fn
     * @param {...*} args function-arguments
     * @returns {*}
     */
    self.executeIfFn = function (fn, args) {
        fn = null;
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
     * @param {object} [opt]
     * @param {boolean} [opt.force=true] if return str
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
        if (arg !== undefined && caro.isFn(arg.toString)) {
            return arg.toString();
        }
        if (force) {
            return '';
        }
        return arg;
    };
    /**
     * cover to int, will return 0 if opt.force not false
     * @param arg
     * @param {object} [opt]
     * @param {boolean} [opt.force=true] if return int
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
     * @param {object} [opt]
     * @param {boolean} [opt.force=true]  if return num
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
     * @param {object} [opt]
     * @param {boolean} [opt.force=true] if return object
     * @returns {*}
     */
    self.coverToObj = function (arg, opt) {
        var force = true;
        if (caro.isObj(arg)) {
            return arg;
        }
        if (opt) {
            force = opt.force !== false;
        }
        if (caro.isJSON(arg)) {
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
     * @param {function=null} [opt.replace] the replace-function in each element
     * @param {space=4} [opt.space] the space for easy-reading after cover to JSON
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
        if (caro.isJSON(json) || !force) {
            return json;
        }
        return '';
    };
    return self;
})();