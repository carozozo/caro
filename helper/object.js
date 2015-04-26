/**
 * The helper of common object functions
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};
    /**
     * change obj string-value by key, will change-all if aKey is empty
     * support-type: upper/lower/upperFirst
     * aKey can be separated-str/arr
     * OPT
     * clone: if use cloned obj for not replacing original obj
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
        var clone = false;
        if (opt) {
            clone = opt.clone === true;
        }
        if (clone) {
            objRet = caro.cloneObj(obj);
        }
        aKey = aKey || caro.getKeysInObj(objRet);
        aKey = caro.splitStr(aKey, ',');
        caro.eachObj(aKey, function (i, key) {
            if (!caro.keysInObj(objRet, key)) {
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
    /**
     * @param obj
     * @returns {Number}
     */
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
            if (!caro.isObj(obj)) {
                return obj;
            }
            var copy = obj.constructor();
            caro.eachObj(obj, function (key, val) {
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
     * copy obj-value by key
     * EX.
     * obj = { a:{}, b:'b', c:{ cc:'' } }
     * obj2 = extractByObjKey(obj, 'a,c') or extractByObjKey(obj, ['a', 'c'])
     * => obj = { b:'b' } , obj2 = { a:{}, c:{ cc:'' } }
     * @param keys
     * @param [opt]
     * @returns {{}}
     * @param obj
     */
    self.copyByObjKey = function (obj, keys, opt) {
        var deep = true;
        var keep = true;
        var obj2 = {};
        keys = caro.splitStr(keys, ',');
        if (opt) {
            deep = opt.deep !== false;
            keep = opt.keep !== false;
        }
        caro.eachObj(keys, function (i, key) {
            if (deep)
                obj2[key] = caro.cloneObj(obj[key]);
            else
                obj2[key] = obj[key];
            if (!keep)
                delete obj[key];
        });
        return obj2;
    };
    /**
     * replace key in object
     * OPT
     * clone: if use cloned-obj for not replacing original obj
     * EX
     * var obj1 = {a:1, b:2};
     * var obj2 = replaceObjKey(a, function (key) {
     *   if (key == 'b') { return 'bb' }
     *   return false;
     * },{clone:true});
     * => obj1 = {a:1, b:2};
     * => obj2 = {c:1, bb:2};
     * @param obj
     * @param replaceFn
     * @param [opt]
     * @returns {*}
     */
    self.replaceObjKey = function (obj, replaceFn, opt) {
        var objRet = obj;
        var clone = false;
        if (opt) {
            clone = opt.clone === true;
        }
        if (clone) {
            objRet = caro.cloneObj(obj);
        }
        caro.eachObj(objRet, function (key, val) {
            var newKey = caro.executeIfFn(replaceFn, key);
            if (newKey) {
                objRet[newKey] = val;
                delete objRet[key];
            }
        });
        return objRet;
    };
    /**
     * OPT
     * deep: bool (default: true) - if cover for loop
     * clone: bool (default: false) - if clone-object(will not change origin-object)
     *
     * EX
     * obj= { a: undefined, b: 'bb'}
     * replaceObjVal(obj, function(val){return 1;})
     * => obj= { a: 1, b: 1}
     * @param obj
     * @param replaceFn
     * @param [opt]
     */
    self.replaceObjVal = function (obj, replaceFn, opt) {
        var oClone = obj;
        var deep = false;
        var clone = false;
        var coverObjVal = function (o) {
            caro.eachObj(o, function (key, val) {
                if (caro.isObj(val) && deep) {
                    coverObjVal(val);
                    return;
                }
                var newVal = caro.executeIfFn(replaceFn, val);
                if (newVal !== undefined) {
                    o[key] = newVal;
                }
            });
        };
        if (opt) {
            deep = opt.deep !== false;
            clone = opt.clone === true;
        }
        if (clone) {
            oClone = caro.cloneObj(obj);
        }
        coverObjVal(oClone);
        return oClone;
    };
    /**
     * @param obj
     * @param aKey
     * @param opt
     * @returns {*}
     */
    self.upperCaseByObjKey = function (obj, aKey, opt) {
        changeStrValByObjKey(obj, 'upper', aKey, opt);
        return obj;
    };
    /**
     * @param obj
     * @param aKey
     * @param opt
     * @returns {*}
     */
    self.lowerCaseByObjKey = function (obj, aKey, opt) {
        changeStrValByObjKey(obj, 'lower', aKey, opt);
        return obj;
    };
    /**
     * @param obj
     * @param aKey
     * @param opt
     * @returns {*}
     */
    self.upperFirstByObjKey = function (obj, aKey, opt) {
        changeStrValByObjKey(obj, 'upperFirst', aKey, opt);
        return obj;
    };
    /**
     * @param obj
     * @param opt
     * @returns {*}
     */
    self.trimObjVal = function (obj, opt) {
        var clone = false;
        var objRet = obj;
        if (opt) {
            clone = opt.clone === true;
        }
        if (clone) {
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
     * keysInObj(a, 'key1') => true
     * keysInObj(a, ['key1','key2']) => true
     * keysInObj(a, ['key1','key3']) => false
     *
     * @param obj
     * @param keys
     * @returns {boolean}
     */
    self.keysInObj = function (obj, keys) {
        var pass = true;
        keys = caro.splitStr(keys, ',');
        caro.eachObj(keys, function (i, key) {
            if (!obj.hasOwnProperty(key)) {
                pass = false;
                return false;
            }
            return true;
        });
        console.log('pass=', pass);
        return pass;
    };
    /**
     * get keys in obj, and get all if levelLimit = 0
     * levelLimit default by 1
     * EX.
     * obj={a:'1', b:'2', c:'3', obj1:{ aa:'4',bb:'5'}}
     * getKeysInObj(obj);
     * =>['a','b','c','obj1']
     * getKeysInObj(obj, 0);
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
        levelLimit = (caro.coverToInt(levelLimit) > -1) ? levelLimit : 1;
        getKey(obj);
        return arr;
    };
    /**
     * OPT
     * replaceWrap: bool (default: true) - if replace \r\n
     * @param obj
     * @param [opt]
     */
    self.coverFnToStrInObj = function (obj, opt) {
        var replaceWrap = true;
        if (opt) {
            replaceWrap = opt.replaceWrap !== false;
        }
        caro.eachObj(obj, function (key, val) {
            if (caro.isObj(val)) {
                caro.coverFnToStrInObj(val);
                return;
            }
            if (caro.isFn(val)) {
                var fnStr = val.toString();
                if (replaceWrap) {
                    fnStr = caro.replaceAll(fnStr, '\r', '');
                    fnStr = caro.replaceAll(fnStr, '\n', '');
                }
                obj[key] = fnStr;
            }
        });
        return obj;
    };
    return self;
})();