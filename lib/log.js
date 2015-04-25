/**
 * The operator with log file
 * @author Caro.Huang
 */
module.exports  = (function () {
    var self = {};
    var normalizeLogPath = function (logPath) {
        logPath = caro.normalizePath(logPath);
        return caro.addTail(logPath, '.log');
    };

    /**
     * read log-file ,and create it if not exists
     * @param logPath
     * @returns {*}
     */
    self.readLog = function (logPath) {
        logPath = normalizeLogPath(logPath);
        try {
            if (!caro.ifFileExists(logPath)) {
                return null;
            }
            return caro.readFile(logPath);
        } catch (e) {
           console.error('caro.readLog', e);
            return null;
        }
    };
    /**
     * write log-file with data
     * create empty-file if data is empty
     * @param logPath
     * @param [data]
     * @returns {*}
     */
    self.writeLog = function (logPath, data) {
        data = data || '';
        logPath = normalizeLogPath(logPath);
        try {
            var size = caro.getFileSizeInMegabytes(logPath);
            if (size > 1) {
               console.error('caro.writeLog', logPath + ' size ' + size + ' is more thane 1 mb');
                return;
            }
            data = caro.coverToStr(data);
            caro.writeFile(logPath, data);
        } catch (e) {
           console.error('caro.writeLog', e);
        }
    };
    /**
     * update log data
     * OPT
     * ifWrap: bool (default: true) - add wrap with add-data
     * prepend: bool (default: false) - add data in front of origin-data
     *
     * @param logPath
     * @param data
     * @param [opt]
     */
    self.updateLog = function (logPath, data, opt) {
        var originData = self.readLog(logPath);
        var wrap = '\r\n';
        var ifWrap = true;
        var prepend = false;
        if (opt) {
            ifWrap = opt.ifWrap !== false;
            prepend = opt.prepend === true;
        }
        originData = originData || '';
        data = caro.coverToStr(data);
        if (originData && ifWrap) {
            if (prepend) {
                data += wrap;
            }
            else {
                originData += wrap;
            }
        }
        if (prepend) {
            data += originData;
        }
        else {
            data = originData + data;
        }
        caro.writeLog(logPath, data);
    };
    self.updateLogWithDayFileName = function (logPath, data, opt) {
        var today = caro.formatNow('YYYYMMDD');
        logPath = caro.addTail(logPath, '_' + today);
        self.updateLog(logPath, data, opt);
    };
    /**
     * convenient-logger to [trace.log]
     * @param data
     * @param [opt]
     */
    self.traceLog = function (data, opt) {
        var logPath = 'trace';
        self.updateLog(logPath, data, opt);
    };
    return self;
})();