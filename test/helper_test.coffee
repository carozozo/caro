do ->
describe 'Helper', ->
  it 'checkIfPassCb', ->
    r = caro.checkIfPassCb [1, 2, 3], (val) ->
      return val == 1;
    r2 = caro.checkIfPassCb [1, 2, 3], (val) ->
      return val > 2;
    , false
    r.should.be.false
    r2.should.be.true

  it 'executeIfFn', ->
    arg = (i) ->
      ++i
    r = caro.executeIfFn(arg, 12)
    r2 = caro.executeIfFn(null)
    r.should.eq 13
    should.equal r2, undefined

  it 'getFnName', ->
    arg = (i)->
      ++i
    r = caro.getFnName(arg)
    r.should.be.a('string')

  it 'formatMoney', ->
    arg = null;
    arg2 = '12003000.923';
    arg3 = 12003000.923;
    r = caro.formatMoney(arg);
    r2 = caro.formatMoney(arg2, 'int');
    r3 = caro.formatMoney(arg3, 'sInt');
    r4 = caro.formatMoney(arg3, {
      float: 0, separated: ',',
      decimal: '.', prefix: '',
      forceFloat: false
    });
    r5 = caro.formatMoney(arg3, {
      float: 5, forceFloat: true
    });
    r.should.eq '0'
    r2.should.eq '12,003,000'
    r3.should.eq '$12,003,000'
    r4.should.eq '12,003,000'
    r5.should.eq '12,003,000.92300'