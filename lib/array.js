/**
 * Array
 * @author Caro.Huang
 */
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
        var ret = [];
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
                ret.push(val);
            }
        });
        return ret;
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
        var ret = [];
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
                ret.push(val);
            }
        });
        return ret;
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
        var ret = [];
        caro.eachObj(arr, function (i, val) {
            if (ret.indexOf(val) < 0) {
                ret.push(val);
            }
        });
        return ret;
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
        var ret = caro.cloneArr(arr);
        caro.eachObj(arguments, function (i, val) {
            if (i === 0 || arr.indexOf(val) > -1) {
                return;
            }
            ret.push(val);
        });
        return ret;
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
        var ret = caro.cloneArr(arr);
        var aValNeedPush = [];

        caro.eachObj(arguments, function (i, arg) {
            if (i === 0 || caro.isEmptyVal(arg)) {
                return;
            }
            aValNeedPush.push(arg);
        });
        caro.eachObj(aValNeedPush, function (i, valNeedPush) {
            ret.push(valNeedPush);
        });
        return ret;
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