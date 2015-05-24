
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
    json = caro.toJson(obj);
    if (!wrap) {
      json = json.replace(/([\r]\s*|[\n]\s*)/g, '');
    }
    return caro.replaceAll(json, '"', '');
  };
})();
