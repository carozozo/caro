var a = [1, 3, '3'];
var b = [2, 3];
var c = [4, 5];
var fn = function (x) {
    console.log('x=', x);
};
var ret = caro.serializeUrl(3333,{a:3,b:""},true);
//var ret2= caro.executeIfFn(fn,3);
console.log('typeof ret=',typeof ret);
console.log('ret=', '@@'+ret+'@@');