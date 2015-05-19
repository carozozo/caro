###*
# Log
# @author Caro.Huang
###
# TODO next check
do ->
  return if !caro.isNode
  self = caro
  logPath = ''
  extendName = '.log'
  traceMode = false
  showErr = (e) ->
    console.error(e) if traceMode

  normalizeLogPath = (path) ->
    path = caro.normalizePath(logPath, path)
    caro.addTail path, extendName

  ###*
  # set the path that log placed
  # @param {string} path
  # @returns {boolean}
  ###

  self.setLogRoot = (path = logPath) ->
    path = caro.coverToStr(path)
    path = caro.normalizePath(path)
    if caro.createDir(path)
      logPath = path
      return true
    false

  ###*
  # get the path that log placed
  # @returns {string}
  ###

  self.getLogRoot = () ->
    logPath

  ###*
  # set the extend-name of log file
  # @param {string} name=.log
  # @returns {boolean}
  ###

  self.setLogExtendName = (name = extendName) ->
    name = caro.coverToStr(name)
    return false if !name
    name = caro.addHead(name, '.')
    extendName = name
    true

  ###*
  # get the extend-name of log file
  # @return {string}
  ###

  self.getLogExtendName = () ->
    extendName

  ###*
  # read log-file ,and create it if not exists
  # @param path
  # @returns {*}
  ###

  self.readLog = (path) ->
    path = normalizeLogPath(path)
    try
      if !caro.fsExists(path)
        return null
      return caro.readFileCaro(path)
    catch e
      console.error 'caro.log', e
      return null
    return

  ###*
  # write log-file with data
  # create empty-file if data is empty
  # @param {string} path
  # @param {*} [data='']
  # @returns {boolean}
  ###

  self.writeLog = (path, data = '') ->
    path = normalizeLogPath(path)
    try
      size = caro.getFsSize(path)
      maxSize = 10 ** 6
      if size > maxSize
        console.error 'caro.log: ', path + ' size ' + size + ' is more thane 1 MB'
        return false
      data = caro.coverToStr(data)
      return caro.writeFileCaro path, data
    catch e
      console.error 'caro.log: ', e
    false

  ###*
  # update log data
  # @param {string} path
  # @param {*} [data='']
  # @param {object} [opt={}]
  # @param {boolean} [opt.ifWrap=true] add wrap with add-data
  # @param {boolean} [opt.prepend=false] add data in front of origin-data
  # @returns {boolean}
  ###

  self.updateLog = (path, data, opt = {}) ->
    originData = caro.readLog(path)
    wrap = '\r\n'
    ifWrap = true
    prepend = false
    if opt
      ifWrap = opt.ifWrap != false
      prepend = opt.prepend == true
    originData = originData or ''
    data = caro.coverToStr(data)
    if originData and ifWrap
      if prepend
        data += wrap
      else
        originData += wrap
    if prepend
      data += originData
    else
      data = originData + data
    caro.writeLog path, data

  ###*
  # update log data
  # @param {string} path
  # @param {*} [data='']
  # @param {object} [opt={}]
  # @param {boolean} [opt.dateFirst=true] if set the date in first-filename
  # @param {boolean} [opt.ifWrap=true] add wrap with add-data
  # @param {boolean} [opt.prepend=false] add data in front of origin-data
  # @returns {boolean}
  ###

  self.updateLogWithDayFileName = (path, data, opt = {}) ->
    today = caro.formatNow('YYYYMMDD')
    dateFirst = if opt.dateFirst != false then true else false
    if dateFirst
      path = caro.addTail(today, '_' + path)
    else
      path = caro.addTail(path, '_' + today)
    caro.updateLog path, data, opt

  ###*
  # create trace.log for convenience
  # @param {*} [data='']
  # @param {object} [opt={}]
  # @param {boolean} [opt.ifWrap=true] add wrap with add-data
  # @param {boolean} [opt.prepend=false] add data in front of origin-data
  # @returns {boolean}
  ###

  self.traceLog = (data, opt) ->
    path = 'trace'
    caro.updateLog path, data, opt

  return