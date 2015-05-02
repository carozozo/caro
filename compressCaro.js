(function () {
    'use strict';
    var nFs = require('fs');
    var aData = ['var caro = {};',
        'if (typeof module !== \'undefined\' && typeof exports !==\'undefined\') { ',
        ' module.exports = caro;',
        '}'];
    var aDir = ['./lib', './libForNode'];
    var outputPath = './caro.js';
    var eachObj = function (obj, cb) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (cb && cb(i, obj[i]) === false) {
                    break;
                }
            }
        }
    };
    var getFiles = function (dirPath, cb) {
        if (typeof dirPath !== 'string' || !dirPath) {
            return;
        }
        if (!nFs.existsSync(dirPath)) {
            console.error('require path not exists: ', dirPath);
            return;
        }
        if (nFs.lstatSync(dirPath).isDirectory()) {
            nFs.readdirSync(dirPath).forEach(function (basename) {
                var path = dirPath + '/' + basename;
                var stat = nFs.lstatSync(path);
                if (stat === undefined) {
                    return;
                }
                if (cb) {
                    cb(path);
                }
            });
        }
    };
    var setData = function (path) {
        var data = nFs.readFileSync(path, 'utf8');
        aData.push(data);
    };
    eachObj(aDir, function (i, path) {
        getFiles(path, function (path) {
            setData(path);
        });
    });
    var totalData = aData.join('\r\n');
    nFs.writeFileSync(outputPath, totalData);
})();