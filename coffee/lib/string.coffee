###*
# String
# @author Caro.Huang
###
do ->
  self = caro
  changeCase = (str, type, opt) ->
    r = []
    aType = [
      'toUpperCase'
      'toLowerCase'
    ]
    opt = caro.coverToObj(opt)
    start = caro.coverToInt(opt.start)
    end = if caro.coverToInt(opt.end) > 0 then caro.coverToInt(opt.end) else null
    force = opt.force != false
    if !caro.isStr(str)
      if !force
        return str
      str = ''
    type = if aType.indexOf(type) > -1 then type else aType[0]
    r.push str.slice(0, start)
    if end
      r.push str.slice(start, end)[type]()
      r.push str.slice(end)
    else
      r.push str.slice(start)[type]()
    r.join ''

  ###*
  # check if string is uppercase
  # @param {...string} str
  # @returns {boolean}
  ###
  self.isUpper = (str) ->
    pass = true
    caro.checkIfPassCb(arguments, (str)->
      upp = str.toUpperCase()
      pass = false if upp != str
    )
    pass

  ###*
  # check if string is lowercase
  # @param {string} str
  # @returns {boolean}
  ###
  self.isLower = (str) ->
    pass = true
    caro.checkIfPassCb(arguments, (str)->
      low = str.toLowerCase()
      pass = false if low != str
    )
    pass

  ###*
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
    opt = caro.coverToObj(opt)
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
    caro.each exclude, (i, excludeStr) ->
      chars = caro.replaceAll(chars, excludeStr, '')
      return
    i = 0
    while i < len
      text += chars.charAt(Math.floor(Math.random() * chars.length))
      i++
    text

  ###*
  # check string if ("true" | not-empty) / ("false" | empty) and covert to boolean
  # @param {string} str
  # @returns {boolean}
  ###
  self.strToBool = (str) ->
    str = str.toLowerCase()
    # return false when string='false' or '', otherwise return true
    str != '' and str != 'false'

  ###*
  # check if charts has in head of string
  # @param {string} str
  # @param {string} str2
  # @returns {*}
  ###
  self.hasHead = (str, str2) ->
    return false if !caro.isStr(str, str2)
    str.indexOf(str2) == 0

  ###*
  # add the head to string if not exist
  # @param {string} str
  # @param {string} addStr
  # @returns {*}
  ###
  self.addHead = (str, addStr) ->
    return str if !caro.isStr(str, addStr)
    str = addStr + str if !caro.hasHead(str, addStr)
    str

  ###*
  # check if charts has in tail of string
  # @param {string} str
  # @param {string} str2
  # @returns {*}
  ###
  self.hasTail = (str, str2) ->
    return false if !caro.isStr(str, str2)
    index = str.lastIndexOf(str2)
    strLength = str.length
    strLength2 = str2.length
    strLength > strLength2 and index == strLength - strLength2

  ###*
  # add the tail to string if not exist
  # @param {string} str
  # @param {string} addStr
  # @returns {*}
  ###
  self.addTail = (str, addStr) ->
    return str if !caro.isStr(str, addStr)
    str += addStr if !caro.hasTail(str, addStr)
    str

  ###*
  # replace \r\n | \r | \n to <br/>
  # @param {string} str
  # @returns {string}
  ###
  self.wrapToBr = (str) ->
    return str if !caro.isStr(str)
    str = str.replace(/\r\n/g, '<br />')
    str = str.replace(/\n/g, '<br />')
    str = str.replace(/\r/g, '<br />')
    str

  ###*
  # replace the <br /> to \n
  # @param {string} str
  # @returns {string}
  ###
  self.brToWrap = (str) ->
    regex = /<br\s*[\/]?>/gi
    str.replace regex, '\n'

  ###*
  # split to array by '\r\n' | '\n' | '\r'
  # @param {string} str
  # @returns {*}
  ###
  self.splitByWrap = (str) ->
    return str if !caro.isStr(str)
    aWrap = [
      '\r\n'
      '\r'
      '\n'
    ]
    caro.splitStr str, aWrap

  ###*
  # escape RegExp
  # @param {string} str
  # @returns {*|string}
  ###
  self.escapeRegExp = (str) ->
    if !caro.isStr(str)
      return str
    str.replace /([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'

  ###*
  # replace all find in string
  # @param {string} str
  # @param {string} find
  # @param {string} replace
  # @returns {*|string}
  ###
  self.replaceAll = (str, find, replace) ->
    isRegExp = caro.isRegExp(find)
    return str if !caro.isStr(str, find, replace) and !isRegExp
    regex = find
    if !isRegExp
      find = caro.escapeRegExp(find)
      regex = new RegExp(find, 'g')
    str.replace regex, replace

  ###*
  # e.g. ThisIsWord -> This Is Word
  # @param {string} str
  # @returns {string}
  ###
  self.insertBlankBefUpper = (str) ->
    return str if !caro.isStr(str)
    r = []
    aStr = str.split('')
    caro.each aStr, (i, val) ->
      r.push ' ' if i > 0 and caro.isUpper(val)
      r.push val
    r.join ''

  ###*
  # uppercase string
  # @param {string} str
  # @param {object} [opt]
  # @param {number} [opt.start] the start-index you want to uppercase
  # @param {number} [opt.end] the end-index you want to uppercase
  # @param {boolean} [opt.force] if force cover to string
  # @returns {*}
  ###
  self.upperStr = (str, opt) ->
    changeCase str, 'upperCase', opt

  ###*
  # uppercase first-chat in string
  # @param {string} str
  # @param {boolean} [force] if force cover to string
  # @returns {*}
  ###
  self.upperFirst = (str, force) ->
    opt =
      start: 0
      end: 1
      force: force != false
    caro.upperStr str, opt

  ###*
  # lowercase string
  # @param {string} str
  # @param {object} [opt]
  # @param {number} [opt.start] the start-index you want to lowercase
  # @param {number} [opt.end] the end-index you want to lowercase
  # @param {boolean} [opt.force] if force cover to string
  # @returns {*}
  ###
  self.lowerStr = (str, opt) ->
    changeCase str, 'toLowerCase', opt

  ###*
  # trim string, you can set what you want you trim
  # @param {string} str
  # @param {string} [target=' '] the chars you want to trim
  # @param {boolean} [side] the side of string, true is head, false is tail, otherwise is booth
  # @returns {}
  ###
  self.trimStr = (str, char, side) ->
    char = if caro.isStr(char) then char else ' '
    char = caro.escapeRegExp(char)
    if side == true or side != false
      regExpFirst = new RegExp('^' + char + '+')
      str = str.replace regExpFirst, ''
    if side == false or side != true
      regExpLast = new RegExp(char + '+$')
      str = str.replace regExpLast, ''
    str

  ###*
  # split string
  # @param {string} str
  # @param {string|string[]} splitter it should be string-array or string
  # @returns {*}
  ###
  self.splitStr = (str, splitter) ->
    return str if caro.isArr(str)
    return [] if !splitter
    splitter = caro.coverToArr(splitter)
    # get mainSplit first
    # e.g. splitter=['a','ab','c']; => mainSplit='a'
    mainSplit = splitter[0]
    if(mainSplit.length > 1)
      caro.each splitter, (j, eachSplit) ->
        return if !caro.isStr(eachSplit)
        return if mainSplit < 2
        if mainSplit.length >= eachSplit.length
          mainSplit = eachSplit
        return
    return str if !caro.isStr(mainSplit)
    # replace all splitter to mainSplitter
    # e.g. string='caro.huang, is handsome'; splitter=['.', ',']; => string='caro,huang, is handsome'
    caro.each splitter, (i, eachSplit) ->
      return if !caro.isStr(eachSplit)
      str = caro.replaceAll(str, eachSplit, mainSplit)
      return
    str.split mainSplit

  ###*
  # serialize object-arguments to url
  # @param {string} url
  # @param {object} oArgs the argument you want to cover (e.g. {a:1, b:2})
  # @param {boolean} [coverEmpty=false] if cover when value is empty
  # @returns {*}
  ###
  self.serializeUrl = (url, oArgs, coverEmpty = false) ->
    count = 0
    aArgs = ['?']
    caro.each oArgs, (key, val) ->
      if caro.isEmptyVal(val)
        return if !coverEmpty
        val = ''
      aArgs.push '&' if count > 0
      aArgs.push key
      aArgs.push '='
      aArgs.push val
      count++
      return
    url += aArgs.join('')

  return