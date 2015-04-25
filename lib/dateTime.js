/**
 * The helper of date-time functions base on node.moment
 * Please reference [http://momentjs.com/docs/]
 * @author Caro.Huang
 */
module.exports = (function () {
    var self = {};
    // https://github.com/moment/moment/
    var moment = require('moment');
    /**
     * change locale for node.moment
     * @param locale
     */
    var coverLocale = function (locale) {
        if (!caro.isStr(locale)) {
            locale = 'en';
        }
        locale = locale.toLowerCase();
        switch (locale) {
            case 'zh_hk':
                locale = 'zh-tw';
                break;
            case 'zh_cn':
                locale = 'zh-cn';
                break;
            default :
                break;
        }
        return locale;
    };
    var coverFormat = function (fmt, locale) {
        switch (fmt) {
            case !fmt:
            case 'date':
                fmt = 'YYYY-MM-DD';
                break;
            case 'monthDay':
                if (locale === 'zh-tw' || locale === 'zh-cn') {
                    fmt = 'MMM Do';
                }
                else {
                    fmt = 'DD MMM';
                }
                break;
            case 'weekDateTime':
                if (locale === 'zh-tw' || locale === 'zh-cn') {
                    fmt = 'LL ddd HH:mm';
                }
                else {
                    fmt = 'ddd, DD MMM, YYYY HH:mm';
                }
                break;
            case 'weekDate':
                if (locale === 'zh-tw' || locale === 'zh-cn') {
                    fmt = 'LL dddd';
                }
                else {
                    fmt = 'ddd, DD MMM, YYYY';
                }
                break;
            case 'dateTime':
                fmt = 'YYYY-MM-DD HH:mm:ss';
                break;
            case 'time':
                fmt = 'HH:mm:ss';
                break;
            case 'time2':
                fmt = 'HH:mm';
                break;
            case 'time3':
                fmt = 'mm:ss';
                break;
            default :
                break;
        }
        return fmt;
    };

    /**
     * format str to date-time
     * OPT
     * locale: str (default: 'en') - localize date (refer to moment)
     * acceptEmpty: bool (default: true) - return '' when (!acceptEmpty && !str)
     *              return NOW-TIME when (acceptEmpty && !str)
     * @param str
     * @param [fmt]
     * @param [opt]
     * @returns {*|Object|ServerResponse}
     */
    self.formatDateTime = function (str, fmt, opt) {
        var locale = 'en';
        var acceptEmpty = false;
        if (opt) {
            locale = opt.locale || locale;
            acceptEmpty = opt.acceptEmpty === true;
        }
        if (!acceptEmpty && !str) {
            return '';
        }
        if (locale) {
            locale = coverLocale(locale);
            moment.locale(locale);
        }

        fmt = coverFormat(fmt, locale);
        var returnVal = '';
        if (str) {
            returnVal = moment(str).format(fmt);
        } else {
            // get NOW-TIME
            returnVal = moment().format(fmt);
        }
        // reset locale to en
        moment.locale('en');
        return returnVal;
    };
    self.formatNow = function (fmt, opt) {
        opt = opt || {};
        opt.acceptEmpty = true;
        return self.formatDateTime(null, fmt, opt);
    };
    /**
     * custom format to like [2014-01-01T12:00:00.000+0800]
     * @param [sDateTime]
     * @returns {*|Object|ServerResponse}
     */
    self.formatFull = function (sDateTime) {
        return self.formatDateTime(sDateTime, 'YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
    };
    /**
     * add date-time unit
     * please reference [http://momentjs.com/docs/#/manipulating/add/]
     * @param sDateTime
     * @param unit
     * @param amount
     * @returns {*}
     */
    self.add = function (sDateTime, unit, amount) {
        if (typeof unit === 'object') {
            sDateTime = moment(sDateTime).add(unit);
        } else {
            sDateTime = moment(sDateTime).add(unit, amount);
        }
        return sDateTime;
    };
    /**
     * subtract date-time unit
     * please reference [http://momentjs.com/docs/#/manipulating/subtract/]
     * @param sDateTime
     * @param unit
     * @param amount
     * @returns {*}
     */
    self.subtract = function (sDateTime, unit, amount) {
        if (typeof unit === 'object') {
            sDateTime = moment(sDateTime).subtract(unit);
        } else {
            sDateTime = moment(sDateTime).subtract(unit, amount);
        }
        return sDateTime;
    };
    /**
     * get start of the unit
     * ex. dateTime.startOf('2013-01-01 23:00:00','day') = 2013-01-01 00:00:00
     * please reference [http://momentjs.com/docs/#/manipulating/start-of/]
     * @param sDateTime
     * @param unit
     */
    self.startOf = function (sDateTime, unit) {
        return moment(sDateTime).startOf(unit);
    };
    /**
     * get end of the unit
     * ex. dateTime.endOf('2013-01-01 23:00:00','day') = 2013-01-01 23:59:59
     * please reference [http://momentjs.com/docs/#/manipulating/end-of/]
     * @param sDateTime
     * @param unit
     */
    self.endOf = function (sDateTime, unit) {
        return moment(sDateTime).endOf(unit);
    };
    /**
     * set date-time to local
     * @param sDateTime
     * @returns {*}
     */
    self.local = function (sDateTime) {
        return moment.local(sDateTime);
    };
    /**
     * set date-time to UTC
     * please reference [http://momentjs.com/docs/#/parsing/utc/]
     * @param sDateTime
     * @returns {*}
     */
    self.utc = function (sDateTime) {
        return moment.utc(sDateTime);
    };
    /**
     * compare date if before target-Date
     * [!target-Date] = now
     * sUntilTo = 'year'/'month'/'date'/'hour'/'minute'/'second'/'millisecond'
     * @param date
     * @param tarDate
     * @param sUntilTo
     * @returns {*}
     */
    self.isBefore = function (date, tarDate, sUntilTo) {
        if (!tarDate) {
            return moment(date).isBefore();
        }
        return moment(date).isBefore(tarDate, sUntilTo);
    };

    /**
     * compare date if after target-Date
     * [!target-Date] = now
     * sUntilTo = 'year'/'month'/'date'/'hour'/'minute'/'second'/'millisecond'
     * @param date
     * @param tarDate
     * @param sUntilTo
     * @returns {*}
     */
    self.isAfter = function (date, tarDate, sUntilTo) {
        if (!tarDate) {
            return moment(date).isAfter();
        }
        return moment(date).isAfter(tarDate, sUntilTo);
    };
    /**
     * validate is date-time format
     * return true when pass, int when error
     * please reference [http://momentjs.com/docs/#/parsing/is-valid/]
     * @param sDateTime
     * @returns {*}
     */
    self.isValid = function (sDateTime) {
        var m = moment(sDateTime);
        if (m.isValid(sDateTime)) {
            return true;
        }
        return m.invalidAt();
    };
    /**
     * get different between 2 date
     * EX
     * a = '2015-01-15 00:00:00'
     * b = '2015-01-16 12:00:00'
     * caro.diff(a, b);
     * => 129600000
     * caro.diff(a, b, 'd');
     * => 1 (day)
     * caro.diff(a, b, 'd', {withFloat: true});
     * => 1.5 (day)
     * @param dateFrom
     * @param dateTo
     * @param [type]
     * @param [opt]
     * @returns {*}
     */
    self.diff = function (dateFrom, dateTo, type, opt) {
        // type = years/quarters/months/weeks/days/hours/minutes/seconds/milliseconds
        // type by shorthand = y/Q/M/w/d/h/m/s/ms
        var withFloat = false;
        if (opt) {
            withFloat = opt.withFloat === true;
        }
        dateFrom = dateFrom || new Date();
        dateTo = dateTo || new Date();
        return moment(dateTo).diff(dateFrom, type, withFloat);
    };
    return self;
})();