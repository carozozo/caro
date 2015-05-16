do ->
describe 'DateTime', ->
  it 'formatDateTime', ->
    caro.setDefaultLocale('zh-tw')
    caro.addDateTimeShortFormat('date', 'LLLL')
    caro.addDateTimeShortFormat('date2', 'L')
    r = caro.formatDateTime('2015-06-30', 'date')
    r2 = caro.formatDateTime('2015-06-30', 'date2')
    r.should.eq '2015年6月30日星期二早上12點00分'
    r2.should.eq '2015年6月30日'

  it 'formatNow', ->
    r = caro.formatNow('date')
    r.should.be.string

  it 'addDateTime', ->
    t = '2015-06-30 12:34:56'
    r = caro.addDateTime(t, 3, 'h')
    r2 = caro.addDateTime(t, 3, 'd', 'YYYY/MM/DD')
    r.should.eq '2015-06-30T15:34:56+08:00'
    r2.should.eq '2015/07/03'

  it 'subtractDateTime', ->
    t = '2015-01-01 12:34:56'
    r = caro.subtractDateTime(t, 3, 'h', 'YYYY-MM-DD h:mm')
    r2 = caro.subtractDateTime(t, 3, 'd', 'YYYY/MM/DD')
    r.should.eq '2015-01-01 9:34'
    r2.should.eq '2014/12/29'

  it 'startOfDateTime', ->
    caro.setDefaultLocale('en')
    t = '2015-08-21 12:34:56'
    r = caro.startOfDateTime(t, 'Y')
    r2 = caro.startOfDateTime(t, 'd', 'dddd hh:mm:ss')
    r.should.eq '2015-01-01T00:00:00+08:00'
    r2.should.eq 'Friday 12:00:00'

  it 'startOfDateTime', ->
    caro.setDefaultLocale('en')
    t = '2015-08-21 12:34:56'
    r = caro.endOfDateTime(t, 'Y')
    r2 = caro.endOfDateTime(t, 'd', 'dddd hh:mm:ss')
    r.should.eq '2015-12-31T23:59:59+08:00'
    r2.should.eq 'Friday 11:59:59'

  it 'getUtc', ->
    t = '2015-02-21'
    r = caro.getUtc(t)
    r.should.eq '2015-02-20T16:00:00+00:00'

  it 'isBeforeDateTime', ->
    t = '2015-01-01'
    t2 = '2020-01-01'
    t3 = '2010-01-01'
    r = caro.isBeforeDateTime(t, t2)
    r2 = caro.isBeforeDateTime(t, t3)
    r.should.be.true
    r2.should.be.false

  it 'isAfterDateTime', ->
    t = '2015-01-01 12:00:00'
    t2 = '2015-01-01 13:00:00'
    t3 = '2010-01-01'
    r = caro.isAfterDateTime(t, t2)
    r2 = caro.isAfterDateTime(t, t3)
    r.should.be.false
    r2.should.be.true

  it 'isSameDateTime', ->
    t = '2015-01-01'
    t2 = '2015-01-21'
    t3 = '2013-01-21'
    r = caro.isSameDateTime(t, t2, 'year')
    r2 = caro.isSameDateTime(t2, t3, 'month')
    r.should.be.true
    r2.should.be.false

  it 'isBetweenDateTime', ->
    t = '2015-01-01'
    t2 = '2013-01-21'
    t3 = '2015-01-21'
    r = caro.isBetweenDateTime(t, t2, t3)
    r2 = caro.isBetweenDateTime(t, t3, t2)
    r.should.be.true
    r2.should.be.false

  it 'isValidDateTime', ->
    t = '2015-01-01'
    t2 = '2013-01-32'
    r = caro.isValidDateTime(t)
    r2 = caro.isValidDateTime(t2)
    r.should.be.true
    r2.should.be.false

  it 'getDateTimeDiff', ->
    t = '2015-01-01'
    t2 = '2013-01-31'
    r = caro.getDateTimeDiff(t, t2)
    r2 = caro.getDateTimeDiff(t, t2, 'month')
    r.should.eq 60480000000
    r2.should.eq 23