
/**
 * Log
 * @author Caro.Huang
 */
(function() {
  var extendName, logPath, normalizeLogPath, self;
  if (!caro.isNode) {
    return;
  }
  self = caro;
  logPath = '';
  extendName = '.log';
  normalizeLogPath = function(path) {
    path = caro.coverToStr(path);
    path = caro.normalizePath(logPath, path);
    return caro.addTail(path, extendName);
  };

  /**
   * set the path that log placed
   * @param {string} path
   * @returns {boolean}
   */
  self.setLogRoot = function(path) {
    if (path == null) {
      path = logPath;
    }
    path = caro.coverToStr(path);
    path = caro.normalizePath(path);
    if (caro.createDir(path)) {
      logPath = path;
      return true;
    }
    return false;
  };

  /**
   * get the path that log placed
   * @returns {string}
   */
  self.getLogRoot = function() {
    return logPath;
  };

  /**
   * set the extend-name of log file
   * @param {string} name=.log
   * @returns {boolean}
   */
  self.setLogExtendName = function(name) {
    if (name == null) {
      name = extendName;
    }
    name = caro.coverToStr(name);
    if (!name) {
      return false;
    }
    name = caro.addHead(name, '.');
    extendName = name;
    return true;
  };

  /**
   * get the extend-name of log file
   * @return {string}
   */
  self.getLogExtendName = function() {
    return extendName;
  };

  /**
   * read log-file ,and create it if not exists
   * @param path
   * @returns {*}
   */
  self.readLog = function(path) {
    var e;
    path = normalizeLogPath(path);
    try {
      if (!caro.fsExists(path)) {
        return null;
      }
      return caro.readFileCaro(path);
    } catch (_error) {
      e = _error;
      console.error('caro.log', e);
      return null;
    }
  };

  /**
   * write log-file with data
   * create empty-file if data is empty
   * @param {string} path
   * @param {*} [data='']
   * @returns {boolean}
   */
  self.writeLog = function(path, data) {
    var e, maxSize, size;
    if (data == null) {
      data = '';
    }
    path = normalizeLogPath(path);
    try {
      size = caro.getFsSize(path);
      maxSize = Math.pow(10, 6);
      if (size > maxSize) {
        console.error('caro.log: ', path + ' size ' + size + ' is more thane 1 MB');
        return false;
      }
      data = caro.coverToStr(data);
      return caro.writeFileCaro(path, data);
    } catch (_error) {
      e = _error;
      console.error('caro.log: ', e);
    }
    return false;
  };

  /**
   * update log data
   * @param {string} path
   * @param {*} [data='']
   * @param {object} [opt={}]
   * @param {boolean} [opt.ifWrap=true] add wrap with add-data
   * @param {boolean} [opt.prepend=false] add data in front of origin-data
   * @returns {boolean}
   */
  self.updateLog = function(path, data, opt) {
    var ifWrap, originData, prepend, wrap;
    if (opt == null) {
      opt = {};
    }
    originData = caro.readLog(path);
    wrap = '\r\n';
    ifWrap = true;
    prepend = false;
    if (opt) {
      ifWrap = opt.ifWrap !== false;
      prepend = opt.prepend === true;
    }
    originData = originData || '';
    data = caro.coverToStr(data);
    if (originData && ifWrap) {
      if (prepend) {
        data += wrap;
      } else {
        originData += wrap;
      }
    }
    if (prepend) {
      data += originData;
    } else {
      data = originData + data;
    }
    return caro.writeLog(path, data);
  };

  /**
   * update log data
   * @param {string} path
   * @param {*} [data='']
   * @param {object} [opt={}]
   * @param {boolean} [opt.dateFirst=true] if set the date in first-filename
   * @param {boolean} [opt.ifWrap=true] add wrap with add-data
   * @param {boolean} [opt.prepend=false] add data in front of origin-data
   * @returns {boolean}
   */
  self.updateLogWithDayFileName = function(path, data, opt) {
    var dateFirst, today;
    if (opt == null) {
      opt = {};
    }
    today = caro.formatNow('YYYYMMDD');
    dateFirst = opt.dateFirst !== false ? true : false;
    if (dateFirst) {
      path = caro.addTail(today, '_' + path);
    } else {
      path = caro.addTail(path, '_' + today);
    }
    return caro.updateLog(path, data, opt);
  };

  /**
   * create trace.log for convenience
   * @param {*} [data='']
   * @param {object} [opt={}]
   * @param {boolean} [opt.ifWrap=true] add wrap with add-data
   * @param {boolean} [opt.prepend=false] add data in front of origin-data
   * @returns {boolean}
   */
  self.traceLog = function(data, opt) {
    var path;
    path = 'trace';
    return caro.updateLog(path, data, opt);
  };
})();
