###*
# Path
# @author Caro.Huang
###

do ->
  if !caro.isNode
    return
  self = caro
  nPath = require('path')
  absolutePath = if typeof __dirname != 'undefined' then __dirname else ''

  ###*
  # set absolute root path
  # @param path
  # @returns {String}
  ###

  self.setAbsolutePath = (path) ->
    path = caro.coverToStr(path)
    absolutePath = path
    absolutePath

  ###*
  #
  # @returns {String}
  ###

  self.getAbsolutePath = ->
    absolutePath

  ###*
  # check if path contain absolute root path
  # @param {*} path
  # @returns {boolean}
  ###

  self.isFullPath = (path) ->
    path = caro.normalizePath(path)
    path.indexOf(absolutePath) == 0

  ###*
  # get dir-path of path
  # @param {string} path
  # @returns {string}
  ###

  self.getDirPath = (path) ->
    nPath.dirname path

  ###*
  # get file name from path
  # OPT
  # full: bool (default: true) - if get full file name
  # @param {string} path
  # @param {boolean} [getFull] return basename if true
  # @returns {*}
  ###

  self.getFileName = (path, getFull) ->
    getFull = getFull != false
    if !getFull
      extendName = caro.getExtendName(path)
      return nPath.basename(path, extendName)
    nPath.basename path

  ###*
  # EX
  # getExtendName('aa/bb/cc.txt') => get '.txt'
  # @param path
  # @param {boolean} [withDot=true]
  # @returns {*}
  ###

  self.getExtendName = (path, withDot) ->
    extendName = nPath.extname(path)
    withDot = withDot != false
    if !withDot
      extendName = extendName.replace('.', '')
    extendName

  ###*
  # @param {...} path
  # @returns {string|*}
  ###

  self.normalizePath = (path) ->
    args = caro.getArgumentsAsArr(arguments)
    nPath.join.apply nPath, args

  ###*
  # auto add server root-path if not exist
  # @param {...} path
  # @returns {*|string}
  ###

  self.coverToFullPath = (path) ->
    path = caro.normalizePath.apply(this, arguments)
    if !caro.isFullPath(path)
      path = nPath.join(absolutePath, path)
    path

  return