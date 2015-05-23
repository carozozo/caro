(function(g) {
  var caro;
  caro = {};
  caro.isNode = (function() {
    return (typeof global !== "undefined" && global !== null) && (typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null);
  })();
  g.caro = caro;
  if (caro.isNode) {
    module.exports = caro;
    return global.caro = caro;
  }
})(this);
