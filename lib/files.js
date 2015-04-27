/**
 * The operator of file
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};
    var nFs = require('fs');
    var nPath = require('path');

    /**
     * EX
     * normalizePath('aa//','bb/','/cc\\dd') => return 'aa\bb\cc'
     * @returns {string|*}
     */
    self.normalizePath = function () {
        return nPath.join.apply(nPath, arguments);
    };
    /**
     * auto add server root-path if not exist
     * @param path
     * @returns {*|string}
     */
    self.coverToFullPath = function (path) {
        if (!caro.isFullPath(path)) {
            path = nPath.join(__rootPath, path);
        }
        return path;
    };
    /**
     * @param path
     * @returns {*}
     */
    self.isDir = function (path) {
        return nFs.lstatSync(path).isDirectory();
    };
    /**
     * @param path
     * @returns {*}
     */
    self.isFile = function (path) {
        return nFs.lstatSync(path).isFile();
    };
    /**
     * check if path contain server root-path
     * @param path
     * @returns {boolean}
     */
    self.isFullPath = function (path) {
        path = caro.normalizePath(path);
        return (path.indexOf(__rootPath) === 0);
    };
    self.ifFileExists = function (path) {
        if (!path) {
            return false;
        }
        path = caro.coverToFullPath(path);
        return nFs.existsSync(path);
    };
    /**
     * Get the files under assign path
     *
     * OPT
     * getLevel: int (default: 0) - the dir-level you want to read, get all-level as 0
     * getFullPath: bool (default: true) - if return full path
     * getDir: bool (default: true) - if return dir-path
     * getFile: bool (default: true) - if return file-path
     * getByExtend: str/false (default: false) - if set as string, will only return files including same extend-name
     *
     * @param rootPath
     * @param [opt]
     * @returns {*}
     */
    self.readDir = function (rootPath, opt) {
        rootPath = caro.coverToFullPath(rootPath);
        var readDir = function (path, opt, firstRootPath, levelCount) {
            if (!caro.isStr(path) || path === '') return [];

            var getLevel = 0;
            var getFullPath = true;
            var getDir = true;
            var getFile = true;
            var getByExtend = false;

            // add vars if not
            firstRootPath = firstRootPath || path;
            firstRootPath = nPath.resolve(firstRootPath);
            levelCount = levelCount || 0;

            if (opt) {
                // get level default to 0 (get all)
                getLevel = opt.getLevel ? parseInt(opt.getLevel, 10) : 0;
                getFullPath = opt.getFullPath !== false;
                getDir = opt.getDir !== false;
                getFile = opt.getFile !== false;
                if (getFile) {
                    getByExtend = (caro.isStr(opt.getByExtend)) ? opt.getByExtend : false;
                    if (getByExtend) {
                        getByExtend = caro.addHead(getByExtend, '.');
                    }
                }
            }

            // count the current level
            levelCount++;

            var result = [];
            var files = nFs.readdirSync(path);
            caro.eachObj(files, function (i, file) {
                var fullPath = nPath.resolve(path + "/" + file);
                var stat = nFs.lstatSync(fullPath);
                if (stat === undefined) return;

                // if not get full path, remove the first time root path
                var shortPath = (getFullPath) ? fullPath : fullPath.replace(firstRootPath, '');

                if (stat.isDirectory()) {
                    if (getDir) {
                        result.push(shortPath);
                    }
                    if (getLevel === 0 || levelCount < getLevel) {
                        // call self to get more content
                        result = result.concat(readDir(fullPath, opt, firstRootPath, levelCount));
                    }
                }
                if (getFile && !stat.isDirectory()) {
                    if (!getByExtend) {
                        result.push(shortPath);
                    }
                    else {
                        var extName = nPath.extname(file);
                        if (extName === getByExtend) {
                            result.push(shortPath);
                        }
                    }
                }
            });
            return result;
        };
        return readDir(rootPath, opt);
    };
    self.readFile = function (path) {
        return nFs.readFileSync(path, {
            encoding: 'utf8'
        });
    };
    self.writeFile = function (path, data) {
        return nFs.writeFileSync(path, data, {
            encoding: 'utf8'
        });
    };
    /**
     * unlink file or dir
     * @param path
     * @returns {boolean}
     */
    self.unlink = function (path) {
        path = caro.coverToFullPath(path);
        try {
            if (caro.isDir(path)) {
                caro.unlinkUnderDir(path, {
                    removeSelf: true
                });
            }
            else {
                nFs.unlinkSync(path);
            }
        } catch (e) {
           console.error('caro.files', e);
            return false;
        }
        return true;
    };
    /**
     * remove directory recursively
     * OPT
     * keepByExtname: str/arr (default: undefined) - the file type want to keep by extend-name
     * removeByExtname: str/arr (default: undefined) - the file type want to remove by extend-name, this won't work if keepByExtname set
     * removeSelf: bool (default: false) - remove self or not,, this won't work if keepByExtname or removeByExtname set
     *
     * EX1
     * caro.unlinkUnderDir('aa/bb/cc', {
     *   keepByExtname:['txt','doc']
     * });
     * will remove all files that extend-name not '.txt' or '.doc'
     *
     * EX2
     * caro.unlinkUnderDir('aa/bb/cc', {
     *  removeByExtname:['txt','doc']
     * });
     * will remove all files that extend-name is '.txt' or '.doc'
     *
     * EX3
     * caro.unlinkUnderDir('aa/bb/cc', {
     *  removeSelf: false
     * });
     * will remove all files under /aa/bb/cc/, but keep /aa/bb/cc/
     *
     * @param path
     * @param [opt]
     * @returns {boolean}
     */
    self.unlinkUnderDir = function (path, opt) {
        opt = opt || {};
        var keepByExtname = opt.keepByExtname || [];
        var removeByExtname = opt.removeByExtname || [];
        var removeSelf = opt.removeSelf === true;
        keepByExtname = caro.splitStr(keepByExtname, ',');
        removeByExtname = caro.splitStr(removeByExtname, ',');
        path = caro.coverToFullPath(path);
        try {
            var files = nFs.readdirSync(path);
            caro.eachObj(files, function (i, file) {
                var curPath = nPath.join(path, file);
                if (caro.isDir(curPath)) {
                    // recursively
                    if (caro.isEmptyVal(removeByExtname)) {
                        opt.removeSelf = true;
                    }
                    caro.unlinkUnderDir(curPath, opt);
                    return;
                }
                var extendName = nPath.extname(curPath);
                extendName = extendName.replace('.', '');
                if (!caro.isEmptyVal(keepByExtname)) {
                    if (keepByExtname.indexOf(extendName) < 0) {
                        nFs.unlinkSync(curPath);
                    }
                    return;
                }
                if (!caro.isEmptyVal(removeByExtname)) {
                    if (removeByExtname.indexOf(extendName) > -1) {
                        nFs.unlinkSync(curPath);
                    }
                    return;
                }
                nFs.unlinkSync(curPath);
            });
            if (removeSelf) {
                nFs.rmdirSync(path);
            }
        } catch (e) {
           console.error('caro.files', e);
            return false;
        }
        return true;
    };
    self.createDir = function (path) {
        path = caro.coverToFullPath(path);
        var aPath = caro.splitStr(path, '\\');
        var subPath = '';
        caro.eachObj(aPath, function (i, eachDir) {
            subPath = nPath.join(subPath, eachDir + '/');
            var exists = nFs.existsSync(subPath);
            if (!exists) {
                nFs.mkdirSync(subPath);
            }
        });
        return path;
    };
    self.rename = function (path, newPath) {
        path = caro.coverToFullPath(path);
        newPath = caro.coverToFullPath(newPath);
        nFs.renameSync(path, newPath);
    };
    /**
     * get file name from path
     * OPT
     * full: bool (default: true) - if get full file name
     * @param path
     * @param [opt]
     * @returns {*}
     */
    self.getFileName = function (path, opt) {
        var full = true;
        if (opt) {
            full = opt.full !== false;
        }
        if (!full) {
            var extendName = caro.getExtendName(path);
            return nPath.basename(path, extendName);
        }
        return nPath.basename(path);
    };
    /**
     * EX
     * getExtendName('aa/bb/cc.txt') => get '.txt'
     * @param path
     * @returns {*}
     */
    self.getExtendName = function (path) {
        return nPath.extname(path);
    };
    self.getFileStatus = function (path) {
        if (!path || !caro.ifFileExists(path)) {
            return null;
        }
        path = caro.coverToFullPath(path);
        return nFs.statSync(path);
    };
    self.getFileSizeInBytes = function (path) {
        var status = caro.getFileStatus(path);
        if (!status) {
            return null;
        }
        return status.size;
    };
    self.getFileSizeInMegabytes = function (path) {
        var status = caro.getFileStatus(path);
        if (!status) {
            return null;
        }
        return status.size / 1000000.0;
    };
    return self;
})();