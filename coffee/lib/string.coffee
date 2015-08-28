###
# String
# @author Caro.Huang
###
do ->
  self = caro
  changeCase = (str, type, start = 0, end = null) ->
    r = []
    r.push str.slice(0, start)
    if end
      r.push str.slice(start, end)[type]()
      r.push str.slice(end)
    else
      r.push str.slice(start)[type]()
    r.join ''

  ###
  # create random string
  # @param {number} len the length of random
  # @param {object} [opt]
  # @param {boolean} [opt.lower=true] if include lowercase
  # @param {boolean} [opt.upper=true] if include uppercase
  # @param {boolean} [opt.num=true]
  # @param {string} [opt.exclude=[]] the charts that excluded
  # @returns {string}
  ###
  self.random = (len, opt) ->
    text = ''
    chars = []
    len = if parseInt(len) then parseInt(len) else 1
    opt = opt or {}
    lower = opt.lower != false
    upper = opt.upper != false
    num = opt.num != false
    # cover to array if string
    exclude = opt.exclude || []
    exclude = caro.splitStr(exclude, ',')
    if lower
      chars.push 'abcdefghijklmnopqrstuvwxyz'
    if upper
      chars.push 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if num
      chars.push '0123456789'
    chars = chars.join('')
    caro.forEach exclude, (excludeStr) ->
      chars = caro.replaceAll(chars, excludeStr, '')
      return
    i = 0
    while i < len
      text += chars.charAt(Math.floor(Math.random() * chars.length))
      i++
    text

  ###
  # check string if ("true" | not-empty) / ("false" | empty) and covert to boolean
  # @param {string} str
  # @returns {boolean}
  ###
  self.strToBool = (str) ->
    str = str.toLowerCase()
    # return false when string='false' or '', otherwise return true
    str != '' and str != 'false'

  ###
  # add the head to string if not exist
  # @param {string} str
  # @param {string} addStr
  # @returns {*}
  ###
  self.addHead = (str, addStr) ->
    str = addStr + str if !caro.startsWith(str, addStr)
    str

  ###
  # add the tail to string if not exist
  # @param {string} str
  # @param {string} addStr
  # @returns {*}
  ###
  self.addTail = (str, addStr) ->
    return str if !caro.isString(str)
    str += addStr if !caro.endsWith(str, addStr)
    str

  ###
  # replace \r\n | \r | \n to <br/>
  # @param {string} str
  # @returns {string}
  ###
  self.wrapToBr = (str) ->
    return str if !caro.isString(str)
    str = str.replace(/\r\n/g, '<br />')
    str = str.replace(/\n/g, '<br />')
    str = str.replace(/\r/g, '<br />')
    str

  ###
  # replace the <br /> to \n
  # @param {string} str
  # @returns {string}
  ###
  self.brToWrap = (str) ->
    regex = /<br\s*[\/]?>/gi
    str.replace regex, '\n'

  ###
  # split to array by '\r\n' | '\n' | '\r'
  # @param {string} str
  # @returns {*}
  ###
  self.splitByWrap = (str) ->
    aWrap = [
      '\r\n'
      '\r'
      '\n'
    ]
    caro.splitStr str, aWrap

  ###
  # replace all find in string
  # @param {string} str
  # @param {string} find
  # @param {string} replace
  # @returns {*|string}
  ###
  self.replaceAll = (str, find, replace) ->
    find = caro.escapeRegExp(find)
    regex = new RegExp(find, 'g')
    str.replace regex, replace

  ###
  # replace last find in string
  # @param {string} str
  # @param {string} find
  # @param {string} replace
  # @returns {*|string}
  ###
  self.replaceLast = (str, find, replace) ->
    lastIndex = str.lastIndexOf(find)
    str1 = str.slice(0, lastIndex)
    str2 = str.slice(lastIndex)
    str1 + str2.replace(find, replace)

  ###
  # uppercase string
  # @param {string} str
  # @param {number} [start] the start-index you want to uppercase
  # @param {number} [end] the end-index you want to uppercase
  # @returns {*}
  ###
  self.upperStr = (str, start, end) ->
    changeCase str, 'toUpperCase', start, end

  ###
  # lowercase string
  # @param {string} str
  # @param {object} [opt]
  # @param {number} [opt.start] the start-index you want to lowercase
  # @param {number} [opt.end] the end-index you want to lowercase
  # @param {boolean} [opt.force] if force cover to string
  # @returns {*}
  ###
  self.lowerStr = (str, start, end) ->
    changeCase str, 'toLowerCase', start, end

  ###
  # split string
  # @param {string} str
  # @param {string|string[]} splitter it should be string-array or string
  # @returns {*}
  ###
  self.splitStr = (str, splitter) ->
    return str if caro.isArray(str)
    return [] if !splitter
    splitter = [splitter] if !caro.isArray(splitter)
    # e.g. splitter=['aa', 'ab', 'c', 'd']; => mainSplit='c'
    mainSplit = splitter[0]
    caro.forEach splitter, (eachSplit) ->
      return if !caro.isString(eachSplit)
      return false if mainSplit.length < 2
      mainSplit = eachSplit if mainSplit.length > eachSplit.length
      return
    return [] if !caro.isString(mainSplit)

    ### replace all splitter to mainSplitter
    # e.g. string='caro.huang, is handsome'; splitter=['.', ','];
    # => string='caro,huang, is handsome'
    ###
    caro.forEach splitter, (eachSplit) ->
      return if !caro.isString(eachSplit)
      str = caro.replaceAll(str, eachSplit, mainSplit)
      return
    str.split mainSplit

  return