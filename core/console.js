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

    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (!msg) return;
        if (this.isOdd) {
            console.log(msg.green);
            this.isOdd = false;
            return;
        }
        console.log(msg.cyan);
        this.isOdd = true;
    };
    self.log2 = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if(!msg) return;
        if (this.isOdd) {
            console.log(msg.blue);
            this.isOdd = false;
            return;
        }
        console.log(msg.yellow);
        this.isOdd = true;
    };
    self.log3 = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if(!msg) return;
        if (this.isOdd) {
            console.log(msg.magenta);
            this.isOdd = false;
            return;
        }
        console.log(msg.red);
        this.isOdd = true;
    };
    return self;
})();