/**
 * TypeCheck
 * @namespace caro
 * @author Caro.Huang
 */
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
        return caro.checkIfPassCb(arguments, function (val) {
            // Note: array and null is object in js
            return checkType(arguments, 'object') && !caro.isNull(val) && !caro.isArr(val);
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