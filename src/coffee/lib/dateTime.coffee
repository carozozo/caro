###*
# DateTime
# @author Caro.Huang
###

do ->
  'use strict'
  if !caro.nMoment?
    return
  self = caro
  defLocale = 'en'
  # save the custom format-type, e.g { en:{date:'MM/DD/YYYY'}, zh-tw :{date:'YYYY-MM-DD'} }
  oShorthandFormat = {}

  getDateTimeObj = (dateTime) ->
    if dateTime
      return nMoment(dateTime)
    # get now-time
    nMoment()

  coverLocale = (locale) ->
    locale = caro.coverToStr(locale, false)
    locale or defLocale

  coverFormatType = (shorthandFormat, locale) ->
    locale = coverLocale(locale)
    oLocale = oShorthandFormat[locale] or oShorthandFormat[defLocale] or {}
    # if no shorthandFormat, return the format that user set
    oLocale[shorthandFormat] or shorthandFormat

  returnMomentObjIfNoFormatType = (oDateTime, formatType) ->
    if formatType == undefined
      return oDateTime
    caro.formatDateTime oDateTime, formatType

  ###*
  # if set default locale first, then use formatDateTime(), will return format type by it
  # @param {string} locale
  ###

  self.setDefaultLocale = (locale) ->
    locale = coverLocale(locale)
    defLocale = locale
    return

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
    if locale
      nMoment.locale locale
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
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {number|string} amount
  # @param {string} unit time-unit
  # @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
  # @returns {*}
  ###

  self.addDateTime = (dateTime, amount, unit, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    if caro.isObj(amount)
      oDateTime.add amount
    else
      oDateTime.add amount, unit
    returnMomentObjIfNoFormatType oDateTime, formatType

  ###*
  # subtract date-time unit
  # please refer {@link http://momentjs.com/docs/#/manipulating/subtract/}
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {number|string} amount
  # @param {string} unit time-unit
  # @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
  # @returns {*}
  ###

  self.subtractDateTime = (dateTime, amount, unit, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    if caro.isObj(amount)
      oDateTime.subtract amount
    else
      oDateTime.subtract amount, unit
    returnMomentObjIfNoFormatType oDateTime, formatType

  ###*
  # get start of the unit
  # e.g. startOf('2013-01-01 23:00:00','day') = 2013-01-01 00:00:00
  # please refer {@link http://momentjs.com/docs/#/manipulating/start-of/}
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {string} unit time-unit
  # @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
  # @returns {moment.Moment|*}
  ###

  self.startOfDateTime = (dateTime, unit, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.startOf unit
    returnMomentObjIfNoFormatType oDateTime, formatType

  ###*
  # get end of the unit
  # please refer {@link http://momentjs.com/docs/#/manipulating/end-of/}
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {string} unit time-unit
  # @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
  # @returns {moment.Moment|*}
  ###

  self.endOfDateTime = (dateTime, unit, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.endOf unit
    returnMomentObjIfNoFormatType oDateTime, formatType

  ###*
  # get date-time with UTC
  # please refer {@link http://momentjs.com/docs/#/parsing/utc/}
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
  # @returns {*}
  ###

  self.getUtc = (dateTime, formatType) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.utc()
    returnMomentObjIfNoFormatType oDateTime, formatType

  ###*
  # compare date-time if before target
  # please refer {@link http://momentjs.com/docs/#/query/is-before/}
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {?string|object} targetDateTime the str with date-time format, or moment-obj
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
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {?string|object} targetDateTime the str with date-time format, or moment-obj
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
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {?string|object} targetDateTime the str with date-time format, or moment-obj
  # @param {string} [unit] time-unit
  # @returns {*}
  ###

  self.isSameDateTime = (dateTime, targetDateTime, unit) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime2 = getDateTimeObj(targetDateTime)
    oDateTime.isSame oDateTime2, unit

  ###*
  # check if a moment is between two other moments
  # please refer {@link http://momentjs.com/docs/#/query/is-between/}
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @param {?string|object} dateTime1 the str with date-time format, or moment-obj
  # @param {?string|object} dateTime2 the str with date-time format, or moment-obj
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
  # @param {?string|object} dateTime the str with date-time format, or moment-obj
  # @returns {*}
  ###

  self.isValidDateTime = (dateTime) ->
    oDateTime = getDateTimeObj(dateTime)
    oDateTime.isValid()

  ###*
  # get different between 2 date-time
  # please refer {@link http://momentjs.com/docs/#/displaying/difference/}
  # @param {?string|object} dateTime1 the str with date-time format, or moment-obj
  # @param {?string|object} dateTime2 the str with date-time format, or moment-obj
  # @param {string} [unit] time-unit
  # @param {boolean} [withFloat=false]
  # @returns {number|*}
  ###

  self.getDateTimeDiff = (dateTime1, dateTime2, unit, withFloat) ->
    withFloat = withFloat == true
    oDateTime1 = getDateTimeObj(dateTime1)
    oDateTime2 = getDateTimeObj(dateTime2)
    oDateTime1.diff oDateTime2, unit, withFloat

  return