###*
# Log
# @author Caro.Huang
###

do ->
  if !caro.isNode
    return
  self = caro

  normalizeLogPath = (logPath) ->
    logPath = caro.normalizePath(logPath)
    caro.addTail logPath, '.log'

  ###*
  # read log-file ,and create it if not exists
  # @param logPath
  # @returns {*}
  ###

  self.readLog = (logPath) ->
    logPath = normalizeLogPath(logPath)
    try
      if !caro.fsExists(logPath)
        return null
      return caro.readFileCaro(logPath)
    catch e
      console.error 'caro.log', e
      return null
    return

  ###*
  # write log-file with data
  # create empty-file if data is empty
  # @param logPath
  # @param [data]
  # @returns {*}
  ###

  self.writeLog = (logPath, data) ->
    data = data or ''
    logPath = normalizeLogPath(logPath)
    try
      size = caro.getFsSize(logPath)
      maxSize = 10 ** 6
      if size > maxSize
        console.error 'caro.log: ', logPath + ' size ' + size + ' is more thane 1 MB'
        return
      data = caro.coverToStr(data)
      caro.writeFileCaro logPath, data
    catch e
      console.error 'caro.log: ', e
    return

  ###*
  # update log data
  # OPT
  # ifWrap: bool (default: true) - add wrap with add-data
  # prepend: bool (default: false) - add data in front of origin-data
  #
  # @param logPath
  # @param data
  # @param [opt]
  ###

  self.updateLog = (logPath, data, opt) ->
    originData = caro.readLog(logPath)
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
    caro.writeLog logPath, data
    return

  self.updateLogWithDayFileName = (logPath, data, opt) ->
    today = caro.formatNow('YYYYMMDD')
    logPath = caro.addTail(logPath, '_' + today)
    caro.updateLog logPath, data, opt
    return

  ###*
  # convenient-logger to [trace.log]
  # @param data
  # @param [opt]
  ###

  self.traceLog = (data, opt) ->
    logPath = 'trace'
    caro.updateLog logPath, data, opt
    return

  return