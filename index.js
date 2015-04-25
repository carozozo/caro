global.caro = {};
var nPath = require('path');
var nFs = require('fs');
var eachObj = function (obj, cb) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (cb && cb(i, obj[i]) === false) {
                break;
            }
        }
    }
};
var extendObj = function (obj1, obj2) {
    eachObj(obj2, function (key, val) {
        obj1[key] = val;
    });
    return obj1;
};
var getFiles = function (path, cb) {
    if (typeof path !== 'string' || !path) return;
    path = nPath.join(__dirname, path);
    if (!nFs.existsSync(path)) {
        console.error('require path not exists: ', path);
        return;
    }
    if (nFs.lstatSync(path).isDirectory()) {
        nFs.readdirSync(path).forEach(function (fileName) {
            var fullPath = nPath.resolve(path + "/" + fileName);
            var stat = nFs.lstatSync(fullPath);
            if (stat === undefined) return;
            var extendName = nPath.extname(fileName);
            if (extendName !== '.js') {
                return;
            }
            cb && cb(fullPath);
        });
    }
};
(function requireSystem() {
    var arr = ['core', './lib/', './helper'];
    eachObj(arr, function (i, path) {
        getFiles(path, function (fullPath) {
            caro = extendObj(caro, require(fullPath));
        });
    });
})();
module.exports = caro;