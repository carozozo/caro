/**
 * The helper of common JSON functions
 * @author Caro.Huang
 */
caroh.json = (function () {
    var self = {};

    self.parseJson = function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            tl.console.logErr('tl.json.parseJson', e);
        }
        return str;
    };
    /**
     * safe cover Json obj to string
     * @param obj
     * @param [replace]
     * @param [space]
     * @returns {*}
     */
    self.safeStringify = function (obj, replace, space) {
        if (tl.helper.isStr(obj)) return obj;
        // https://www.npmjs.org/package/json-stringify-safe
        var stringify = require('json-stringify-safe');
        try {
            return stringify(obj, replace, space);
        } catch (e) {
            tl.console.logErr('tl.json.safeStringify', e);
        }
        return '';
    };
    return self;
})();