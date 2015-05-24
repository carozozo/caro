
/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * covert to string if element is function in object
   * @param {object} obj
   * @param {boolean} [replaceWrap=true] if replace \r\n
   */
  self.coverFnToStrInObj = function(obj, replaceWrap) {
    if (replaceWrap == null) {
      replaceWrap = true;
    }
    caro.forEach(obj, function(val, key) {
      var fnStr;
      if (caro.isPlainObject(val)) {
        caro.coverFnToStrInObj(val);
      } else if (caro.isFunction(val)) {
        fnStr = val.toString();
        if (replaceWrap) {
          fnStr = fnStr.replace(/([\r]\s*|[\n]\s*)/g, '');
        } else {
          fnStr = fnStr.replace(/[\r]\s*/g, '\r ');
          fnStr = fnStr.replace(/[\n]\s*/g, '\n ');
        }
        obj[key] = fnStr;
      }
    });
    return obj;
  };
})();
