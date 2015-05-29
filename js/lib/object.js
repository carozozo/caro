
/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * display object/array by string
   * @param {object} obj
   * @param {number} spaceLength the space before each line
   */
  self.toWord = function(arg, spaceLength) {
    var toWord;
    toWord = function(arg, spaceLength, layer) {
      var fnSpace, fnSpaceLength, reg, ret, space;
      spaceLength = spaceLength || 2;
      layer = layer || 0;
      fnSpaceLength = layer * 2 + 6;
      space = caro.repeat(' ', spaceLength);
      fnSpace = caro.repeat(' ', fnSpaceLength);
      layer++;
      try {
        ret = JSON.stringify(arg, function(key, val) {
          if (!key) {
            return val;
          }
          return toWord(val, spaceLength, layer);
        }, spaceLength);
        ret = ret.replace(/\\r\\n/g, '\r\n' + space);
        ret = ret.replace(/\\r/g, '\r' + space);
        ret = ret.replace(/\\n/g, '\n' + space);
        ret = ret.replace(/"/g, '');
      } catch (_error) {}
      if (ret) {
        return ret;
      }
      try {
        ret = arg.toString();
        if (caro.isFunction(arg)) {
          reg = new RegExp('\r\n' + fnSpace, 'g');
          ret = ret.replace(reg, '\r\n');
          reg = new RegExp('\r' + fnSpace, 'g');
          ret = ret.replace(reg, '\r');
          reg = new RegExp('\\n' + fnSpace, 'g');
          ret = ret.replace(reg, '\n');
          ret = ret.replace(/"/g, '');
        }
      } catch (_error) {}
      return ret;
    };
    return toWord(arg, spaceLength);
  };
})();
