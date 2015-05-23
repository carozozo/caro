###*
# Path
# @author Caro.Huang
###
do ->
  return if !caro.isNode
  self = caro
  nPath = require('path')
  absolutePath = if typeof __dirname != 'undefined' then __dirname else ''

  ###*
  # set absolute root path
  # @param path
  # @returns {String}
  ###
  self.setAbsolutePath = (path) ->
    return false if !caro.isString(path)
    absolutePath = caro.normalizePath path

  ###*
  # get absolute root path
  # @returns {String}
  ###
  self.getAbsolutePath = ->
    absolutePath

  ###*
    # @param {...} path
    # @returns {string|*}
    ###
  self.normalizePath = (path) ->
    args = caro.objToArr(arguments)
    nPath.join.apply nPath, args

  ###*
  # check if path contain absolute root path
  # @param {*...} path
  # @returns {boolean}
  ###
  self.isFullPath = (path) ->
    pass = true
    caro.each(arguments, (i, val) ->
      val = caro.normalizePath(val)
      if val.indexOf(absolutePath) != 0
        pass = false
        return false
      return
    )
    pass

  ###*
  # get dir-path of path
  # @param {string} path
  # @returns {string}
  ###
  self.getDirPath = (path) ->
    nPath.dirname path

  ###*
  # get file name from path
  # @param {string} path
  # @param {boolean} [getFull=true] return basename if true
  # @returns {*}
  ###
  self.getFileName = (path, getFull = true) ->
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
  self.getExtendName = (path, withDot = true) ->
    extendName = nPath.extname(path)
    extendName = extendName.replace('.', '') if !withDot
    extendName

  ###*
  # auto add server root-path if not exist
  # @param {...} path
  # @returns {*|string}
  ###
  self.coverToFullPath = (path) ->
    path = caro.normalizePath.apply(this, arguments)
    path = nPath.join(absolutePath, path) if !caro.isFullPath(path)
    path

  return