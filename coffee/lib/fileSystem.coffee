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
    aFn = []
    aBool = []
    aArr = []
    aNum = []
    caro.each args, (i, arg) ->
      if caro.isFn(arg)
        aFn.push arg
        return
      if caro.isBoolean(arg)
        aBool.push arg
        return
      if caro.isStr(arg)
        aStr.push arg
        return
      if caro.isArr(arg)
        aArr.push arg
        return
      if caro.isNum(arg)
        aNum.push arg
        return
      return
    fn: aFn
    bool: aBool
    str: aStr
    arr: aArr
    num: aNum
  coverToFalseIfEmptyArr = (arr) ->
    return false if arr.length < 1
    arr
  getFileSize = (path) ->
    status = caro.getFsStat(path)
    return status.size if status
    return path if caro.isNum(path)
    null

  ###*
  # set trace-mode, will console.error when got exception
  # @returns {boolean}
  ###
  self.setFsTrace = (bool) ->
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
    cb = args.fn[0]
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
  # @param {number} [opt.maxLayer=1] the dir-layer you want to read, get all-layer when 0
  # @param {boolean} [opt.getDir=true] if return dir-path
  # @param {boolean} [opt.getFile=true] if return file-path
  # @param {boolean|string|[]} [opt.getByExtend=false] if set as string, will only return files including same extend-name
  # @returns {*}
  ###
  self.readDirCb = (path, cb, opt = {}) ->
    countLayer = 0
    maxLayer = if opt.maxLayer? then parseInt(opt.maxLayer, 10) else 1
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
    readDir = (rootPath, layer) ->
      if maxLayer > 0 and layer >= maxLayer
        return
      try
        files = nFs.readdirSync(rootPath)
      catch e
        showErr(e)
        cb e
      layer++
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
          layer: layer - 1
          index: i
        if caro.isFsDir(filePath)
          return false if getDir and pushFile(oFileInfo) == false
          readDir filePath, layer
          return
        return false if caro.isFsFile(filePath) and getFile and pushFile(oFileInfo) == false
        return
      return
    readDir path, countLayer
    return

  ###*
  # create dir recursively, will create folder if path not exists
  # @param {...string} path
  # @param {function} [cb] the callback-function for each path
  # @returns {*|string}
  ###
  self.createDir = (path, cb) ->
    err = []
    pass = true
    args = getArgs(arguments)
    aPath = args.str
    cb = args.fn[0]
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
        catch e
          showErr(e)
          pass = false
          err.push e
        return
      err
    caro.each aPath, (i, dirPath) ->
      err = [] # reset err in each path
      err = createDir(dirPath)
      err = coverToFalseIfEmptyArr(err)
      caro.executeIfFn(cb, err, dirPath)
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
    cb = args.fn[0]
    caro.each aPath, (i, path) ->
      err = false
      try
        pass = false if !nFs.existsSync(path)
      catch e
        showErr(e)
        pass = false
        err = e
      caro.executeIfFn(cb, err, path)
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
    cb = args.fn[0]
    caro.each aPath, (i, path) ->
      err = false
      try
        stat = caro.getFsStat(path)
        pass and pass = stat.isDirectory()
      catch e
        showErr(e)
        pass = false
        err = e
      caro.executeIfFn(cb, err, path)
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
    cb = args.fn[0]
    caro.each aPath, (i, path) ->
      err = false
      try
        stat = caro.getFsStat(path)
        pass and pass = stat.isFile()
      catch e
        showErr(e)
        pass = false
        err = e
      caro.executeIfFn(cb, err, path)
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
    cb = args.fn[0]
    caro.each aPath, (i, path) ->
      err = false
      try
        stat = caro.getFsStat(path)
        pass and pass = stat.isSymbolicLink()
      catch e
        showErr(e)
        pass = false
        err = e
      caro.executeIfFn(cb, err, path)
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
    args = getArgs(arguments)
    aPath = args.str
    cb = args.fn[0]
    force = args.bool[0]
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
      err = coverToFalseIfEmptyArr(err)
      caro.executeIfFn(cb, err, dirPath)
    pass

  ###*
  # @param {string|...[]} path the file-path, you can also set as [path,newPath]
  # @param {string|...[]} newPath the new-path, you can also set as [path,newPath]
  # @param {function} [cb] the callback-function for each path
  # @param {boolean} [force=false] will create folder if there is no path for newPath
  # @returns {boolean}
  ###
  self.renameFs = (path, newPath, cb, force = false) ->
    pass = true
    aPathMap = []
    args = getArgs(arguments)
    cb = args.fn[0]
    force = args.bool[0]
    aPathMap = do ->
      if caro.isStr(path, newPath)
        return [
          path
          newPath
        ]
      args.arr
    # e.g. aPath=[[path, path2],[path3, path4]]
    caro.each aPathMap, (i, pathMap) ->
      err = false
      path1 = pathMap[0]
      path2 = pathMap[1]
      try
        if force and caro.fsExists(path1)
          dirPath2 = caro.getDirPath(path2)
          caro.createDir dirPath2
        nFs.renameSync path1, path2
      catch e
        showErr(e)
        pass = false
        err = e
      caro.executeIfFn(cb, err, path1, path2)
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
    return bytes if bytes == null
    args = caro.objToArr(arguments)
    args.shift()
    args = getArgs(args)
    fixed = caro.coverToInt(args.num[0])
    fixed = if fixed > -1 then fixed else 1
    unit = args.str[0]
    si = true
    unit = caro.upperFirst(unit) # e.g. 'mib' -> 'Mib'
    unit = caro.upperStr(unit, {start: -1}) # e.g. 'Mib' -> 'MiB'
    index1 = fileSizeUnits1.indexOf(unit)
    index2 = fileSizeUnits2.indexOf(unit)
    si = false if index2 > -1
    index = if si then index1 else index2
    return bytes if index < 0
    count = 0
    thresh = if si then 1000 else 1024
    while count < index
      bytes /= thresh
      ++count
    caro.coverToNum(bytes.toFixed(fixed))

  ###*
  # get file size for human-reading
  # @param {number|string} path file-path or bytes
  # @param {number} [fixed=1] decimals of float
  # @param {boolean} [si=true] size-type, true decimal, false as binary
  # @returns {string}
  ###
  self.humanFeSize = (path, fixed = 1, si = true) ->
    bytes = getFileSize(path)
    return bytes if bytes == null
    thresh = if si then 1000 else 1024
    return bytes + ' B' if bytes < thresh
    aUnit = if si then fileSizeUnits1 else fileSizeUnits2
    u = -1
    while bytes >= thresh
      bytes /= thresh
      ++u
    caro.coverToFixed(bytes, fixed) + ' ' + aUnit[u]

  return