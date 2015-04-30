/**
 * The helper of path functions
 * @namespace caro, __rootPath
 * @author Caro.Huang
 */

(function (fn) {
    module.exports = fn(global.caro);
})(function (self) {
    var nPath = require('path');
    var absolutePath = global.__rootPath || __dirname;
    /**
     * set absolute root path
     * @param path
     * @returns {String}
     */
    self.setAbsolutePath = function (path) {
        path = self.coverToStr(path);
        absolutePath = path;
        return absolutePath;
    };
    /**
     *
     * @returns {String}
     */
    self.getAbsolutePath = function () {
        return absolutePath;
    };
    /**
     * check if path contain absolute root path
     * @param {*} path
     * @returns {boolean}
     */
    self.isFullPath = function (path) {
        path = self.normalizePath(path);
        return (path.indexOf(absolutePath) === 0);
    };
    /**
     * get dir-path of path
     * @param {string} path
     * @returns {string}
     */
    self.getDirPath = function (path) {
        return nPath.dirname(path);
    };
    /**
     * get file name from path
     * OPT
     * full: bool (default: true) - if get full file name
     * @param {string} path
     * @param {boolean} [getFull] return basename if true
     * @returns {*}
     */
    self.getFileName = function (path, getFull) {
        getFull = getFull !== false;
        if (!getFull) {
            var extendName = self.getExtendName(path);
            return nPath.basename(path, extendName);
        }
        return nPath.basename(path);
    };
    /**
     * EX
     * getExtendName('aa/bb/cc.txt') => get '.txt'
     * @param path
     * @param {boolean} [withDot=true]
     * @returns {*}
     */
    self.getExtendName = function (path, withDot) {
        var extendName = nPath.extname(path);
        withDot = withDot !== false;
        if (!withDot) {
            extendName = extendName.replace('.', '');
        }
        return extendName;
    };
    /**
     * @param {...} path
     * @returns {string|*}
     */
    self.normalizePath = function (path) {
        var args = [];
        self.eachObj(arguments, function (i, arg) {
            args[i] = self.coverToStr(arg);
        });
        return nPath.join.apply(nPath, args);
    };
    /**
     * auto add server root-path if not exist
     * @param {...} path
     * @returns {*|string}
     */
    self.coverToFullPath = function (path) {
        path = self.normalizePath.apply(this, arguments);
        if (!self.isFullPath(path)) {
            path = nPath.join(absolutePath, path);
        }
        return path;
    };
    return self;
});

