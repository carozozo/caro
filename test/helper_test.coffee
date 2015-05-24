do ->
describe 'Helper', ->
  it 'isBasicVal', ->
    r = caro.isBasicVal('');
    r2 = caro.isBasicVal({});
    r.should.be.true
    r2.should.be.false

  it 'isEmptyVal', ->
    r = caro.isEmptyVal({}, [], null, '', undefined);
    r2 = caro.isEmptyVal('null');
    r.should.be.true
    r2.should.be.false

  it 'isTrue', ->
    r = caro.isTrue(true, 'true', 1);
    r2 = caro.isTrue(false);
    r.should.be.true
    r2.should.be.false

  it 'isFalse', ->
    r = caro.isFalse(false, 'false', 0);
    r2 = caro.isFalse(false, true);
    r.should.be.true
    r2.should.be.false

  it 'checkIfPassCb', ->
    r = caro.checkIfPassCb [1, 2, 3], (val) ->
      return val == 1;
    r2 = caro.checkIfPassCb [1, 2, 3], (val) ->
      return val == 1;
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