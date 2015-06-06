####*
## Path
## @author Caro.Huang
####
#do ->
#  self = caro
#
#  ###*
#  # get dir-path
#  # @param {string} path
#  # @return {string}
#  ###
#  self.getDirPath = (path) ->
#    filename = caro.getFileName(path)
#    console.log 'filename=',filename
#    path = caro.replaceLast(path, filename)
#
#  ###*
#  # get file name in path
#  # @param {string} path
#  # @param {boolean} [getFull] if return file-name by full (with extend-name)
#  # @return {string}
#  ###
#  self.getFileName = (path, getFull) ->
#    getFull = getFull != false
#    lastIndex = path.lastIndexOf('\\')
#    lastIndex2 = path.lastIndexOf('/')
#    path = path.slice(lastIndex + 1)
#    path = path.slice(lastIndex2 + 1)
#    return path if getFull
#    extendName = caro.getExtendName(path)
#    path.replace(extendName, '')
#
#  ###*
#  # get extend name of file
#  # @param {string} path
#  # @param {boolean} [withDot] if return extend-name with '.'
#  # @return {string}
#  ###
#  self.getExtendName = (path, withDot) ->
#    withDot = withDot != false
#    fileName = caro.getFileName(path)
#    aFileName = caro.splitStr(fileName, '.')
#    return '' if aFileName.length == 1
#    extendName = aFileName[aFileName.length - 1]
#    extendName = '.' + extendName if withDot
#    extendName
#
#  return