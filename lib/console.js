/**
 * The operator with console for easy reading
 * @namespace caro
 * @author Caro.Huang
 */
module.exports = (function () {
    // https://www.npmjs.org/package/colors
    require('colors');
    var self = {};
    var combineMsg = function (msg, variable) {
        msg = caro.coverToStr(msg);
        variable = caro.coverToStr(variable);
        msg += variable;
        return msg;
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
    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log2 = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (!msg) return;
        if (this.isOdd) {
            console.log(msg.blue);
            this.isOdd = false;
            return;
        }
        console.log(msg.yellow);
        this.isOdd = true;
    };
    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log3 = function (msg, variable) {
        msg = combineMsg(msg, variable);
        if (!msg) return;
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