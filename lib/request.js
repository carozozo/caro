/**
 * The common function base on express.req (vision 4.x)
 * refer to [http://expressjs.com/4x/api.html#request]
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};
    var sysReq = null;
    var getSystemReq = function () {
        if (!sysReq) {
            var msg = 'No express.req object';
            caro.logErr('caro', msg);
            throw msg;
        }
        return sysReq;
    };
    var getReqMethod = function () {
        var req = getSystemReq();
        return req.method;
    };
    var getPararm = function (req, key) {
        if (!key) {
            return req;
        }
        return req[key];
    };

    self.setSystemReq = function (req) {
        if (!caro.isObj(req)) return;
        sysReq = req;
    };
    /**
     * get req-header
     * @param [key]
     * @returns {*}
     */
    self.getReqHeader = function (key) {
        var req = getSystemReq();
        if (!key) {
            return req.headers || null;
        }
        return req.get(key);
    };
    /**
     * get req-param by url-path
     * EX.
     * app.get('/file/:name', function (req, res, next) {
     *  var name = getReqPathParam('name');
     * });
     * => when URL= /file/caro => name = caro
     * @param [key]
     * @returns {}
     */
    self.getReqPathParam = function (key) {
        var req = getSystemReq();
        return getPararm(req.params, key);
    };
    /**
     * get req-query
     * EX.
     * when GET URL= /file?name=caro&home=taiwan
     * => getReqQuery() = { name: 'caro', home: 'taiwan'}
     * => getReqQuery('name') = 'caro'
     * @param [key]
     * @returns {}
     */
    self.getReqQuery = function (key) {
        var req = getSystemReq();
        return getPararm(req.query, key);
    };
    /**
     * get req-body
     * EX.
     * when POST/PUT will data { name: 'caro', home: 'taiwan'}
     * => getReqQuery() = { name: 'caro', home: 'taiwan'}
     * => getReqQuery('name') = 'caro'
     * @param [key]
     * @returns {}
     */
    self.getReqBody = function (key) {
        var req = getSystemReq();
        return getPararm(req.body, key);
    };
    /**
     * auto detect http-method and get param
     * GET => get query, POST/PUT => get body
     * @param [key]
     * @returns {*}
     */
    self.getReqParamAuto = function (key) {
        var method = getReqMethod();
        if (method === 'GET') {
            return self.getReqQuery(key);
        }
        return self.getReqBody(key);
    };
    self.getSystemReq = getSystemReq;
    self.getMethod = getReqMethod;
    return self;
})();