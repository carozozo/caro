#do ->
#describe 'Log', ->
#  it 'setLogRoot', ->
#    r = caro.setLogRoot('log');
#    r.should.be.true
#
#  it 'getLogRoot', ->
#    r = caro.getLogRoot();
#    r.should.eq 'log'
#
#  it 'setLogExtendName', ->
#    r = caro.setLogExtendName('logger');
#    r2 = caro.setLogExtendName('');
#    r.should.be.true
#    r2.should.be.false
#
#  it 'getLogExtendName', ->
#    r = caro.getLogExtendName();
#    r2 = caro.writeLog('test', 'This is log data');
#    r.should.be.a('string')
#    r2.should.be.true
#
#  it 'readLog', ->
#    r = caro.readLog('1');
#    should.not.exist(r);
#
#  it 'writeLog', ->
#    r = caro.writeLog('test',
#      name: 'Caro'
#      like: 'Snoopy'
#    );
#    r2 = caro.readLog('test');
#    r.should.be.true
#    r2.should.be.a('string')
#
#  it 'updateLog', ->
#    r = caro.updateLog('test', 'This is first log');
#    r2 = caro.updateLog('test', 'This is second log');
#    r3 = caro.readLog('test');
#    r.should.be.true
#    r2.should.be.true
#    r3.should.be.a('string')
#
#  it 'updateLogWithDayFileName', ->
#    r = caro.updateLogWithDayFileName('test', 'This is log with day', {
#      dateFirst: false
#    });
#    r.should.be.true
#
#  it 'updateLogWithDayFileName', ->
#    r = caro.traceLog('This is trace log', {
#      dateFirst: false
#    });
#    r.should.be.true
#
#  it 'traceLog', ->
#    r = caro.traceLog('This is trace log');
#    r.should.be.true