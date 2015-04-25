/**
 * The helper of common arr functions
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};

    /**
     * extend-arr, will return null if arguments is not arr
     * OPT.
     * duplicate: bool (default: true) - if content duplicate-value
     * EX.
     * caro.extendArr( [1, 2], [2, 4] ); => [1, 2, 4]
     * @returns {*}
     */
    self.extendArr = function () {
        var firstArr = null;
        var otherArr = [];
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isArr(arg)) {
                if (!firstArr)
                    firstArr = arg;
                else
                    otherArr.push(arg);
            }
            if (caro.isObj(arg)) {
                opt = arg;
            }
        });
        var opt = null;
        var duplicate = false;
        var extend = function (arr) {
            caro.eachObj(arr, function (i, eachVal) {
                if (!duplicate) {
                    caro.pushNoDup(firstArr, eachVal);
                    return;
                }
                firstArr.push(eachVal);
            });
        };
        if (opt) {
            duplicate = opt.duplicate !== false;
        }
        caro.eachObj(otherArr, function (i, eachArr) {
            extend(eachArr);
        });
        return firstArr;
    };
    /**
     * clone arr
     * @param arr
     * @returns {Array|string|*|Buffer|Blob}
     */
    self.cloneArr = function (arr) {
        return arr.slice(0);
    };
    /**
     * sort arr by key if value is obj
     * EX.
     * sortByObjKey( [ { name: 'c' }, 3, { name: 'a' },  ], 'name')
     * => sort arr by 'name'
     * => [ { name: 'a' }, { name: 'c' }, 3 ]
     * @param arr
     * @param key
     * @param [sort]: bool (default: true for ASC)
     * @returns {Array}
     */
    self.sortByObjKey = function (arr, key, sort) {
        if (!caro.isArr(arr)) return arr;
        sort = (sort !== false);
        arr.sort(function (a, b) {
            var order1 = a[key] || 0;
            var order2 = b[key] || 0;
            if (sort)
                return ((order1 < order2) ? -1 : ((order1 > order2) ? 1 : 0));
            return((order1 > order2) ? -1 : ((order1 < order2) ? 1 : 0));
        });
        return arr;
    };
    /**
     * sum the value in arr (number)
     */
    self.sumOfArr = function (arr) {
        if (!caro.isArr(arr)) return arr;
        var sum = 0;
        caro.eachObj(arr, function (i, val) {
            if (caro.isNum(val)) {
                sum += val;
            }
        });
        return sum;
    };
    /**
     * remove the item from arr by index
     * @param arr
     * @param i
     * @returns {*}
     */
    self.removeByIndex = function (arr, i) {
        if (!caro.isArr(arr)) return arr;
        if (i > -1) {
            arr.splice(i, 1);
        }
        return arr;
    };
    /**
     * remove the item from arr
     * @param arr
     * @param val
     * @returns {*}
     */
    self.removeByArrVal = function (arr, val) {
        if (!caro.isArr(arr)) return arr;
        var index = arr.indexOf(val);
        return caro.removeByIndex(arr, index);
    };
    /**
     * remove duplicate value in arr
     * @returns {Array}
     */
    self.removeDup = function (arr) {
        if (!caro.isArr(arr)) return arr;
        var aUnique = [];
        caro.eachObj(arr, function (i, el) {
            (aUnique.indexOf(el) < 0) && aUnique.push(el);
        });
        return aUnique;
    };
    /**
     * add the val into arr if not exists
     * @param arr
     * @param val
     * @returns {*}
     */
    self.pushNoDup = function (arr, val) {
        if (!caro.isArr(arr)) return arr;
        (arr.indexOf(val) < 0) && arr.push(val);
        return arr;
    };
    /**
     * will not push to arr if value is empty
     * @param arr
     * @param val
     * @returns {*}
     */
    self.pushNoEmpty = function (arr, val) {
        if (!caro.isArr(arr)) return arr;
        if (caro.isEmptyVal(val)) {
            return arr;
        }
        arr.push(val);
        return arr;
    };
    /**
     * check if empty-value in arr
     * @param arr
     * @returns {boolean}
     */
    self.hasEmptyInArr = function (arr) {
        if (!caro.isArr(arr)) return true;
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
    return self;
})();