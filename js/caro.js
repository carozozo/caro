(function(g) {
  var caro, isNode;
  caro = typeof _ !== "undefined" && _ !== null ? _ : {};
  g.caro = caro;
  isNode = (function() {
    return (typeof global !== "undefined" && global !== null) && (typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null);
  })();
  if (isNode) {
    caro = require('lodash');
    module.exports = caro;
    global.caro = caro;
  }
  return caro.isNode = isNode;
})(this);
