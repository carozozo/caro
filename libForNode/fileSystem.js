/**
 * The helper of common file functions
 * @namespace caro
 * @author Caro.Huang
 */
(function (fn) {
    caro.setCaro(fn);
})(function (self) {
    var nFs = require('fs');
    var fileSizeUnits1 = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var fileSizeUnits2 = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var getFileSize = function (path) {
        var status = caro.getFsStat(path);
        if (status) {
            return status.size;
        }
        if (caro.isNum(path)) {
            return path;
        }
        return null;
    };

    // FILE --
    /**
     * read file content, return false if failed
     * @param {string} path
     * @param {?string} [encoding=utf8]
     * @param {?string} [flag=null]
     * @returns {*}
     */
    self.readFileCaro = function (path, encoding, flag) {
        encoding = encoding || 'utf8';
        flag = flag || null;
        try {
            return nFs.readFileSync(path, {
                encoding: encoding,
                flag: flag
            });
        } catch (e) {
            return false;
        }
    };
    /**
     * write data to file, return false if failed
     * @param {string} path
     * @param {*} data
     * @param {?string} [encoding=utf8]
     * @param {?string} [flag=null]
     * @returns {*}
     */
    self.writeFileCaro = function (path, data, encoding, flag) {
        encoding = encoding || 'utf8';
        flag = flag || null;
        try {
            nFs.writeFileSync(path, data, {
                encoding: encoding,
                flag: flag
            });
            return true;
        } catch (e) {
            return false;
        }
    };
    /**
     * @param {...string} path
     * @returns {boolean}
     */
    self.deleteFile = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                nFs.unlinkSync(arg);
            } catch (e) {
                pass = false;
            }
        });
        return pass;
    };
    // DIR --
    /**
     * check if empty-folder, return false if anyone is false
     * @param {...string} path
     * @returns {boolean}
     */
    self.isEmptyDir = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isFsDir(arg)) {
                var count = 0;
                caro.readDirCb(arg, function () {
                    count++;
                });
                if (count > 0) {
                    pass = false;
                    return false;
                }
                return true;
            }
            else {
                pass = false;
                return false;
            }
        });
        return pass;
    };
    /**
     * get files under path
     * @param {string} path
     * @param {object} [opt]
     * @param {number} [opt.maxLevel=0] the dir-level you want to read, get all-level when 0
     * @param {boolean} [opt.getDir=true] if return dir-path
     * @param {boolean} [opt.getFile=true] if return file-path
     * @param {boolean|string|[]} [opt.getByExtend=false] if set as string, will only return files including same extend-name
     * @param {function(object)} [cb] cb with file-info
     * @returns {*}
     */
    self.readDirCb = function (path, opt, cb) {
        if (!caro.isFsDir(path)) {
            return [];
        }
        var countLevel = 0;
        caro.eachObj(arguments, function (i, arg) {
            if (i === 0) {
                return;
            }
            if (caro.isObj(arg)) {
                opt = arg;
            }
            if (caro.isFn(arg)) {
                cb = arg;
            }
        });
        opt = opt || {};
        cb = cb || null;
        var maxLevel = opt.maxLevel ? parseInt(opt.maxLevel, 10) : 1;
        var getDir = opt.getDir !== false;
        var getFile = opt.getFile !== false;
        var getByExtend = (function () {
            var ret = false;
            if (opt.getByExtend) {
                ret = caro.splitStr(opt.getByExtend, ',');
                caro.eachObj(ret, function (i, extendName) {
                    ret[i] = caro.addHead(extendName, '.');
                });
            }
            return ret;
        })();
        var pushFile = function (oFileInfo) {
            var extendName = oFileInfo.extendName;
            if (getByExtend && getByExtend.indexOf(extendName) < 0) {
                return;
            }
            caro.executeIfFn(cb, oFileInfo);
        };
        var readDir = function (rootPath, level) {
            if (!caro.isFsDir(rootPath)) {
                return;
            }
            var files = nFs.readdirSync(rootPath);
            if (maxLevel > 0 && level >= maxLevel) {
                return;
            }
            level++;
            caro.eachObj(files, function (i, basename) {
                var filename = caro.getFileName(basename, false);
                var extendName = caro.getExtendName(basename);
                var filePath = caro.normalizePath(rootPath, basename);
                var dirPath = caro.getDirPath(filePath);
                var fullPath = caro.coverToFullPath(filePath);
                var fullDirPath = caro.getDirPath(fullPath);
                var fileType = caro.getFileType(filePath);
                var oFileInfo = {
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
        return readDir(path, countLevel);
    };
    /**
     * create dir recursively, will create folder if path not exists
     * @param {string} path
     * @returns {*|string}
     */
    self.createDir = function (path) {
        path = caro.normalizePath(path);
        // [\\] for windows, [/] for linux
        var aPath = caro.splitStr(path, ['\\', '/']);
        var subPath = '';
        try {
            caro.eachObj(aPath, function (i, eachDir) {
                subPath = caro.normalizePath(subPath, eachDir);
                var exists = caro.fsExists(subPath);
                if (!exists) {
                    nFs.mkdirSync(subPath);
                }
            });
        } catch (e) {
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
    self.deleteDir = function (path, force) {
        if (!caro.isFsDir(path)) {
            return false;
        }
        path = caro.normalizePath(path);
        force = force === true;
        var pass = true;
        var deleteUnderDir = function (rootPath, getFile) {
            getFile = getFile !== false;
            caro.readDirCb(rootPath, function (oFilInfo) {
                var filePath = oFilInfo.filePath;
                if (caro.isFsDir(filePath)) {
                    if (force) {
                        deleteUnderDir(filePath);
                        try {
                            nFs.rmdirSync(filePath);
                        } catch (e) {
                            pass = false;
                        }
                    }
                    return;
                }
                if (!caro.deleteFile(filePath)) {
                    pass = false;
                }
            }, {
                getFile: getFile
            });
        };
        deleteUnderDir(path, false);
        if (caro.isEmptyDir(path)) {
            nFs.rmdirSync(path);
        }
        return pass;
    };
    // COMMON --
    /**
     * check file if exists, return false when anyone is false
     * @param {...string} path
     * @returns {*}
     */
    self.fsExists = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                if (!nFs.existsSync(arg)) {
                    pass = false;
                    return false;
                }
            } catch (e) {
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
    self.isFsDir = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                var stat = caro.getFsStat(arg);
                pass = stat.isDirectory();
            } catch (e) {
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
    self.isFsFile = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                var stat = caro.getFsStat(arg);
                pass = stat.isFile();
            } catch (e) {
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
    self.isFsSymlink = function (path) {
        var pass = true;
        caro.eachObj(arguments, function (i, arg) {
            try {
                var stat = caro.getFsStat(arg);
                pass = stat.isSymbolicLink();
            } catch (e) {
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
    self.getFileType = function (path) {
        var ret = '';
        if (caro.isFsDir(path)) {
            ret = 'dir';
        }
        if (caro.isFsFile(path)) {
            ret = 'file';
        }
        if (caro.isFsSymlink(path)) {
            ret = 'link';
        }
        return ret;
    };
    /**
     * delete file or dir or link, return false delete failed
     * @param {...string} path
     * @param {boolean} [force]
     * @returns {boolean}
     */
    self.deleteFs = function (path, force) {
        var pass = true;
        var aPath = [];
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isBool(arg)) {
                force = arg;
                return;
            }
            if (caro.isStr(arg)) {
                aPath.push(arg);
            }
        });
        try {
            caro.eachObj(aPath, function (i, path) {
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
        } catch (e) {
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
    self.renameFs = function (path, newPath, force) {
        var pass = true;
        var aPath = [];
        if (caro.isStr(path, newPath)) {
            aPath.push([path, newPath]);
        }
        caro.eachObj(arguments, function (i, arg) {
            if (caro.isArr(arg)) {
                aPath.push(arg);
            }
            if (caro.isBool(arg)) {
                force = arg;
            }
        });
        // e.g. aPath=[[path, path2],[path3, path4]]
        caro.eachObj(aPath, function (i, pathMap) {
            var path1 = pathMap[0];
            var path2 = pathMap[1];
            try {
                if (force && caro.fsExists(path1)) {
                    var dirPath2 = caro.getDirPath(path2);
                    caro.createDir(dirPath2);
                }
                nFs.renameSync(path1, path2);
                if (!caro.fsExists(path2)) {
                    pass = false;
                }
            } catch (e) {
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
    self.getFsStat = function (path, type) {
        var stat = null;
        var aType = ['l', 's', 'f'];
        type = aType.indexOf(type) > -1 ? type : aType[0];
        try {
            switch (type) {
                case 's':
                    stat = nFs.lstatSync(path);
                    break;
                case 'f':
                    stat = nFs.fstatSync(path);
                    break;
                default :
                    stat = nFs.statSync(path);
                    break;
            }
        } catch (e) {
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
    self.getFsSize = function (path, fixed, unit) {
        var bytes = getFileSize(path);
        if (bytes === null) {
            return bytes;
        }
        caro.eachObj(arguments, function (i, arg) {
            if (i <= 0) {
                return;
            }
            if (caro.isNum(arg)) {
                fixed = parseInt(arg);
            }
            if (caro.isStr(arg)) {
                unit = arg;
            }
        });
        fixed = fixed || 1;
        var si = true;
        var index1 = fileSizeUnits1.indexOf(unit);
        var index2 = fileSizeUnits2.indexOf(unit);
        if (index2 > -1) {
            si = false;
        }
        var thresh = si ? 1000 : 1024;
        var index = si ? index1 : index2;
        var count = 0;
        if (index < 0) {
            return bytes;
        }
        do {
            bytes /= thresh;
            ++count;
        } while (count < index);
        return bytes.toFixed(fixed);
    };
    /**
     * get file size for human-reading
     * @param {number|string} path file-path or bytes
     * @param {number} [fixed=1] decimals of float
     * @param {boolean} [si=true] size-type, true decimal, false as binary
     * @returns {string}
     */
    self.humanFeSize = function (path, fixed, si) {
        var bytes = getFileSize(path);
        if (bytes === null) {
            return bytes;
        }
        caro.eachObj(arguments, function (i, arg) {
            if (i <= 0) {
                return;
            }
            if (caro.isNum(arg)) {
                fixed = parseInt(arg);
            }
            if (caro.isBool(arg)) {
                si = arg;
            }
        });
        fixed = fixed || 1;
        si = si !== false;
        var thresh = si ? 1000 : 1024;
        if (bytes < thresh) return bytes + ' B';
        var aUnit = si ? fileSizeUnits1 : fileSizeUnits2;
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (bytes >= thresh);
        return bytes.toFixed(fixed) + ' ' + aUnit[u];
    };
});