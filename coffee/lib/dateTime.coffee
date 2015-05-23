###*
# DateTime
# @author Caro.Huang
###
do ->
# https://www.npmjs.com/package/moment
  nMoment = if caro.isNode then require 'moment' else if moment? then moment else null
  return if !nMoment?
  self = caro

  defLocale = 'en'
  # save the custom format-type, e.g { en:{date:'MM/DD/YYYY'}, zh-tw :{date:'YYYY-MM-DD'} }
  oShorthandFormat = {}

  getDateTimeObj = (dateTime) ->
    return nMoment(dateTime) if dateTime
    # get now-time
    nMoment()

  coverLocale = (locale) ->
    if caro.isString(locale) then locale else defLocale

  coverFormatType = (shorthandFormat, locale) ->
    locale = coverLocale(locale)
    oLocale = oShorthandFormat[locale] or oShorthandFormat[defLocale] or {}
    # if no shorthandFormat, return the format that user set
    oLocale[shorthandFormat] or shorthandFormat

  returnDateTimeStr = (oDateTime, formatType) ->
    caro.formatDateTime(oDateTime, formatType)

  ###*
  # set default locale
  # @param {string} locale
  ###
  self.setDefaultLocale = (locale) ->
    locale = coverLocale(locale)
    defLocale = locale
    return

  ###*
  # set default locale
  # @return {string}
  ###
  self.getDefaultLocale = () ->
    defLocale

  ###*
  # @param {string} shorthandFormat the shorthand format type
  # @param {string} formatType the format type
  # @param {string} [locale] you can set different format type by locale
  ###
  self.addDateTimeShortFormat = (shorthandFormat, formatType, locale) ->
    locale = coverLocale(locale)
    oShorthandFormat[locale] = oShorthandFormat[locale] or {}
    oShorthandFormat[locale][shorthandFormat] = formatType
    return

  ###*
  # @param {?string|object} dateTime
  # @param {string} [formatType] format-type
  # @param {string} [locale] localize date
  # @returns {string}
  ###
  self.formatDateTime = (dateTime, formatType, locale) ->
    locale = coverLocale(locale)
    nMoment.locale(locale) if locale
    formatType = coverFormatType(formatType, locale)
    oDateTime = getDateTimeObj(dateTime)
    returnVal = oDateTime.format(formatType)
    # reset locale to default
    nMoment.locale defLocale
    returnVal

  ###*
  # get now-time
  # @param {string} [fmt] format-type
  # @param {string} [locale] localize date
  # @returns {string}
  ###
  self.formatNow = (fmt, locale) ->
    caro.formatDateTime null, fmt, locale

  ###*
  # add date-time unit
  # please refer {@link http://momentjs.com/docs/#/manipulating/add/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {number|string} amount
  # @param {string} unit time-unit
  # @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
  # @returns {*}
  ###
  self.addDateTime = (dateTime, amount, unit, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    if caro.isObject(amount)
      oDateTime.add amount
    else
      oDateTime.add amount, unit
    returnDateTimeStr oDateTime, formatType

  ###*
  # subtract date-time unit
  # please refer {@link http://momentjs.com/docs/#/manipulating/subtract/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {number|string} amount
  # @param {string} unit time-unit
  # @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
  # @returns {*}
  ###
  self.subtractDateTime = (dateTime, amount, unit, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    if caro.isObject(amount)
      oDateTime.subtract amount
    else
      oDateTime.subtract amount, unit
    returnDateTimeStr oDateTime, formatType

  ###*
  # get start of the unit
  # e.g. startOf('2013-01-01 23:00:00','day') = 2013-01-01 00:00:00
  # please refer {@link http://momentjs.com/docs/#/manipulating/start-of/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {string} unit time-unit
  # @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
  # @returns {moment.Moment|*}
  ###
  self.startOfDateTime = (dateTime, unit, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.startOf unit
    returnDateTimeStr oDateTime, formatType

  ###*
  # get end of the unit
  # please refer {@link http://momentjs.com/docs/#/manipulating/end-of/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {string} unit time-unit
  # @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
  # @returns {moment.Moment|*}
  ###
  self.endOfDateTime = (dateTime, unit, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.endOf unit
    returnDateTimeStr oDateTime, formatType

  ###*
  # get date-time with UTC
  # please refer {@link http://momentjs.com/docs/#/parsing/utc/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {?string} [formatType] will return formatted-string if set, otherwise return moment-object
  # @returns {*}
  ###
  self.getUtc = (dateTime, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.utc()
    returnDateTimeStr oDateTime, formatType

  ###*
  # compare date-time if before target
  # please refer {@link http://momentjs.com/docs/#/query/is-before/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {?string|object} targetDateTime the string with date-time format, or moment-object
  # @param {string} [unit] time-unit
  # @returns {*}
  ###
  self.isBeforeDateTime = (dateTime, targetDateTime, unit) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime2 = getDateTimeObj(targetDateTime)
    oDateTime.isBefore oDateTime2, unit

  ###*
  # check date-time if after target
  # please refer {@link http://momentjs.com/docs/#/query/is-after/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {?string|object} targetDateTime the string with date-time format, or moment-object
  # @param {string} [unit] time-unit
  # @returns {*}
  ###
  self.isAfterDateTime = (dateTime, targetDateTime, unit) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime2 = getDateTimeObj(targetDateTime)
    oDateTime.isAfter oDateTime2, unit

  ###*
  # check date-time if same as target
  # please refer {@link http://momentjs.com/docs/#/query/is-same/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {?string|object} targetDateTime the string with date-time format, or moment-object
  # @param {string} [unit] time-unit
  # @returns {*}
  ###
  self.isSameDateTime = (dateTime, targetDateTime, unit) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.isSame(targetDateTime, unit)

  ###*
  # check if a moment is between two other moments
  # please refer {@link http://momentjs.com/docs/#/query/is-between/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @param {?string|object} dateTime1 the string with date-time format, or moment-object
  # @param {?string|object} dateTime2 the string with date-time format, or moment-object
  # @param {string} [unit] time-unit
  # @returns {*}
  ###
  self.isBetweenDateTime = (dateTime, dateTime1, dateTime2, unit) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime1 = getDateTimeObj(dateTime1)
    oDateTime2 = getDateTimeObj(dateTime2)
    oDateTime.isBetween oDateTime1, oDateTime2, unit

  ###*
  # validate is date-time format
  # please refer {@link http://momentjs.com/docs/#/utilities/invalid/}
  # @param {?string|object} dateTime the string with date-time format, or moment-object
  # @returns {*}
  ###
  self.isValidDateTime = (dateTime) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.isValid()

  ###*
  # get different between 2 date-time
  # please refer {@link http://momentjs.com/docs/#/displaying/difference/}
  # @param {?string|object} dateTime1 the string with date-time format, or moment-object
  # @param {?string|object} dateTime2 the string with date-time format, or moment-object
  # @param {string} [unit] time-unit
  # @param {boolean} [withFloat=false]
  # @returns {number|*}
  ###
  self.getDateTimeDiff = (dateTime1, dateTime2, unit, withFloat = false) ->
    oDateTime1 = getDateTimeObj(dateTime1)
    oDateTime2 = getDateTimeObj(dateTime2)
    oDateTime1.diff oDateTime2, unit, withFloat

  return