/**
 * The helper of common array functions
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};

    self.extendArr = function (arr1, arr2, opt) {
        var noDuplicate = true;
        if (opt) {
            noDuplicate = opt.noDuplicate !== false;
        }
        caro.eachObj(arr2, function (i, eachVal) {
            if (noDuplicate) {
                self.pushNoDup(arr1, eachVal);
                return;
            }
            arr1.push(eachVal);
        });
        return arr1;
    };
    self.cloneArr = function (arr) {
        return arr.slice(0);
    };
    /**
     * sort arr by obj key
     * @param key
     * @param [sort]: bool (default: true for ASC)
     * @param arr
     * @returns {Array}
     */
    self.sortByObjKey = function (arr, key, sort) {
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
     * sum the value in array (number)
     */
    self.sumOfArr = function (arr) {
        var sum = 0;
        caro.eachObj(arr, function (i, val) {
            if (caro.isNum(val)) {
                sum += val;
            }
        });
        return sum;
    };
    /**
     * remove the item from array by index
     * @param arr
     * @param i
     * @returns {*}
     */
    self.removeByIndex = function (arr, i) {
        if (i > -1) {
            arr.splice(i, 1);
        }
        return arr;
    };
    /**
     * remove the item from array
     * @param arr
     * @param val
     * @returns {*}
     */
    self.removeByArrVal = function (arr, val) {
        var index = arr.indexOf(val);
        return self.removeByIndex(arr, index);
    };
    /**
     * remove duplicate value in arr
     * @returns {Array}
     */
    self.removeDup = function (arr) {
        var aUnique = [];
        caro.eachObj(arr, function (i, el) {
            (aUnique.indexOf(el) < 0) && aUnique.push(el);
        });
        return aUnique;
    };
    /**
     * add the val into array if not exists
     * @param arr
     * @param val
     * @returns {*}
     */
    self.pushNoDup = function (arr, val) {
        (arr.indexOf(val) < 0) && arr.push(val);
        return arr;
    };
    self.pushNoEmpty = function (arr, val) {
        if (caro.isEmptyVal(val)) {
            return arr;
        }
        arr.push(val);
        return arr;
    };
    /**
     * check if empty value in array
     * @param arr
     * @returns {boolean}
     */
    self.hasEmptyInArr = function (arr) {
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