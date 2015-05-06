/**
 * Helper
 * @namespace caro
 * @author Caro.Huang
 */
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
        caro.eachArgs(arguments, function (i, arg) {
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
     * like caor.eachObj, but key is integer
     * @param args should be arguments (obj with numeric-key)
     * @param cb
     */
    self.eachArgs = function (args, cb) {
        for (var i in args) {
            if (args.hasOwnProperty(i)) {
                i = parseInt(i);
                if (cb && cb(i, args[i]) === false) {
                    break;
                }
            }
        }
    };
    /**
     * get arguments, and return as arr
     * @param args should be arguments (obj with numeric-key)
     * @returns {Array}
     */
    self.getArgumentsAsArr = function (args) {
        var r = [];
        caro.eachObj(args, function (i, val) {
            r.push(val);
        });
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