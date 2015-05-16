
/**
 * FileSystem
 * @author Caro.Huang
 */
(function() {
  var fileSizeUnits1, fileSizeUnits2, getFileSize, nFs, self, showErr, traceMode;
  if (!caro.isNode) {
    return;
  }
  self = caro;
  nFs = require('fs');
  fileSizeUnits1 = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  fileSizeUnits2 = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  traceMode = true;
  showErr = function(e) {
    if (traceMode) {
      return console.error(e);
    }
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
    return traceMode = bool !== false;
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
   * @param {...string} path
   * @returns {boolean}
   */
  self.deleteFile = function(path, cb) {
    var pass, r;
    pass = true;
    r = [];
    caro.each(arguments, function(i, arg) {
      if (caro.isFn(arg)) {
        cb = arg;
        return;
      }
      r.push(arg);
    });
    console.log('arguments=', arguments);
    console.log('r=', r);
    caro.each(r, function(i, arg) {
      var e;
      try {
        nFs.unlinkSync(arg);
      } catch (_error) {
        e = _error;
        showErr(e);
        cb(e);
        pass = false;
      }
    });
    return pass;
  };

  /**
   * check if empty-folder, return false if anyone is false
   * @param {...string} path
   * @returns {boolean}
   */
  self.isEmptyDir = function(path) {
    var pass;
    pass = true;
    caro.eachArgs(arguments, function(i, arg) {
      var count, e;
      try {
        count = 0;
        caro.readDirCb(arg, function() {
          count++;
        });
        if (count > 0) {
          pass = false;
          return false;
        }
        return true;
      } catch (_error) {
        e = _error;
        showErr(e);
        return pass = false;
      }
    });
    return pass;
  };

  /**
   * get files under path
   * @param {string} path
   * @param {object} [opt]
   * @param {number} [opt.maxLevel=1] the dir-level you want to read, get all-level when 0
   * @param {boolean} [opt.getDir=true] if return dir-path
   * @param {boolean} [opt.getFile=true] if return file-path
   * @param {boolean|string|[]} [opt.getByExtend=false] if set as string, will only return files including same extend-name
   * @param {function(object)} [cb] cb with file-info
   * @returns {*}
   */
  self.readDirCb = function(path, cb, opt) {
    var countLevel, getByExtend, getDir, getFile, maxLevel, pushFile, readDir;
    if (cb == null) {
      cb = null;
    }
    if (opt == null) {
      opt = {};
    }
    if (!caro.isFsDir(path)) {
      return;
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
      caro.executeIfFn(cb, oFileInfo);
    };
    readDir = function(rootPath, level) {
      var files;
      if (!caro.isFsDir(rootPath)) {
        return;
      }
      files = nFs.readdirSync(rootPath);
      if (maxLevel > 0 && level >= maxLevel) {
        return;
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
            pushFile(oFileInfo);
          }
          readDir(filePath, level);
          return;
        }
        if (caro.isFsFile(filePath)) {
          if (getFile) {
            pushFile(oFileInfo);
          }
        }
      });
    };
    readDir(path, countLevel);
  };

  /**
   * create dir recursively, will create folder if path not exists
   * @param {string} path
   * @returns {*|string}
   */
  self.createDir = function(path) {
    var aPath, e, subPath;
    path = caro.normalizePath(path);
    aPath = caro.splitStr(path, ['\\', '/']);
    subPath = '';
    try {
      caro.each(aPath, function(i, eachDir) {
        var exists;
        subPath = caro.normalizePath(subPath, eachDir);
        exists = caro.fsExists(subPath);
        if (!exists) {
          nFs.mkdirSync(subPath);
        }
      });
    } catch (_error) {
      e = _error;
      return false;
    }
    return true;
  };

  /**
   * delete folder recursively
   * @param {string} path
   * @param {boolean} [force=false] force-delete even not empty
   * @returns {boolean}
   */
  self.deleteDir = function(path, force) {
    var deleteUnderDir, pass;
    if (!caro.isFsDir(path)) {
      return false;
    }
    path = caro.normalizePath(path);
    force = force === true;
    pass = true;
    deleteUnderDir = function(rootPath) {
      caro.readDirCb(rootPath, function(oFilInfo) {
        var e, filePath;
        filePath = oFilInfo.filePath;
        if (!force) {
          return;
        }
        if (caro.isFsDir(filePath)) {
          deleteUnderDir(filePath);
          try {
            nFs.rmdirSync(filePath);
          } catch (_error) {
            e = _error;
            pass = false;
          }
          return;
        }
        if (!caro.deleteFile(filePath)) {
          pass = false;
        }
      });
    };
    deleteUnderDir(path);
    if (caro.isEmptyDir(path)) {
      nFs.rmdirSync(path);
    }
    return pass;
  };

  /**
   * check file if exists, return false when anyone is false
   * @param {...string} path
   * @returns {*}
   */
  self.fsExists = function(path) {
    var pass;
    pass = true;
    caro.eachArgs(arguments, function(i, arg) {
      var e;
      try {
        if (!nFs.existsSync(arg)) {
          pass = false;
          return false;
        }
      } catch (_error) {
        e = _error;
        pass = false;
        return false;
      }
      return true;
    });
    return pass;
  };

  /**
   * check if folder, return false when anyone is false
   * @param {...string} path
   * @returns {*}
   */
  self.isFsDir = function(path) {
    var pass;
    pass = true;
    caro.eachArgs(arguments, function(i, arg) {
      var e, stat;
      try {
        stat = caro.getFsStat(arg);
        pass = stat.isDirectory();
      } catch (_error) {
        e = _error;
        pass = false;
        return false;
      }
      return true;
    });
    return pass;
  };

  /**
   * @param {...string} path
   * @returns {*}
   */
  self.isFsFile = function(path) {
    var pass;
    pass = true;
    caro.eachArgs(arguments, function(i, arg) {
      var e, stat;
      try {
        stat = caro.getFsStat(arg);
        pass = stat.isFile();
      } catch (_error) {
        e = _error;
        pass = false;
        return false;
      }
      return true;
    });
    return pass;
  };

  /**
   * check if symbolic link
   * @param {...string} path
   * @returns {*}
   */
  self.isFsSymlink = function(path) {
    var pass;
    pass = true;
    caro.eachArgs(arguments, function(i, arg) {
      var e, stat;
      try {
        stat = caro.getFsStat(arg);
        pass = stat.isSymbolicLink();
      } catch (_error) {
        e = _error;
        pass = false;
        return false;
      }
      return true;
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
