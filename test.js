var a = {
    b: ' 33  ',
    c: function () {
        console.log('@@')
    },
    d: {
        e: 3
    }
};
var ret = caro.coverFnToStrInObj(a);
//a.d.e=22;
//caro.traceLog(a);
caro.log('ret=', ret);