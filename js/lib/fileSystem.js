
/**
 * FileSystem
 * @author Caro.Huang
 */
(function() {
  var coverToFalseIfEmptyArr, fileSizeUnits1, fileSizeUnits2, getArgs, getFileSize, nFs, self, showErr, traceMode;
  if (!caro.isNode) {
    return;
  }
  self = caro;
  nFs = require('fs');
  fileSizeUnits1 = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  fileSizeUnits2 = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  traceMode = false;
  showErr = function(e) {
    if (traceMode) {
      return console.error(e);
    }
  };
  getArgs = function(args) {
    var aArr, aBool, aFn, aStr;
    aStr = [];
    aFn = [];
    aBool = [];
    aArr = [];
    caro.each(args, function(i, arg) {
      if (caro.isFn(arg)) {
        aFn.push(arg);
        return;
      }
      if (caro.isBool(arg)) {
        aBool.push(arg);
        return;
      }
      if (caro.isStr(arg)) {
        aStr.push(arg);
        return;
      }
      if (caro.isArr(arg)) {
        aArr.push(arg);
        return;
      }
    });
    return {
      fn: aFn,
      bool: aBool,
      str: aStr,
      arr: aArr
    };
  };
  coverToFalseIfEmptyArr = function(arr) {
    if (arr.length < 1) {
      return false;
    }
    return arr;
  };
  getFileSize = function(path) {
    var status;
    status = caro.getFsStat(path);
    if (status) {
      return status.size;
    }
    if (caro.isNum(path)) {
      return path;
    }
    return null;
  };

  /**
   * set trace-mode, will console.error when
   */
  self.setTrace = function(bool) {
    return traceMode = bool === true;
  };

  /**
   * read file content, return false if failed
   * @param {string} path
   * @param {?string} [encoding=utf8]
   * @param {?string} [flag=null]
   * @returns {*}
   */
  self.readFileCaro = function(path, encoding, flag) {
    var e;
    if (encoding == null) {
      encoding = 'utf8';
    }
    if (flag == null) {
      flag = null;
    }
    try {
      return nFs.readFileSync(path, {
        encoding: encoding,
        flag: flag
      });
    } catch (_error) {
      e = _error;
      showErr(e);
    }
    return false;
  };

  /**
   * write data to file, return false if failed
   * @param {string} path
   * @param {*} data
   * @param {?string} [encoding=utf8]
   * @param {?string} [flag=null]
   * @returns {*}
   */
  self.writeFileCaro = function(path, data, encoding, flag) {
    var e;
    if (encoding == null) {
      encoding = 'utf8';
    }
    if (flag == null) {
      flag = null;
    }
    try {
      nFs.writeFileSync(path, data, {
        encoding: encoding,
        flag: flag
      });
      return true;
    } catch (_error) {
      e = _error;
      showErr(e);
    }
    return false;
  };

  /**
   * check if empty-folder, return false if anyone is false
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {boolean}
   */
  self.isEmptyDir = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var count, e;
      try {
        count = nFs.readdirSync(path);
        if (count.length > 0) {
          pass = false;
        }
        caro.executeIfFn(cb, false, path);
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        caro.executeIfFn(cb, e, path);
      }
    });
    return pass;
  };

  /**
   * get files under path
   * @param {string} path
   * @param {function(object)} [cb] cb with file-info
   * @param {object} [opt]
   * @param {number} [opt.maxLevel=1] the dir-level you want to read, get all-level when 0
   * @param {boolean} [opt.getDir=true] if return dir-path
   * @param {boolean} [opt.getFile=true] if return file-path
   * @param {boolean|string|[]} [opt.getByExtend=false] if set as string, will only return files including same extend-name
   * @returns {*}
   */
  self.readDirCb = function(path, cb, opt) {
    var countLevel, getByExtend, getDir, getFile, maxLevel, pushFile, readDir;
    if (opt == null) {
      opt = {};
    }
    countLevel = 0;
    maxLevel = opt.maxLevel ? parseInt(opt.maxLevel, 10) : 1;
    getDir = opt.getDir !== false;
    getFile = opt.getFile !== false;
    getByExtend = (function() {
      var r;
      r = false;
      if (opt.getByExtend) {
        r = caro.splitStr(opt.getByExtend, ',');
        caro.each(r, function(i, extendName) {
          r[i] = caro.addHead(extendName, '.');
        });
      }
      return r;
    })();
    pushFile = function(oFileInfo) {
      var extendName;
      extendName = oFileInfo.extendName;
      if (getByExtend && getByExtend.indexOf(extendName) < 0) {
        return;
      }
      return cb(false, oFileInfo);
    };
    readDir = function(rootPath, level) {
      var e, files;
      if (maxLevel > 0 && level >= maxLevel) {
        return;
      }
      try {
        files = nFs.readdirSync(rootPath);
      } catch (_error) {
        e = _error;
        showErr(e);
        cb(e);
      }
      level++;
      caro.each(files, function(i, basename) {
        var dirPath, extendName, filePath, fileType, filename, fullDirPath, fullPath, oFileInfo;
        filename = caro.getFileName(basename, false);
        extendName = caro.getExtendName(basename);
        filePath = caro.normalizePath(rootPath, basename);
        dirPath = caro.getDirPath(filePath);
        fullPath = caro.coverToFullPath(filePath);
        fullDirPath = caro.getDirPath(fullPath);
        fileType = caro.getFileType(filePath);
        oFileInfo = {
          filename: filename,
          extendName: extendName,
          basename: basename,
          filePath: filePath,
          dirPath: dirPath,
          fullPath: fullPath,
          fullDirPath: fullDirPath,
          fileType: fileType,
          level: level - 1,
          index: i
        };
        if (caro.isFsDir(filePath)) {
          if (getDir) {
            return pushFile(oFileInfo);
          }
          readDir(filePath, level);
          return;
        }
        if (caro.isFsFile(filePath)) {
          if (getFile) {
            return pushFile(oFileInfo);
          }
        }
      });
    };
    readDir(path, countLevel);
  };

  /**
   * create dir recursively, will create folder if path not exists
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {*|string}
   */
  self.createDir = function(path, cb) {
    var aPath, args, createDir, err, pass;
    err = [];
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    createDir = function(dirPath) {
      var subPath;
      subPath = '';
      aPath = caro.splitStr(dirPath, ['\\', '/']);
      caro.each(aPath, function(i, eachDir) {
        var e, exists;
        subPath = caro.normalizePath(subPath, eachDir);
        exists = caro.fsExists(subPath);
        if (exists) {
          return;
        }
        try {
          nFs.mkdirSync(subPath);
        } catch (_error) {
          e = _error;
          showErr(e);
          pass = false;
          err.push(e);
        }
      });
      return err;
    };
    caro.each(aPath, function(i, dirPath) {
      err = [];
      err = createDir(dirPath);
      err = coverToFalseIfEmptyArr(err);
      return caro.executeIfFn(cb, err, dirPath);
    });
    return pass;
  };

  /**
   * check file if exists, return false when anyone is false
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {*}
   */
  self.fsExists = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var e, err;
      err = false;
      try {
        if (!nFs.existsSync(path)) {
          pass = false;
        }
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path);
    });
    return pass;
  };

  /**
   * check if folder, return false when anyone is false
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {*}
   */
  self.isFsDir = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var e, err, stat;
      err = false;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isDirectory());
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path);
    });
    return pass;
  };

  /**
   * check if file, return false when anyone is false
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @returns {*}
   */
  self.isFsFile = function(path) {
    var aPath, args, cb, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var e, err, stat;
      err = false;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isFile());
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path);
    });
    return pass;
  };

  /**
   * check if symbolic link, return false when anyone is false
   * @param {function} [cb] the callback-function for each path
   * @param {...string} path
   * @returns {*}
   */
  self.isFsSymlink = function(path) {
    var aPath, args, cb, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    caro.each(aPath, function(i, path) {
      var e, err, stat;
      err = false;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isSymbolicLink());
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path);
    });
    return pass;
  };

  /**
   * @param {string} path
   * @returns {string}
   */
  self.getFileType = function(path) {
    var r;
    r = '';
    if (caro.isFsDir(path)) {
      r = 'dir';
    }
    if (caro.isFsFile(path)) {
      r = 'file';
    }
    if (caro.isFsSymlink(path)) {
      r = 'link';
    }
    return r;
  };

  /**
   * delete file/folder recursively
   * @param {...string} path
   * @param {function} [cb] the callback-function for each path
   * @param {boolean} [force=false] force-delete even not empty
   * @returns {boolean}
   */
  self.deleteFs = function(path, cb, force) {
    var aPath, args, deleteFileOrDir, err, pass, tryAndCatchErr;
    err = [];
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.fn[0];
    force = args.bool[0];
    tryAndCatchErr = function(fn) {
      var e;
      try {
        fn();
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err.push(e);
      }
    };
    deleteFileOrDir = function(path) {
      if (caro.isFsFile(path) && force) {
        tryAndCatchErr(function() {
          return nFs.unlinkSync(path);
        });
        return;
      }
      if (caro.isFsDir(path)) {
        tryAndCatchErr(function() {
          var files;
          files = nFs.readdirSync(path);
          caro.each(files, function(i, file) {
            var subPath;
            subPath = caro.normalizePath(path, file);
            deleteFileOrDir(subPath);
          });
        });
      }
      tryAndCatchErr(function() {
        return nFs.rmdirSync(path);
      });
      return err;
    };
    caro.each(aPath, function(i, dirPath) {
      err = [];
      err = deleteFileOrDir(dirPath);
      err = coverToFalseIfEmptyArr(err);
      return caro.executeIfFn(cb, err, dirPath);
    });
    return pass;
  };

  /**
   * @param {string|...[]} path the file-path, you can also set as [path,newPath]
   * @param {string|...[]} newPath the new-path, you can also set as [path,newPath]
   * @param {function} [cb] the callback-function for each path
   * @param {boolean} [force=false] will create folder if there is no path for newPath
   * @returns {boolean}
   */
  self.renameFs = function(path, newPath, cb, force) {
    var aPathMap, args, pass;
    if (force == null) {
      force = false;
    }
    pass = true;
    aPathMap = [];
    args = getArgs(arguments);
    cb = args.fn[0];
    force = args.bool[0];
    aPathMap = (function() {
      if (caro.isStr(path, newPath)) {
        return [path, newPath];
      }
      return args.arr;
    })();
    caro.each(aPathMap, function(i, pathMap) {
      var dirPath2, e, err, path1, path2;
      err = false;
      path1 = pathMap[0];
      path2 = pathMap[1];
      try {
        if (force && caro.fsExists(path1)) {
          dirPath2 = caro.getDirPath(path2);
          caro.createDir(dirPath2);
        }
        nFs.renameSync(path1, path2);
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        err = e;
      }
      caro.executeIfFn(cb, err, path1, path2);
    });
    return pass;
  };

  /**
   * get file stat
   * @param {string} path
   * @param {string} [type=l] s = statSync, l = lstatSync, f = fstatSync
   * @returns {*}
   */
  self.getFsStat = function(path, type) {
    var aType, e, stat;
    if (type == null) {
      type = 'l';
    }
    stat = null;
    aType = ['l', 's', 'f'];
    type = aType.indexOf(type) > -1 ? type : aType[0];
    try {
      switch (type) {
        case 's':
          stat = nFs.lstatSync(path);
          break;
        case 'f':
          stat = nFs.fstatSync(path);
          break;
        default:
          stat = nFs.statSync(path);
          break;
      }
    } catch (_error) {
      e = _error;
      showErr(e);
    }
    return stat;
  };

  /**
   * get file size, default in bytes or set by unit
   * @param {number|string} path file-path or bytes
   * @param {number} [fixed=1] decimals of float
   * @param {string} [unit] the file-size unit
   * @returns {}
   */
  self.getFsSize = function(path, fixed, unit) {
    var bytes, count, index, index1, index2, si, thresh;
    if (fixed == null) {
      fixed = 1;
    }
    bytes = getFileSize(path);
    if (bytes === null) {
      return bytes;
    }
    si = true;
    unit = caro.upperStr(unit);
    index1 = fileSizeUnits1.indexOf(unit);
    index2 = fileSizeUnits2.indexOf(unit);
    if (index2 > -1) {
      si = false;
    }
    thresh = si ? 1000 : 1024;
    index = si ? index1 : index2;
    count = 0;
    if (index < 0) {
      return bytes;
    }
    while (true) {
      bytes /= thresh;
      ++count;
      if (!(count < index)) {
        break;
      }
    }
    return bytes.toFixed(fixed);
  };

  /**
   * get file size for human-reading
   * @param {number|string} path file-path or bytes
   * @param {number} [fixed=1] decimals of float
   * @param {boolean} [si=true] size-type, true decimal, false as binary
   * @returns {string}
   */
  self.humanFeSize = function(path, fixed, si) {
    var aUnit, bytes, thresh, u;
    if (fixed == null) {
      fixed = 1;
    }
    if (si == null) {
      si = true;
    }
    bytes = getFileSize(path);
    if (bytes === null) {
      return bytes;
    }
    thresh = si ? 1000 : 1024;
    if (bytes < thresh) {
      return bytes + ' B';
    }
    aUnit = si ? fileSizeUnits1 : fileSizeUnits2;
    u = -1;
    while (true) {
      bytes /= thresh;
      ++u;
      if (!(bytes >= thresh)) {
        break;
      }
    }
    return bytes.toFixed(fixed) + ' ' + aUnit[u];
  };
})();
