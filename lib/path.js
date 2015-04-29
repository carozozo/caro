/**
 * The helper of path functions
 * @namespace caro
 * @author Caro.Huang
 */

(function (fn) {
    module.exports = fn();
})(function () {
    var self = global.caro || {};
    var nPath = require('path');
    var absolutePath = __dirname;

    /**
     * set path for
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
     * check if path contain server root-path
     * @param {string} path
     * @returns {boolean}
     */
    self.isFullPath = function (path) {
        path = self.normalizePath(path);
        return (path.indexOf(absolutePath) === 0);
    };
    /**
     * @param {...string} path
     * @returns {string|*}
     */
    self.normalizePath = function () {
        var args = [];
        self.eachObj(arguments, function (i, arg) {
            args[i] = self.coverToStr(arg);
        });
        return nPath.join.apply(nPath, args);
    };
    /**
     * auto add server root-path if not exist
     * @param {...string} path
     * @returns {*|string}
     */
    self.normalizeFullPath = function () {
        var path = self.normalizePath.apply(this, arguments);
        if (!self.isFullPath(path)) {
            path = nPath.join(absolutePath, path);
        }
        return path;
    };
    return self;
});

