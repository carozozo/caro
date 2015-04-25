/**
 * The helper of common JSON functions
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};

    /**
     * cover JSON to obj
     * @param str
     * @returns {*}
     */
    self.parseJson = function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
           console.error('caro.parseJson', e);
        }
        return str;
    };
    /**
     * cover obj to JSON
     * @param obj
     * @param [replace]
     * @param [space]
     * @returns {*}
     */
    self.safeStringify = function (obj, replace, space) {
        if (caro.isStr(obj)) return obj;
        try {
            return JSON.stringify(obj, replace, space);
        } catch (e) {
           console.error('caro.safeStringify', e);
        }
        return '';
    };
    return self;
})();