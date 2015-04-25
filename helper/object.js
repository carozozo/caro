/**
 * The helper of common object functions
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};
    /**
     * change obj string-value by key, will change-all if aKey is empty
     * support-type: upper/lower/upperFirst
     *
     * OPT
     * useClone: if use cloned obj for not replacing original obj
     * aKey can be separated-str/arr
     * @param obj
     * @param type
     * @param [aKey]
     * @param [opt]
     * @returns {*}
     */
    var changeStrValByObjKey = function (obj, type, aKey, opt) {
        var aType = ['upper', 'lower', 'upperFirst'];
        if (!caro.isObj(obj) || aType.indexOf(type) < 0) {
            return obj;
        }
        var objRet = obj;
        var useClone = false;
        if (opt) {
            useClone = opt.useClone === true;
        }
        if (useClone) {
            objRet = caro.cloneObj(obj);
        }
        aKey = aKey || caro.getKeysInObj(objRet);
        aKey = caro.splitStr(aKey, ',');
        caro.eachObj(aKey, function (i, key) {
            if (!caro.keyInObj(objRet, key)) {
                return;
            }
            var val = objRet[key];
            switch (type) {
                case 'upper':
                    objRet[key] = caro.upperStr(val);
                    break;
                case 'lower':
                    objRet[key] = caro.lowerStr(val);
                    break;
                case 'upperFirst':
                    objRet[key] = caro.upperFirst(val);
                    break;
            }
        });
        return objRet;
    };

    /**
     * like jQuery.each function
     * @param obj
     * @param cb
     */
    self.eachObj = function (obj, cb) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (cb && cb(i, obj[i]) === false) {
                    break;
                }
            }
        }
    };
    self.getObjLength = function (obj) {
        return Object.keys(obj).length;
    };
    /**
     * extend obj similar jQuery.extend
     * @param obj1
     * @param obj2
     * @param [deep]
     * @returns {*}
     */
    self.extendObj = function (obj1, obj2, deep) {
        deep = deep !== false;
        caro.eachObj(obj2, function (key, val) {
            if (deep) {
                obj1[key] = caro.cloneObj(val, deep);
                return;
            }
            obj1[key] = val;
        });
        return obj1;
    };
    /**
     * clone obj, if deep !== false, will clone all under obj
     * @returns {*}
     * @param obj
     * @param [deep]
     */
    self.cloneObj = function (obj, deep) {
        deep = deep !== false;
        var clone = function (obj) {
            if (typeof(obj) !== 'object') {
                return obj;
            }
            var copy = obj.constructor();
            $.each(obj, function (key, val) {
                if (deep) {
                    copy[key] = clone(val);
                    return;
                }
                copy[key] = val;
            });
            return copy;
        };
        return clone(obj);
    };
    /**
     * extract obj-value by key
     * EX.
     * obj = { a:{}, b:'b', c:{ cc:'' } }
     * obj2 = extractByObjKey(obj,'a,c') or extractByObjKey(obj,['a', 'c'])
     * => obj = { b:'b' } , obj2 = { a:{}, c:{ cc:'' } }
     * @param obj
     * @param keys
     * @returns {{}}
     */
    self.extractByObjKey = function (obj, keys) {
        keys = caro.splitStr(keys, ',');
        var obj2 = {};
        caro.eachObj(keys, function (i, key) {
            obj2[key] = obj[key];
            delete obj[key];
        });
        return obj2;
    };
    /**
     * copy obj-value by key
     * EX.
     * obj1={ a:'a', b:'b', c:'c' }
     * obj2={ a:'aa'}
     * copyByObjKey(obj1,obj2, 'a,b')
     * => obj2={ a:'a', b:'b' }
     * @param obj1
     * @param obj2
     * @param keys
     * @param [opt]
     * @returns {*}
     */
    self.copyByObjKey = function (obj1, obj2, keys, opt) {
        var useClone = false;
        if (opt) {
            useClone = opt.useClone === true;
        }
        keys = caro.splitStr(keys, ',');
        caro.eachObj(keys, function (i, key) {
            if (!useClone) {
                obj2[key] = obj1[key];
                return;
            }
            obj2[key] = caro.cloneObj(obj1[key]);
        });
        return obj2;
    };
    /**
     * replace key in object
     * OPT
     * useClone: if use cloned obj for not replacing original obj
     *
     * EX1
     * var obj = {a:1, b:2};
     * replaceObjKey(obj, 'a', 'c');
     * => obj = {c:1, b:2}
     *
     * EX2
     * var obj1 = {a:1, b:2};
     * var obj2 = replaceObjKey(obj, 'a','c',{useClone:true});
     * => obj1 = {a:1, b:2};
     * => obj2 = {c:1, b:2}
     *
     * @param obj
     * @param oldKey
     * @param newKey
     * @param [opt]
     * @returns {*}
     */
    self.replaceObjKey = function (obj, oldKey, newKey, opt) {
        var objRet = obj;
        var useClone = false;
        if (opt) {
            useClone = opt.useClone === true;
        }
        if (useClone) {
            objRet = caro.cloneObj(obj);
        }
        if (objRet.hasOwnProperty(oldKey)) {
            objRet[newKey] = objRet[oldKey];
            delete objRet[oldKey];
        }
        return objRet;
    };
    /**
     * replace key in object by keyMaps
     * OPT is same as [object.replaceObjKey]
     *
     * EX1
     * var obj = {a:1, b:2};
     * replaceObjKey(obj, [['a', 'c'],['b', 'd']]);
     * => obj = {c:1, d:2}
     *
     * EX2
     * var obj1 = {a:1, b:2};
     * var obj2 = replaceObjKey(obj, [['a', 'c'],['b', 'd']],{useClone:true});
     * => obj1 = {a:1, b:2};
     * => obj2 = {c:1, d:2}
     *
     * @param obj
     * @param aKeyMap
     * @param [opt]
     * @returns {*}
     */
    self.replaceObjKeys = function (obj, aKeyMap, opt) {
        caro.eachObj(aKeyMap, function (i, keyMap) {
            var oldKey = keyMap[0];
            var newKey = keyMap[1];
            obj = caro.replaceObjKey(obj, oldKey, newKey, opt);
        });
        return obj;
    };
    self.upperCaseByObjKey = function (obj, aKey, opt) {
        changeStrValByObjKey(obj, 'upper', aKey, opt);
        return obj;
    };
    self.lowerCaseByObjKey = function (obj, aKey, opt) {
        changeStrValByObjKey(obj, 'lower', aKey, opt);
        return obj;
    };
    self.upperFirstByObjKey = function (obj, aKey, opt) {
        changeStrValByObjKey(obj, 'upperFirst', aKey, opt);
        return obj;
    };
    /**
     * cover undefined to assigned-value
     * OPT
     * deep: bool (default: true) - if cover for loop
     * clone: bool (default: false) - if clone-object(will not change origin-object)
     *
     * EX
     * obj= { a: undefined, b: 'bb'}
     * coverUndefinedInObj(obj, null)
     * => obj= { a: null, b: 'bb'}
     * @param obj
     * @param [coverVal]
     * @param [opt]
     */
    self.coverUndefinedInObj = function (obj, coverVal, opt) {
        coverVal = (coverVal !== undefined) ? coverVal : null;
        var oClone = obj;
        var deep = true;
        var clone = false;
        if (opt) {
            deep = opt.deep !== false;
            clone = opt.clone === true;
        }
        if (clone) {
            oClone = caro.cloneObj(obj);
        }
        var coverObjVal = function (o) {
            caro.eachObj(o, function (key, val) {
                if (caro.isObj(val) && deep) {
                    coverObjVal(val);
                    return;
                }
                // cover undefined
                if (val === undefined) {
                    o[key] = coverVal;
                }
            });
        };
        coverObjVal(oClone);
        return oClone;
    };
    self.trimObjVal = function (obj, opt) {
        var useClone = false;
        var objRet = obj;
        if (opt) {
            useClone = opt.useClone === true;
        }
        if (useClone) {
            objRet = caro.cloneObj(obj);
        }
        caro.eachObj(objRet, function (key, val) {
            if (caro.isObj(val)) {
                objRet[key] = caro.trimObjVal(val, opt);
            }
            if (caro.isStr(val)) {
                objRet[key] = val.trim();
            }
        });
        return objRet;
    };
    /**
     * check if key exists in obj
     * EX
     * a= { key1: 1, key2: 2};
     * keyInObj(a, 'key1') => true
     * keyInObj(a, ['key1','key2']) => true
     * keyInObj(a, ['key1','key3']) => false
     *
     * @param obj
     * @param aKey
     * @returns {boolean}
     */
    self.keyInObj = function (obj, aKey) {
        var pass = true;
        aKey = caro.coverToArr(aKey);
        caro.eachObj(aKey, function (i, key) {
            if (!obj.hasOwnProperty(key)) {
                pass = false;
                return false;
            }
            return true;
        });
        return pass;
    };
    /**
     * get keys in obj, and get all if level = 0
     * EX.
     * obj={a:'1', b:'2', c:'3', obj1:{ aa:'4',bb:'5'}}
     * getKeysInObj(obj);
     * =>['a','b','c','obj1']
     * getKeysInObj(obj,0);
     * =>['a','b','c','obj1','aa','bb']
     * @param obj
     * @param [levelLimit]
     * @returns {Array}
     */
    self.getKeysInObj = function (obj, levelLimit) {
        var arr = [];
        if (!caro.isObj(obj)) {
            return arr;
        }
        var levelCount = 0;
        var getKey = function (obj) {
            levelCount++;
            caro.eachObj(obj, function (key, val) {
                if (levelLimit > 0 && levelCount > levelLimit) {
                    return;
                }
                arr.push(key);
                if (caro.isObj(val)) {
                    getKey(val);
                }
            });
            levelCount--;
        };
        obj = obj || {};
        levelLimit = (levelLimit > -1) ? levelLimit : 1;
        getKey(obj);
        return arr;
    };
    self.joinInObj = function (obj, aKey, symble) {
        var arr = [];
        aKey = caro.coverToArr(aKey);
        caro.eachObj(aKey, function (i, key) {
            caro.pushNoEmpty(arr, obj[key]);
        });
        return arr.join(symble);
    };
    /**
     * @param obj
     */
    self.coverFnToStrInObj = function (obj) {
        caro.eachObj(obj, function (key, val) {
            if (caro.isObj(val)) {
                caro.coverFnToStrInObj(val);
                return;
            }
            if (caro.isFn(val)) {
                var fnStr = val.toString();
                fnStr = caro.replaceAll(fnStr, '\r', '');
                fnStr = caro.replaceAll(fnStr, '\n', '');
                obj[key] = fnStr;
            }
        });
    };
    return self;
})();