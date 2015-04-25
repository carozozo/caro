/**
 * Cookie operator, extend by express.req (vision 4.x)
 * refer to [http://expressjs.com/4x/api.html#req.cookies]
 * @author Caro.Huang
 */

module.exports = (function () {
    var self = {};

    /**
     * get cookie value by key
     * @param [key]
     * @returns {*}
     */
    self.getCookie = function (key) {
        var req = caro.getSystemReq();
        var cookies = req.cookies;
        try {
            if (key) {
                var cookie = cookies[key];
                return caro.parseJson(cookie);
            }
            return cookies;
        } catch (e) {
           console.error('caro.getCookie', e, {
                key: key
            });
            return null;
        }
    };
    /**
     * set cookie value
     * @param key
     * @param val
     * @param [opt]
     */
    self.setCookie = function (key, val, opt) {
        var res = caro.getSystemRes();
        try {
            val = caro.safeStringify(val);
            res.cookie(key, val, opt);
        } catch (e) {
           console.error('caro.setCookie', e, {
                key: key,
                val: val
            });
        }
    };
    return self;
})();