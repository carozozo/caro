'use strict';
var caro = {};
caro.isNode = (function () {
    return (typeof module !== 'undefined' && typeof exports !== 'undefined');
})();
if (caro.isNode) {
    console.log(1);
    module.exports = caro;
}