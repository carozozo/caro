/**
 * The helper of common arr functions
 * @namespace caro
 * @author Caro.Huang
 */
(function (fn) {
    caro.setCaro(fn);
})(function (self) {
    /**
     * clone arr
     * @param arr {[]}
     * @returns {Array}
     */
    self.cloneArr = function (arr) {
        return arr.slice(0);
    };
    /**
     * extend arr
     * @param  {...[]} arr the arr that want to extend
     * @param {boolean} [opt.duplicate] if extend duplicate-val
     * @returns {Array}
     */
    self.extendArr = function (arr) {
        var firstArr = null;
        var otherArr = [];
        var opt = null;
        var duplicate = false;
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
            if (caro.isObj(arg)) {
                opt = arg;
            }
        });
        if (opt) {
            duplicate = opt.duplicate === true;
        }
        caro.eachObj(otherArr, function (i, eachArr) {
            extend(eachArr);
        });
        return firstArr;
    };
    /**
     * sort arr by key if value is obj
     * @param arr {[]}
     * @param key {string}
     * @param sort {boolean?true}
     * @returns {Array}
     */
    self.sortByObjKey = function (arr, key, sort) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        sort = (sort !== false);
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
     * @param arr {[]}
     * @returns {*}
     */
    self.sumOfArr = function (arr) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        var sum = 0;
        caro.eachObj(arr, function (i, val) {
            if (caro.isNum(val)) {
                sum += val;
            }
        });
        return sum;
    };
    /**
     * remove item from arr by index
     * @param arr {[]}
     * @param i {number}
     * @returns {*}
     */
    self.removeByIndex = function (arr, i) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        if (i > -1) {
            arr.splice(i, 1);
        }
        return arr;
    };
    /**
     * remove the item from arr
     * @param arr {[]}
     * @param val {*}
     * @returns {*}
     */
    self.removeByArrVal = function (arr, val) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        var index = arr.indexOf(val);
        return caro.removeByIndex(arr, index);
    };
    /**
     * remove duplicate-val in arr
     * @param arr {[]}
     * @returns {*}
     */
    self.removeDup = function (arr) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        var aUnique = [];
        caro.eachObj(arr, function (i, el) {
            if (aUnique.indexOf(el) < 0) {
                aUnique.push(el);
            }
        });
        return aUnique;
    };
    /**
     * add the val into arr if not exists
     * @param arr {[]}
     * @param val {...*}
     * @returns {*}
     */
    self.pushNoDup = function (arr, val) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        caro.eachObj(arguments, function (i, val) {
            if (i !== 0) {
                if (arr.indexOf(val) > -1) {
                    return true;
                }
                arr.push(val);
            }
            return true;
        });
        return arr;
    };
    /**
     * will not push to arr if value is empty
     * @param arr {[]}
     * @param val {...*}
     * @returns {*}
     */
    self.pushNoEmpty = function (arr, val) {
        if (!caro.isArr(arr)) {
            return arr;
        }
        caro.eachObj(arguments, function (i, val) {
            if (i !== '0') {
                if (caro.isEmptyVal(val)) {
                    return true;
                }
                arr.push(val);
            }
            return true;
        });
        return arr;
    };
    /**
     * check if empty-value in arr
     * @param arr {[]}
     * @returns {boolean}
     */
    self.hasEmptyInArr = function (arr) {
        if (!caro.isArr(arr)) {
            return true;
        }
        var hasEmpty = false;
        arr = caro.coverToArr(arr);
        caro.eachObj(arr, function (i, val) {
            if (caro.isEmptyVal(val)) {
                hasEmpty = true;
                return false;
            }
            return true;
        });
        return hasEmpty;
    };
});