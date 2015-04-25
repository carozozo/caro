/**
 * Session operator by express.session
 * refer to [https://github.com/expressjs/session]
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};

    self.getSession = function (key) {
        var req = caro.getSystemReq();
        var session = req.session || {};
        try {
            if (key) {
                return  session[key];
            }
            return session;
        }
        catch (e) {
           console.error('caro.getSession', e);
        }
        return null;
    };
    self.setSession = function setSession(key, val) {
        var req = caro.getSystemReq();
        try {
            req.session[key] = val;
        }
        catch (e) {
           console.error('caro.setSession', e);
        }
    };
    self.cleanSession = function () {
        var req = caro.getSystemReq();
        try {
            req.session = null;
        }
        catch (e) {
           console.error('caro.cleanSession', e);
        }
    };
    return self;
})();