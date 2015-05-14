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
  self.isUpper = (str) ->
    str = caro.coverToStr(str, true)
    upp = str.toUpperCase()
    upp == str

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
    lower = true
    upper = true
    num = true
    exclude = []
    len = if parseInt(len) then parseInt(len) else 1
    if opt
      lower = opt.lower != false
      upper = opt.upper != false
      num = opt.num != false
      exclude = opt.exclude or exclude
    if lower
      chars.push 'abcdefghijklmnopqrstuvwxyz'
    if upper
      chars.push 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if num
      chars.push '0123456789'
    chars = chars.join('')
    # cover to array if string
    exclude = caro.splitStr(exclude, ',')
    caro.eachObj exclude, (i, excludeStr) ->
      chars = caro.replaceAll(String(chars), excludeStr, '')
      return
    i = 0
    while i < len
      text += chars.charAt(Math.floor(Math.random() * chars.length))
      i++
    text

  ###*
  # check str if ("true" | not-empty) / ("false" | empty) and covert to boolean
  # @param {string} str
  # @returns {boolean}
  ###

  self.strToBool = (str) ->
    return false if !caro.isStr(str) or !str
    str = str.toLowerCase()
    # return false when str='false', otherwise return true
    str != 'false'

  ###*
  # check if charts has in head of string
  # @param str
  # @param str2
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
    str = addStr + str if !caro.hasHead(str, addStr)
    str

  ###*
  # check if charts has in tail of string
  # @param str
  # @param str2
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
    str += addStr if !caro.hasTail(str, addStr)
    str

  ###*
  # replace \r\n | \r | \n to <br/>
  # @param {string} str
  # @returns {*|string}
  ###

  self.wrapToBr = (str) ->
    if !caro.isStr(str)
      return str
    str = str.replace(/\r\n/g, '<br />')
    str = str.replace(/\n/g, '<br />')
    str = str.replace(/\r/g, '<br />')
    str

  ###*
  # replace the <br/> to \n
  # @param {string} str
  # @returns {*|string}
  ###

  self.brToWrap = (str) ->
    if !caro.isStr(str)
      return str
    regex = /<br\s*[\/]?>/gi
    str.replace regex, '\n'

  ###*
  # split to array by '\r\n' | '\n' | '\r'
  # @param {string} str
  # @returns {*}
  ###

  self.splitByWrap = (str) ->
    if !caro.isStr(str)
      return str
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
  # replace all find in str
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
    if !caro.isStr(str)
      return str
    indexCount = 0
    aStr = str.split('')
    aStrClone = caro.cloneObj(aStr)
    caro.eachObj aStrClone, (i, char) ->
      isUpper = caro.isUpper(char)
      if indexCount > 0 and isUpper
# add ' ' before upper-char
        aStr.splice indexCount, 0, ' '
        # aStr length + 1 after add ' ', so indexCount++;
        indexCount++
      indexCount++
      return
    aStr.join ''

  ###*
  # @param {string} str
  # @param {object} [opt]
  # @param {number} [opt.start] the start-index you want to uppercase
  # @param {number} [opt.end] the end-index you want to uppercase
  # @param {boolean} [opt.force] if force cover to str
  # @returns {*}
  ###

  self.upperStr = (str, opt) ->
    changeCase str, 'upperCase', opt

  ###*
  # @param {string} str
  # @param {boolean} [force] if force cover to str
  # @returns {*}
  ###

  self.upperFirst = (str, force) ->
    opt =
      start: 0
      end: 1
      force: force != false
    caro.upperStr str, opt

  ###*
  # @param {string} str
  # @param {object} [opt]
  # @param {number} [opt.start] the start-index you want to lowercase
  # @param {number} [opt.end] the end-index you want to lowercase
  # @param {boolean} [opt.force] if force cover to str
  # @returns {*}
  ###

  self.lowerStr = (str, opt) ->
    changeCase str, 'toLowerCase', opt

  ###*
  # @param {string} str
  # @param {boolean} [force=true] if force cover to str
  # @returns {}
  ###

  self.trimStr = (str, force = true) ->
    if !caro.isStr(str)
      if !force
        return str
      str = ''
    str.trim()

  ###*
  # @param {string} str
  # @param {string|string[]} splitter
  # @param {boolean} [force=true] if force cover to str
  # @returns {*}
  ###

  self.splitStr = (str, splitter, force) ->
    return str if caro.isArr(str)
    return [] if !splitter
    splitter = caro.coverToArr(splitter)
    force = force != false
    if !caro.isStr(str)
      if !force
        return str
      return []
    # get mainSplit first
    # e.g. splitter=['a','ab','c']; => mainSplit='a'
    mainSplit = splitter[0]
    if(mainSplit.length > 1)
      caro.eachObj splitter, (j, eachSplit) ->
        return if !caro.isStr(eachSplit)
        return if mainSplit < 2
        if mainSplit.length >= eachSplit.length
          mainSplit = eachSplit
        return
    return str if !caro.isStr(mainSplit)
    # replace all splitter to mainSplitter
    # e.g. str='caro.huang, is handsome'; splitter=['.', ',']; => str='caro,huang, is handsome'
    caro.eachObj splitter, (i, eachSplit) ->
      return if !caro.isStr(eachSplit)
      str = caro.replaceAll(str, eachSplit, mainSplit)
      return
    str.split mainSplit

  ###*
  # serialize obj-arguments to url
  # @param {string} url
  # @param {object} oArgs the argument you want to cover (e.g. {a:1,b:2})
  # @param {boolean} [coverEmpty=false] if cover when value is empty
  # @returns {*}
  ###

  self.serializeUrl = (url, oArgs, coverEmpty = false) ->
    count = 0
    aArgs = ['?']
    url = caro.coverToStr(url)
    oArgs = caro.coverToObj(oArgs)
    caro.eachObj oArgs, (key, val) ->
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