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
    start = null
    end = null
    force = true
    if opt
      start = if !caro.isEmptyVal(opt.start) then opt.start else start
      end = opt.end or end
      force = opt.force != false
    if !caro.isStr(str)
      if !force
        return str
      str = ''
    type = if aType.indexOf(type) > -1 then type else aType[0]
    start = caro.coverToInt(start)
    end = caro.coverToInt(end)
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
    if !caro.isStr(str)
      return false
    if !caro.isStr(str2)
      return false
    index = str.indexOf(str2)
    index == 0

  ###*
  # add the head to string if not exist
  # @param {string} str
  # @param {string} addStr
  # @returns {*}
  ###

  self.addHead = (str, addStr) ->
    if !caro.hasHead(str, addStr)
      str = addStr + str
    str

  ###*
  # check if charts has in tail of string
  # @param str
  # @param str2
  # @returns {*}
  ###

  self.hasTail = (str, str2) ->
    if !caro.isStr(str)
      return false
    if !caro.isStr(str2)
      return false
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
    if !caro.hasTail(str, addStr)
      str += addStr
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
  # TODO
  # replace all find in str
  # @param {string} str
  # @param {string} find
  # @param {string} replace
  # @returns {*|string}
  ###

  self.replaceAll = (str, find, replace) ->
    if !caro.isStr(str) or !caro.isStr(find) or !caro.isStr(replace)
      return str
    find = caro.escapeRegExp(find)
    regex = new RegExp(find, 'g')
    str.replace regex, replace

  ###*
  # format str to money type like 1,000.00
  # @param {string|number} str
  # @param {string} [type=int|sInt] format-type, if type is set, the opt will not work
  # @param {object} [opt]
  # @param {number} [opt.float=2]
  # @param [opt.decimal=.]
  # @param [opt.separated=,]
  # @param [opt.prefix]
  # @returns {string}
  ###

  self.formatMoney = (str, type, opt) ->
    r = []
    isObj = caro.isObj
    isStr = caro.isStr
    float = 2
    decimal = '.'
    separated = ','
    prefix = ''
    caro.eachArgs arguments, (i, arg) ->
      if i == 0
        return
      if isObj(arg)
        opt = arg
      if isStr(arg)
        type = arg
      return
    if type == 'sInt'
      float = 0
      prefix = '$'
    else if type == 'int'
      float = 0
    else if isObj(opt)
      float = if (float = Math.abs(opt.float)) > -1 then float else 2
      decimal = if isStr(opt.decimal) then opt.decimal else decimal
      separated = if isStr(opt.separated) then opt.separated else separated
      prefix = if isStr(opt.prefix) then opt.prefix else prefix
    s = if str < 0 then '-' else ''
    iStr = parseInt(Math.abs(str or 0).toFixed(float)).toString()
    sepLength = if iStr.length > 3 then iStr.length % 3 else 0
    retStr = s + (if sepLength then iStr.substr 0, sepLength + separated else '') + iStr.substr(sepLength).replace(/(\d{3})(?=\d)/g,
      '$1' + separated) + (if float then decimal + Math.abs(str - iStr).toFixed(float).slice(2) else '')
    if prefix
      r.push prefix
    r.push retStr
    r.join ' '

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
  # @returns {}
  ###

  self.upperStr = (str, opt) ->
    changeCase str, 'upperCase', opt

  ###*
  # @param {string} str
  # @returns {}
  ###

  self.upperFirst = (str, opt) ->
    opt = caro.coverToObj(opt)
    opt.start = 0
    opt.end = 1
    caro.upperStr str, opt

  ###*
  # @param {string} str
  # @param {object} [opt]
  # @param {number} [opt.start] the start-index you want to lowercase
  # @param {number} [opt.end] the end-index you want to lowercase
  # @param {boolean} [opt.force] if force cover to str
  # @returns {}
  ###

  self.lowerStr = (str, opt) ->
    changeCase str, 'toLowerCase', opt

  ###*
  # @param {string} str
  # @param {boolean} [force=true] if force cover to str
  # @returns {}
  ###

  self.trimStr = (str, force) ->
    force = force != false
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
    if caro.isArr(str)
      return str
    if splitter == undefined
      return []
    splitter = caro.coverToArr(splitter)
    force = force != false
    if !caro.isStr(str)
      if !force
        return str
      return []
    # get mainSplit first
    # e.g. splitter=['a','ab','c']; => mainSplit='c'
    mainSplit = splitter[0]
    caro.eachObj splitter, (j, eachSplit2) ->
      if mainSplit.length >= eachSplit2.length
        mainSplit = eachSplit2
      return
    if !mainSplit
      return str
    # replace all splitter to mainSplitter
    # e.g. str='caro.huang, is handsome'; splitter=['.', ',']; => str='caro,huang, is handsome'
    caro.eachObj splitter, (i, eachSplit) ->
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

  self.serializeUrl = (url, oArgs, coverEmpty) ->
    count = 0
    aArgs = ['?']
    url = caro.coverToStr(url)
    oArgs = caro.coverToObj(oArgs)
    coverEmpty = coverEmpty == true
    caro.eachObj oArgs, (key, val) ->
      if caro.isEmptyVal(val)
        if !coverEmpty
          return
        val = ''
      if count > 0
        aArgs.push '&'
      aArgs.push key
      aArgs.push '='
      aArgs.push val
      count++
      return
    url += aArgs.join('')
    url

  return