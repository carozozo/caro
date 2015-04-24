global.caro = {
    each: function (obj, cb) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (cb && cb(i, obj[i]) === false) {
                    break;
                }
            }
        }
    }
};
global.carol = {};
global.caroh = {};
var app = require('express')();
var nOs = require('os');
var nPath = require('path');
var nFs = require('fs');
var nEvents = require('events');
var aServerIp = (function () {
    var addresses = [];
    var interfaces = nOs.networkInterfaces();
    for (var name in interfaces) {
        if (!interfaces.hasOwnProperty(name)) {
            return null;
        }
        var eachInterface = interfaces[name];
        eachInterface.forEach(function (entry) {
            if (entry.family == 'IPv4' && !entry.internal) {
                addresses.push(entry.address)
            }
        });
    }
    return addresses;
})();
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
    getFiles('./system/lib/', function (fullPath) {
        require(fullPath);
    });
    getFiles('./system/helper/', function (fullPath) {
        require(fullPath);
    });
})();
(function requireConfig() {
    var config = require('./config/config.js');
    var configMap = config.configMap || null;
    if (!configMap) {
        return;
    }
    caro.each(aServerIp, function (i, serverIp) {
        caro.each(configMap, function (ip, configFileName) {
            if (serverIp != ip) {
                return;
            }
            var config2 = require('./config/' + configFileName);
            config = carol.object.extendObj(config, config2);
        });
    });
})();