/**
 * The operator with console for easy reading
 * please refer to [https://www.npmjs.org/package/colors]
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};
    require('colors');
    var combineMsg = function (msg, variable) {
        if (caro.isObj(msg)) {
            msg = caro.safeStringify(msg, null, 2);
        }
        if (variable !== undefined) {
            if (caro.isObj(variable)) {
                variable = caro.safeStringify(variable, null, 2);
            }
            msg += variable;
        }
        try {
            return msg.toString();
        } catch (e) {
            return msg;
        }
    };
    var logErr = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (this.isOdd) {
            console.log(msg.magenta);
            this.isOdd = false;
            return;
        }
        console.log(msg.red);
        this.isOdd = true;
    };

    /**
     * not working on production-server
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (this.isOdd) {
            console.log(msg.green);
            this.isOdd = false;
            return;
        }
        console.log(msg.cyan);
        this.isOdd = true;
    };
    /**
     * @param msg
     * @param [variable]
     */
    self.log2 = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (this.isOdd) {
            console.log(msg.blue);
            this.isOdd = false;
            return;
        }
        console.log(msg.yellow);
        this.isOdd = true;
    };
    self.logErr = function (fnName, msg, msg2) {
        var msgArr = [];
        var coverToString = function (arg) {
            if (caro.isObj(arg)) {
                if (arg.message)  return arg.message;
                return caro.safeStringify(arg, null, 2);
            }
            if (caro.isStr(arg)) return arg;
            return '';
        };
        fnName += ' error';
        msg = coverToString(msg);
        msg2 = coverToString(msg2);
        caro.pushNoEmpty(msgArr, msg);
        caro.pushNoEmpty(msgArr, msg2);
        if (!caro.isEmptyVal(msgArr)) {
            fnName += ': ';
        }
        logErr(fnName, msgArr.join(', '));
    };
    return self;
})();