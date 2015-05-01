/**
 * the fist-run file in node.js
 * @author Caro.Huang
 */
var isNodeJs = function () {
    return typeof global !== 'undefined' && typeof module !== 'undefined' && exports !== 'undefined';
};
var caro = {
    setCaro: function (fn) {
        fn(caro);
    }
};
if (isNodeJs()) {
    global.caro = caro;
    global.__rootPath = __dirname;
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
    var getFiles = function (path, cb) {
        if (typeof path !== 'string' || !path) {
            return;
        }
        path = nPath.join(__dirname, path);
        if (!nFs.existsSync(path)) {
            console.error('require path not exists: ', path);
            return;
        }
        if (nFs.lstatSync(path).isDirectory()) {
            nFs.readdirSync(path).forEach(function (fileName) {
                var fullPath = nPath.resolve(path + "/" + fileName);
                var stat = nFs.lstatSync(fullPath);
                if (stat === undefined) {
                    return;
                }
                var extendName = nPath.extname(fileName);
                if (extendName !== '.js') {
                    return;
                }
                if (cb) {
                    cb(fullPath);
                }
            });
        }
    };
    (function requireSystem() {
        var arr = ['./lib','./libForNode'];
        eachObj(arr, function (i, path) {
            getFiles(path, function (fullPath) {
                require(fullPath);
            });
        });
    })();
    (function requireTest() {
        var path = './test.js';
        if (nFs.existsSync(path)) {
            require(path);
        }
    })();
    module.exports = caro;
}