(function(g) {
  var caro;
  caro = typeof _ !== "undefined" && _ !== null ? _ : {};
  caro.isNode = (function() {
    return (typeof global !== "undefined" && global !== null) && (typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null);
  })();
  g.caro = caro;
  if (caro.isNode) {
    caro = require('lodash');
    module.exports = caro;
    return global.caro = caro;
  }
})(this);
