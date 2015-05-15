###*
# FileSystem
# @author Caro.Huang
###

do ->
  'use strict'
  if !caro.isNode
    return
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

  getFileSize = (path) ->
    status = caro.getFsStat(path)
    if status
      return status.size
    if caro.isNum(path)
      return path
    null

  # FILE --

  ###*
  # read file content, return false if failed
  # @param {string} path
  # @param {?string} [encoding=utf8]
  # @param {?string} [flag=null]
  # @returns {*}
  ###

  self.readFileCaro = (path, encoding, flag) ->
    encoding = encoding or 'utf8'
    flag = flag or null
    try
      return nFs.readFileSync(path,
        encoding: encoding
        flag: flag)
    catch e
    return false

  ###*
  # write data to file, return false if failed
  # @param {string} path
  # @param {*} data
  # @param {?string} [encoding=utf8]
  # @param {?string} [flag=null]
  # @returns {*}
  ###

  self.writeFileCaro = (path, data, encoding, flag) ->
    encoding = encoding or 'utf8'
    flag = flag or null
    try
      nFs.writeFileSync path, data,
        encoding: encoding
        flag: flag
      return true
    catch e
    return false

  ###*
  # @param {...string} path
  # @returns {boolean}
  ###

  self.deleteFile = (path) ->
    pass = true
    caro.eachArgs arguments, (i, arg) ->
      try
        nFs.unlinkSync arg
      catch e
        pass = false
      return
    pass

  # DIR --

  ###*
  # check if empty-folder, return false if anyone is false
  # @param {...string} path
  # @returns {boolean}
  ###

  self.isEmptyDir = (path) ->
    pass = true
    caro.eachArgs arguments, (i, arg) ->
      if caro.isFsDir(arg)
        count = 0
        caro.readDirCb arg, ->
          count++
          return
        if count > 0
          pass = false
          return false
        true
      else
        pass = false
        false
    pass

  ###*
  # get files under path
  # @param {string} path
  # @param {object} [opt]
  # @param {number} [opt.maxLevel=1] the dir-level you want to read, get all-level when 0
  # @param {boolean} [opt.getDir=true] if return dir-path
  # @param {boolean} [opt.getFile=true] if return file-path
  # @param {boolean|string|[]} [opt.getByExtend=false] if set as string, will only return files including same extend-name
  # @param {function(object)} [cb] cb with file-info
  # @returns {*}
  ###

  self.readDirCb = (path, cb=null, opt={}) ->
    if !caro.isFsDir(path)
      return
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
      if getByExtend and getByExtend.indexOf(extendName) < 0
        return
      caro.executeIfFn cb, oFileInfo
      return

    readDir = (rootPath, level) ->
      if !caro.isFsDir(rootPath)
        return
      files = nFs.readdirSync(rootPath)
      if maxLevel > 0 and level >= maxLevel
        return
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
            pushFile oFileInfo
          readDir filePath, level
          return
        if caro.isFsFile(filePath)
          if getFile
            pushFile oFileInfo
        return
      return

    readDir path, countLevel
    return

  ###*
  # create dir recursively, will create folder if path not exists
  # @param {string} path
  # @returns {*|string}
  ###

  self.createDir = (path) ->
    path = caro.normalizePath(path)
    # [\\] for windows, [/] for linux
    aPath = caro.splitStr(path, [
      '\\'
      '/'
    ])
    subPath = ''
    try
      caro.each aPath, (i, eachDir) ->
        subPath = caro.normalizePath(subPath, eachDir)
        exists = caro.fsExists(subPath)
        if !exists
          nFs.mkdirSync subPath
        return
    catch e
      return false
    true

  ###*
  # delete folder recursively
  # @param {string} path
  # @param {boolean} [force=false] force-delete even not empty
  # @returns {boolean}
  ###

  self.deleteDir = (path, force) ->
    if !caro.isFsDir(path)
      return false
    path = caro.normalizePath(path)
    force = force == true
    pass = true
    deleteUnderDir = (rootPath) ->
      caro.readDirCb rootPath, (oFilInfo) ->
        filePath = oFilInfo.filePath
        if !force
          return
        if caro.isFsDir(filePath)
          deleteUnderDir filePath
          try
            nFs.rmdirSync filePath
          catch e
            pass = false
          return
        if !caro.deleteFile(filePath)
          pass = false
        return
      return

    deleteUnderDir path
    if caro.isEmptyDir(path)
      nFs.rmdirSync path
    pass

  # COMMON --

  ###*
  # check file if exists, return false when anyone is false
  # @param {...string} path
  # @returns {*}
  ###

  self.fsExists = (path) ->
    pass = true
    caro.eachArgs arguments, (i, arg) ->
      try
        if !nFs.existsSync(arg)
          pass = false
          return false
      catch e
        pass = false
        return false
      true
    pass

  ###*
  # check if folder, return false when anyone is false
  # @param {...string} path
  # @returns {*}
  ###

  self.isFsDir = (path) ->
    pass = true
    caro.eachArgs arguments, (i, arg) ->
      try
        stat = caro.getFsStat(arg)
        pass = stat.isDirectory()
      catch e
        pass = false
        return false
      true
    pass

  ###*
  # @param {...string} path
  # @returns {*}
  ###

  self.isFsFile = (path) ->
    pass = true
    caro.eachArgs arguments, (i, arg) ->
      try
        stat = caro.getFsStat(arg)
        pass = stat.isFile()
      catch e
        pass = false
        return false
      true
    pass

  ###*
  # check if symbolic link
  # @param {...string} path
  # @returns {*}
  ###

  self.isFsSymlink = (path) ->
    pass = true
    caro.eachArgs arguments, (i, arg) ->
      try
        stat = caro.getFsStat(arg)
        pass = stat.isSymbolicLink()
      catch e
        pass = false
        return false
      true
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
  # delete file or dir or link, return false delete failed
  # @param {...string} path
  # @param {boolean} [force=false]
  # @returns {boolean}
  ###

  self.deleteFs = (path, force=false) ->
    pass = true
    aPath = []
    try
      caro.each aPath, (i, path) ->
        if caro.isFsDir(path)
          if !caro.deleteDir(path, force)
            pass = false
          return
        if !caro.deleteFile(path)
          pass = false
        return
    catch e
      pass = false
    pass

  ###*
  # @param {string|...[]} path the file-path, you can also set as [path,newPath]
  # @param {string|...[]} newPath the new-path, you can also set as [path,newPath]
  # @param {boolean} [force] will create folder if there is no path for newPath
  # @returns {boolean}
  ###

  self.renameFs = (path, newPath, force=false) ->
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
        pass = false
      return
    pass

  ###*
  # get file stat
  # @param {string} path
  # @param {string} [type=l] s = statSync, l = lstatSync, f = fstatSync
  # @returns {*}
  ###

  self.getFsStat = (path, type='l') ->
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
    stat

  ###*
  # get file size, default in bytes or set by unit
  # @param {number|string} path file-path or bytes
  # @param {number} [fixed=1] decimals of float
  # @param {string} [unit] the file-size unit
  # @returns {}
  ###

  self.getFsSize = (path, fixed=1, unit) ->
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

  self.humanFeSize = (path, fixed=1, si=true) ->
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