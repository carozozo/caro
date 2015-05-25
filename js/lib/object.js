
/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * show object/array by string
   * @param {object} obj
   * @param {boolean} [wrap=false] if display with wrap
   */
  self.toWord = function(obj, wrap) {
    var json;
    if (wrap == null) {
      wrap = false;
    }
    json = '';
    caro.forEach(obj, function(val, key) {
      if (caro.isString(val)) {
        obj[key] = "'" + val + "'";
        return;
      }
      if (caro.isPlainObject(val) || caro.isArray(val)) {
        obj[key] = caro.toWord(val);
        return;
      }
      return obj[key] = caro.toString(val);
    });
    if (!wrap) {
      json = caro.toJson(obj);
    } else {
      json = caro.toJson(obj, null, 2);
    }
    return caro.replaceAll(json, '"', '');
  };
})();
