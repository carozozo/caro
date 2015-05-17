
/**
 * FileSystem
 * @author Caro.Huang
 */
(function() {
  var fileSizeUnits1, fileSizeUnits2, getArgs, getFileSize, nFs, self, showErr, traceMode;
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
    var aBool, aCb, aStr;
    aStr = [];
    aCb = [];
    aBool = [];
    caro.each(args, function(i, arg) {
      if (caro.isFn(arg)) {
        aCb.push(arg);
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
    });
    return {
      str: aStr,
      cb: aCb,
      bool: aBool
    };
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
   * delete file
   * @param {...string} path
   * @param {function} cb the callback-function for each path
   * @returns {boolean}
   */
  self.deleteFile = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.cb[0];
    caro.each(aPath, function(i, path) {
      var e;
      try {
        nFs.unlinkSync(path);
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
   * check if empty-folder, return false if anyone is false
   * @param {...string} path
   * @param {function} cb the callback-function for each path
   * @returns {boolean}
   */
  self.isEmptyDir = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.cb[0];
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
   * @param {function} cb the callback-function for each path
   * @returns {*|string}
   */
  self.createDir = function(path, cb) {
    var aPath, args, createDir, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.cb[0];
    createDir = function(dirPath) {
      var subPath;
      subPath = '';
      aPath = caro.splitStr(dirPath, ['\\', '/']);
      return caro.each(aPath, function(i, eachDir) {
        var e, exists;
        subPath = caro.normalizePath(subPath, eachDir);
        exists = caro.fsExists(subPath);
        if (exists) {
          return;
        }
        try {
          nFs.mkdirSync(subPath);
          caro.executeIfFn(cb, false, subPath);
        } catch (_error) {
          e = _error;
          showErr(e);
          pass = false;
          caro.executeIfFn(cb, e, subPath);
        }
      });
    };
    caro.each(aPath, function(i, dirPath) {
      return createDir(dirPath);
    });
    return pass;
  };

  /**
   * delete folder recursively
   * @param {...string} path
   * @param {function} cb the callback-function for each path
   * @param {boolean} [force=false] force-delete even not empty
   * @returns {boolean}
   */
  self.deleteDir = function(path, cb, force) {
    var aPath, argAndCb, deleteFileOrDir, pass, tryAndCatchErr;
    pass = true;
    argAndCb = getArgs(arguments);
    aPath = argAndCb.str;
    cb = argAndCb.cb[0];
    force = argAndCb.bool[0];
    tryAndCatchErr = function(fn) {
      var e;
      try {
        fn();
        caro.executeIfFn(cb, false, path);
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
        caro.executeIfFn(cb, e, path);
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
      if (caro.isEmptyDir(path, function(e) {
        pass = false;
        return caro.executeIfFn(cb, e, path);
      })) {
        tryAndCatchErr(function() {
          return nFs.rmdirSync(path);
        });
      }
    };
    caro.each(aPath, function(i, dirPath) {
      return deleteFileOrDir(dirPath);
    });
    return pass;
  };

  /**
   * check file if exists, return false when anyone is false
   * @param {...string} path
   * @param {function} cb the callback-function for each path
   * @returns {*}
   */
  self.fsExists = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.cb[0];
    caro.each(aPath, function(i, path) {
      var e;
      try {
        if (!nFs.existsSync(path)) {
          pass = false;
          caro.executeIfFn(cb, false, path);
        }
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
   * check if folder, return false when anyone is false
   * @param {...string} path
   * @param {function} cb the callback-function for each path
   * @returns {*}
   */
  self.isFsDir = function(path, cb) {
    var aPath, args, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.cb[0];
    caro.each(aPath, function(i, path) {
      var e, stat;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isDirectory());
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
   * check if file, return false when anyone is false
   * @param {...string} path
   * @param {function} cb the callback-function for each path
   * @returns {*}
   */
  self.isFsFile = function(path) {
    var aPath, args, cb, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.cb[0];
    caro.each(aPath, function(i, path) {
      var e, stat;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isFile());
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
   * check if symbolic link, return false when anyone is false
   * @param {function} cb the callback-function for each path
   * @param {...string} path
   * @returns {*}
   */
  self.isFsSymlink = function(path) {
    var aPath, args, cb, pass;
    pass = true;
    args = getArgs(arguments);
    aPath = args.str;
    cb = args.cb[0];
    caro.each(aPath, function(i, path) {
      var e, stat;
      try {
        stat = caro.getFsStat(path);
        pass && (pass = stat.isSymbolicLink());
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
   * delete file or dir or link, return false delete failed
   * @param {...string} path
   * @param {boolean} [force=false]
   * @returns {boolean}
   */
  self.deleteFs = function(path, force) {
    var aPath, e, pass;
    if (force == null) {
      force = false;
    }
    pass = true;
    aPath = [];
    try {
      caro.each(aPath, function(i, path) {
        if (caro.isFsDir(path)) {
          if (!caro.deleteDir(path, force)) {
            pass = false;
          }
          return;
        }
        if (!caro.deleteFile(path)) {
          pass = false;
        }
      });
    } catch (_error) {
      e = _error;
      showErr(e);
      pass = false;
    }
    return pass;
  };

  /**
   * @param {string|...[]} path the file-path, you can also set as [path,newPath]
   * @param {string|...[]} newPath the new-path, you can also set as [path,newPath]
   * @param {boolean} [force] will create folder if there is no path for newPath
   * @returns {boolean}
   */
  self.renameFs = function(path, newPath, force) {
    var aPath, pass;
    if (force == null) {
      force = false;
    }
    pass = true;
    aPath = [];
    if (caro.isStr(path, newPath)) {
      aPath.push([path, newPath]);
    }
    caro.eachArgs(arguments, function(i, arg) {
      if (caro.isArr(arg)) {
        aPath.push(arg);
      }
      if (caro.isBool(arg)) {
        force = arg;
      }
    });
    caro.each(aPath, function(i, pathMap) {
      var dirPath2, e, path1, path2;
      path1 = pathMap[0];
      path2 = pathMap[1];
      try {
        if (force && caro.fsExists(path1)) {
          dirPath2 = caro.getDirPath(path2);
          caro.createDir(dirPath2);
        }
        nFs.renameSync(path1, path2);
        if (!caro.fsExists(path2)) {
          pass = false;
        }
      } catch (_error) {
        e = _error;
        showErr(e);
        pass = false;
      }
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
