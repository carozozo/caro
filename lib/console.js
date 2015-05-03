/**
 * Console
 * @author Caro.Huang
 */
(function () {
    'use strict';
    if (typeof module === 'undefined' && typeof exports === 'undefined') {
        return;
    }
    var self = caro;
    // https://www.npmjs.org/package/colors
    require('colors');
    var combineMsg = function (msg, variable) {
        msg = caro.coverToStr(msg);
        if (caro.isUndef(variable)) {
            variable = '';
        }
        variable = caro.coverToStr(variable);
        msg += variable;
        return msg;
    };
    var doConsole = function (args, color) {
        if (caro.getObjLength(args) <= 0) {
            return console.log();
        }
        var msg = args[0];
        var variable = args[1];
        msg = combineMsg(msg, variable);
        console.log(msg[color]);
    };

    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log = function (msg, variable) {
        if (this.isOdd) {
            doConsole(arguments, 'green');
            this.isOdd = false;
            return;
        }
        doConsole(arguments, 'cyan');
        this.isOdd = true;
    };
    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log2 = function (msg, variable) {
        if (this.isOdd) {
            doConsole(arguments, 'blue');
            this.isOdd = false;
            return;
        }
        doConsole(arguments, 'yellow');
    };
    /**
     * print different console.log color in odd/even line
     * @param msg
     * @param [variable]
     */
    self.log3 = function (msg, variable) {
        if (this.isOdd) {
            doConsole(arguments, 'magenta');
            this.isOdd = false;
            return;
        }
        doConsole(arguments, 'red');
    };
})();