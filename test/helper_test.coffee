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

  it 'checkIfPassCb', ->
    arg = (i)->
      ++i
    r = caro.executeIfFn(arg, 12)
    r.should.eq 13

  it 'getFnName', ->
    arg = (i)->
      ++i
    r = caro.getFnName(arg)
    r.should.be.a('string')

  it 'eachArgs', ->
    fn = (a, b) ->
      caro.eachArgs(arguments, (key, val) ->
        key.should.be.a('number')
      );
    fn(1, 2);

  it 'getArgumentsAsArr', ->
    fn = (a, b) ->
      args = caro.getArgumentsAsArr(arguments);
      args.should.be.instanceof(Array)
    fn(1, 2);

  it 'coverToArr', ->
    r = caro.coverToArr('3')
    r2 = caro.coverToArr([1])
    r.should.eql(['3'])
    r2.should.eql([1])

  it 'coverToStr', ->
    r = caro.coverToStr('3')
    r2 = caro.coverToStr(['caro', 4])
    r.should.eq('3')
    r2.should.eq('caro,4')

  it 'coverToInt', ->
    r = caro.coverToInt('3')
    r2 = caro.coverToInt('caro')
    r3 = caro.coverToInt('caro', false)
    r.should.eq(3)
    r2.should.eq(0)
    r3.should.eq('caro')

  it 'coverToNum', ->
    r = caro.coverToNum('3.4')
    r2 = caro.coverToNum('caro')
    r3 = caro.coverToNum('caro', false)
    r.should.eq(3.4)
    r2.should.eq(0)
    r3.should.eq('caro')

  it 'coverToObj', ->
    r = caro.coverToObj('3.4')
    r2 = caro.coverToObj(null)
    r3 = caro.coverToObj('caro', false)
    r.should.eql({})
    r2.should.eql({})
    r3.should.eq('caro')

  it 'coverToJson', ->
    r = caro.coverToJson(3.4)
    r2 = caro.coverToJson(null)
    r3 = caro.coverToJson('caro', false)
    r.should.eq('3.4')
    r2.should.eql('null')
    r3.should.eq('"caro"')