(function(g) {
  var caro, e, isNode;
  isNode = (typeof global !== "undefined" && global !== null) && (typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null);
  if (isNode) {
    caro = {};
    try {
      caro = require('lodash').runInContext();
    } catch (error) {
      e = error;
    }
    module.exports = caro;
    global.caro = caro;
  } else {
    caro = typeof _ !== "undefined" && _ !== null ? _ : {};
    g.caro = caro;
  }
})(this);
