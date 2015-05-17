###*
# FileSystem
# @author Caro.Huang
###
do ->
  return if !caro.isNode
  self = caro
  nFs = require('fs')
  fileSizeUnits1 = [
    'KB'
    'MB'
    'GB'
    'TB'
    'PB'
    'EB'
    'ZB'
    'YB'
  ]
  fileSizeUnits2 = [
    'KiB'
    'MiB'
    'GiB'
    'TiB'
    'PiB'
    'EiB'
    'ZiB'
    'YiB'
  ]
  traceMode = false
  showErr = (e) ->
    console.error(e) if traceMode
  getArgs = (args) ->
    aStr = []
    aCb = []
    aBool = []
    caro.each args, (i, arg) ->
      if caro.isFn(arg)
        aCb.push arg
        return
      if caro.isBool(arg)
        aBool.push arg
        return
      if caro.isStr(arg)
        aStr.push arg
        return
      return
    {
    str: aStr
    cb: aCb
    bool: aBool
    }
  getFileSize = (path) ->
    status = caro.getFsStat(path)
    return status.size if status
    return path if caro.isNum(path)
    null

  ###*
  # set trace-mode, will console.error when
  ###
  self.setTrace = (bool) ->
    traceMode = bool == true

  # FILE --
  ###*
  # read file content, return false if failed
  # @param {string} path
  # @param {?string} [encoding=utf8]
  # @param {?string} [flag=null]
  # @returns {*}
  ###
  self.readFileCaro = (path, encoding = 'utf8', flag = null) ->
    try
      return nFs.readFileSync(path,
        encoding: encoding
        flag: flag)
    catch e
      showErr(e)
    false

  ###*
  # write data to file, return false if failed
  # @param {string} path
  # @param {*} data
  # @param {?string} [encoding=utf8]
  # @param {?string} [flag=null]
  # @returns {*}
  ###
  self.writeFileCaro = (path, data, encoding = 'utf8', flag = null) ->
    try
      nFs.writeFileSync path, data,
        encoding: encoding
        flag: flag
      return true
    catch e
      showErr(e)
    false

  # DIR --
  ###*
  # check if empty-folder, return false if anyone is false
  # @param {...string} path
  # @param {function} [cb] the callback-function for each path
  # @returns {boolean}
  ###
  self.isEmptyDir = (path, cb) ->
    pass = true
    args = getArgs(arguments)
    aPath = args.str
    cb = args.cb[0]
    caro.each aPath, (i, path) ->
      try
        count = nFs.readdirSync(path)
        pass = false if count.length > 0
        caro.executeIfFn(cb, false, path)
      catch e
        showErr(e)
        pass = false
        caro.executeIfFn(cb, e, path)
      return
    pass

  ###*
  # get files under path
  # @param {string} path
  # @param {function(object)} [cb] cb with file-info
  # @param {object} [opt]
  # @param {number} [opt.maxLevel=1] the dir-level you want to read, get all-level when 0
  # @param {boolean} [opt.getDir=true] if return dir-path
  # @param {boolean} [opt.getFile=true] if return file-path
  # @param {boolean|string|[]} [opt.getByExtend=false] if set as string, will only return files including same extend-name
  # @returns {*}
  ###
  self.readDirCb = (path, cb, opt = {}) ->
    countLevel = 0
    maxLevel = if opt.maxLevel then parseInt(opt.maxLevel, 10) else 1
    getDir = opt.getDir != false
    getFile = opt.getFile != false
    getByExtend = do ->
      r = false
      if opt.getByExtend
        r = caro.splitStr(opt.getByExtend, ',')
        caro.each r, (i, extendName) ->
          r[i] = caro.addHead(extendName, '.')
          return
      r
    pushFile = (oFileInfo) ->
      extendName = oFileInfo.extendName
      return if getByExtend and getByExtend.indexOf(extendName) < 0
      cb false, oFileInfo
    readDir = (rootPath, level) ->
      if maxLevel > 0 and level >= maxLevel
        return
      try
        files = nFs.readdirSync(rootPath)
      catch e
        showErr(e)
        cb e
      level++
      caro.each files, (i, basename) ->
        filename = caro.getFileName(basename, false)
        extendName = caro.getExtendName(basename)
        filePath = caro.normalizePath(rootPath, basename)
        dirPath = caro.getDirPath(filePath)
        fullPath = caro.coverToFullPath(filePath)
        fullDirPath = caro.getDirPath(fullPath)
        fileType = caro.getFileType(filePath)
        oFileInfo =
          filename: filename
          extendName: extendName
          basename: basename
          filePath: filePath
          dirPath: dirPath
          fullPath: fullPath
          fullDirPath: fullDirPath
          fileType: fileType
          level: level - 1
          index: i
        if caro.isFsDir(filePath)
          if getDir
            return pushFile oFileInfo
          readDir filePath, level
          return
        if caro.isFsFile(filePath)
          if getFile
            return pushFile oFileInfo
        return
      return
    readDir path, countLevel
    return

  ###*
  # create dir recursively, will create folder if path not exists
  # @param {...string} path
  # @param {function} [cb] the callback-function for each path
  # @returns {*|string}
  ###
  self.createDir = (path, cb) ->
    pass = true
    args = getArgs(arguments)
    aPath = args.str
    cb = args.cb[0]
    createDir = (dirPath)->
      subPath = ''
      aPath = caro.splitStr(dirPath, [
        '\\' # for windows
        '/' # for linux
      ])
      caro.each aPath, (i, eachDir)->
        subPath = caro.normalizePath(subPath, eachDir)
        exists = caro.fsExists(subPath)
        return if exists
        try
          nFs.mkdirSync subPath
          caro.executeIfFn(cb, false, subPath)
        catch e
          showErr(e)
          pass = false
          caro.executeIfFn(cb, e, subPath)
        return
    caro.each aPath, (i, dirPath) ->
      createDir(dirPath)
    pass

  # COMMON --
  ###*
  # check file if exists, return false when anyone is false
  # @param {...string} path
  # @param {function} [cb] the callback-function for each path
  # @returns {*}
  ###
  self.fsExists = (path, cb) ->
    pass = true
    args = getArgs(arguments)
    aPath = args.str
    cb = args.cb[0]
    caro.each aPath, (i, path) ->
      try
        if !nFs.existsSync(path)
          pass = false
          caro.executeIfFn(cb, false, path)
      catch e
        showErr(e)
        pass = false
        caro.executeIfFn(cb, e, path)
      return
    pass

  ###*
  # check if folder, return false when anyone is false
  # @param {...string} path
  # @param {function} [cb] the callback-function for each path
  # @returns {*}
  ###
  self.isFsDir = (path, cb) ->
    pass = true
    args = getArgs(arguments)
    aPath = args.str
    cb = args.cb[0]
    caro.each aPath, (i, path) ->
      try
        stat = caro.getFsStat(path)
        pass and pass = stat.isDirectory()
        caro.executeIfFn(cb, false, path)
      catch e
        showErr(e)
        pass = false
        caro.executeIfFn(cb, e, path)
      return
    pass

  ###*
  # check if file, return false when anyone is false
  # @param {...string} path
  # @param {function} [cb] the callback-function for each path
  # @returns {*}
  ###
  self.isFsFile = (path) ->
    pass = true
    args = getArgs(arguments)
    aPath = args.str
    cb = args.cb[0]
    caro.each aPath, (i, path) ->
      try
        stat = caro.getFsStat(path)
        pass and pass = stat.isFile()
        caro.executeIfFn(cb, false, path)
      catch e
        showErr(e)
        pass = false
        caro.executeIfFn(cb, e, path)
      return
    pass

  ###*
  # check if symbolic link, return false when anyone is false
  # @param {function} [cb] the callback-function for each path
  # @param {...string} path
  # @returns {*}
  ###
  self.isFsSymlink = (path) ->
    pass = true
    args = getArgs(arguments)
    aPath = args.str
    cb = args.cb[0]
    caro.each aPath, (i, path) ->
      try
        stat = caro.getFsStat(path)
        pass and pass = stat.isSymbolicLink()
        caro.executeIfFn(cb, false, path)
      catch e
        showErr(e)
        pass = false
        caro.executeIfFn(cb, e, path)
      return
    pass

  ###*
  # @param {string} path
  # @returns {string}
  ###
  self.getFileType = (path) ->
    r = ''
    if caro.isFsDir(path)
      r = 'dir'
    if caro.isFsFile(path)
      r = 'file'
    if caro.isFsSymlink(path)
      r = 'link'
    r

  ###*
  # delete file/folder recursively
  # @param {...string} path
  # @param {function} [cb] the callback-function for each path
  # @param {boolean} [force=false] force-delete even not empty
  # @returns {boolean}
  ###
  self.deleteFs = (path, cb, force) ->
    err = []
    pass = true
    argAndCb = getArgs(arguments)
    aPath = argAndCb.str
    cb = argAndCb.cb[0]
    force = argAndCb.bool[0]
    tryAndCatchErr = (fn)->
      try
        fn()
      catch e
        showErr(e)
        pass = false
        err.push e
      return
    deleteFileOrDir = (path) ->
      if caro.isFsFile(path) and force
        tryAndCatchErr(->
          nFs.unlinkSync(path)
        )
        return
      if caro.isFsDir(path)
        tryAndCatchErr(->
          files = nFs.readdirSync(path)
          caro.each files, (i, file) ->
            subPath = caro.normalizePath(path, file)
            deleteFileOrDir(subPath)
            return
          return
        )
      tryAndCatchErr(->
        nFs.rmdirSync(path)
      )
      err
    caro.each aPath, (i, dirPath) ->
      err = [] # reset err in each path
      err = deleteFileOrDir(dirPath)
      caro.executeIfFn(cb, err, dirPath)
    pass

  # TODO  next check
  ###*
  # @param {string|...[]} path the file-path, you can also set as [path,newPath]
  # @param {string|...[]} newPath the new-path, you can also set as [path,newPath]
  # @param {boolean} [force] will create folder if there is no path for newPath
  # @returns {boolean}
  ###

  self.renameFs = (path, newPath, force = false) ->
    pass = true
    aPath = []
    if caro.isStr(path, newPath)
      aPath.push [
        path
        newPath
      ]
    caro.eachArgs arguments, (i, arg) ->
      if caro.isArr(arg)
        aPath.push arg
      if caro.isBool(arg)
        force = arg
      return
    # e.g. aPath=[[path, path2],[path3, path4]]
    caro.each aPath, (i, pathMap) ->
      path1 = pathMap[0]
      path2 = pathMap[1]
      try
        if force and caro.fsExists(path1)
          dirPath2 = caro.getDirPath(path2)
          caro.createDir dirPath2
        nFs.renameSync path1, path2
        if !caro.fsExists(path2)
          pass = false
      catch e
        showErr(e)
        pass = false
      return
    pass

  ###*
  # get file stat
  # @param {string} path
  # @param {string} [type=l] s = statSync, l = lstatSync, f = fstatSync
  # @returns {*}
  ###

  self.getFsStat = (path, type = 'l') ->
    stat = null
    aType = [
      'l'
      's'
      'f'
    ]
    type = if aType.indexOf(type) > -1 then type else aType[0]
    try
      switch type
        when 's'
          stat = nFs.lstatSync(path)
        when 'f'
          stat = nFs.fstatSync(path)
        else
          stat = nFs.statSync(path)
          break
    catch e
      showErr(e)
    stat

  ###*
  # get file size, default in bytes or set by unit
  # @param {number|string} path file-path or bytes
  # @param {number} [fixed=1] decimals of float
  # @param {string} [unit] the file-size unit
  # @returns {}
  ###

  self.getFsSize = (path, fixed = 1, unit) ->
    bytes = getFileSize(path)
    if bytes == null
      return bytes
    si = true
    unit = caro.upperStr(unit)
    index1 = fileSizeUnits1.indexOf(unit)
    index2 = fileSizeUnits2.indexOf(unit)
    if index2 > -1
      si = false
    thresh = if si then 1000 else 1024
    index = if si then index1 else index2
    count = 0
    if index < 0
      return bytes
    loop
      bytes /= thresh
      ++count
      unless count < index
        break
    bytes.toFixed fixed

  ###*
  # get file size for human-reading
  # @param {number|string} path file-path or bytes
  # @param {number} [fixed=1] decimals of float
  # @param {boolean} [si=true] size-type, true decimal, false as binary
  # @returns {string}
  ###

  self.humanFeSize = (path, fixed = 1, si = true) ->
    bytes = getFileSize(path)
    if bytes == null
      return bytes
    thresh = if si then 1000 else 1024
    if bytes < thresh
      return bytes + ' B'
    aUnit = if si then fileSizeUnits1 else fileSizeUnits2
    u = -1
    loop
      bytes /= thresh
      ++u
      unless bytes >= thresh
        break
    bytes.toFixed(fixed) + ' ' + aUnit[u]

  return