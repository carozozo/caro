do ->
  setLogRoot = ()->
    caro.setLogRoot('log')
  describe.skip 'Log', ->
    it 'setLogTrace', ->
      r = caro.setLogTrace(true);
      r.should.be.true

    it 'setLogRoot', ->
      r = caro.setLogRoot('log');
      r.should.be.true

    it 'getLogRoot', ->
      setLogRoot();
      r = caro.getLogRoot();
      r.should.eq 'log'

    it 'setLogExtendName', ->
      r = caro.setLogExtendName('logger');
      r2 = caro.setLogExtendName('');
      r.should.be.true
      r2.should.be.false

    it 'getLogExtendName', ->
      r = caro.getLogExtendName();
      r.should.be.eq('.log')

    it 'readLog', ->
      setLogRoot()
      r = caro.readLog('1');
      should.not.exist(r);

    it 'writeLog', ->
      setLogRoot()
      r = caro.writeLog('test',
        name: 'Caro'
        like: 'Snoopy'
      );
      r2 = caro.readLog('test');
      r2 = caro.coverToObj(r2)
      r.should.be.true
      r2.should.be.an.Object

    it 'updateLog', ->
      setLogRoot();
      caro.writeLog('test', '')
      r = caro.updateLog('test', 'This is first log');
      r2 = caro.updateLog('test', 'This is second log');
      r3 = caro.readLog('test');
      r.should.be.true
      r2.should.be.true
      r3.should.be.eq('This is first log\r\nThis is second log')

    it 'updateLogWithDayFileName', ->
      setLogRoot();
      r = caro.updateLogWithDayFileName('
        test',
        'This is log with day',
        {
          dateFirst: false
        }
      );
      r.should.be.true

    it 'traceLog', ->
      setLogRoot();
      r = caro.traceLog('This is trace log');
      r2 = caro.traceLog('This is trace log', {
        dateFirst: false
      });
      r.should.be.true
      r2.should.be.true