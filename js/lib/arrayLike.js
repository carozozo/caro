
/**
 * Array
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var pushValToObjOrArr, self;
  self = caro;
  pushValToObjOrArr = function(arg, key, val) {
    if (caro.isArr(arg)) {
      arg.push(val);
    } else if (caro.isObj(arg)) {
      arg[key] = val;
    }
  };
  self.extend = function(deep, arg) {
    var firstArg;
    if (deep == null) {
      deep = false;
    }
    firstArg = null;
    caro.eachArgs(arguments, function(key, arg) {
      if (key !== 0) {
        return false;
      }
      if (caro.isBool(arg)) {
        deep = arg;
        return false;
      }
      if (caro.isObjOrArr(arg)) {
        firstArg = arg;
        deep = false;
        return false;
      }
    });
    caro.eachArgs(arguments, function(key, arg) {
      if (!firstArg && caro.isObjOrArr(arg)) {
        firstArg = arg;
        return true;
      }
      return caro.each(arg, function(key, val) {
        if (firstArg.hasOwnProperty(key) && !deep) {
          return;
        }
        return pushValToObjOrArr(firstArg, key, val);
      });
    });
    return firstArg;
  };
  self.clone = function(arg) {
    if (!caro.isObjOrArr(arg)) {
      return arg;
    }
    return caro.extend({}, arg);
  };
})();
