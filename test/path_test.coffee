do ->
describe 'Path', ->
  it 'setAbsolutePath', ->
    r = caro.setAbsolutePath('/path/from/root');
    r2 = caro.setAbsolutePath('/path2//from\root');
    r.should.eq '/path/from/root'
    r2.should.eq '/path2/from\root'

  it 'getAbsolutePath', ->
    r = caro.setAbsolutePath('/path/from/root');
    r = caro.getAbsolutePath();
    r.should.eq '/path/from/root'

  it 'isFullPath', ->
    caro.setAbsolutePath('/path\from/root');
    r = caro.isFullPath('/path/from/root/caro.js');
    r2 = caro.isFullPath('/path2/from/root/caro.js');
    r.should.be.true
    r2.should.be.false

#  it 'addHead', ->
#    r = caro.addHead('false', 'fa');
#    r2 = caro.addHead('False', 'is');
#    r.should.eq 'false'
#    r2.should.eq 'isFalse'
#
#  it 'hasTail', ->
#    r = caro.hasTail('false', 'fa');
#    r2 = caro.hasTail('false', 'se');
#    r.should.be.false
#    r2.should.be.true
#
#  it 'addTail', ->
#    r = caro.addTail('moon', 'on');
#    r2 = caro.addTail('moon', 'Day');
#    r.should.eq 'moon'
#    r2.should.eq 'moonDay'
#
#  it 'wrapToBr', ->
#    r = caro.wrapToBr('''this is
#      wrap content.
#    ''');
#    r.should.eq 'this is<br />wrap content.'
#
#  it 'brToWrap', ->
#    r = caro.brToWrap('this is<br />wrap content.');
#    r.should.eq 'this is\nwrap content.'
#
#  it 'splitByWrap', ->
#    r = caro.splitByWrap('''
#      I love
#      my mother
#      and
#      my father
#    ''');
#    r.should.eql ['I love', 'my mother', 'and', 'my father']
#
#  it 'escapeRegExp', ->
#    r = caro.escapeRegExp('I*am*{Caro}.');
#    r.should.eql 'I\\*am\\*\\{Caro\\}\\.'
#
#  it 'replaceAll', ->
#    r = caro.replaceAll('I*am*{Caro}.', '*', '-');
#    r2 = caro.replaceAll('I*am*{Caro}.', /\w/g, '-');
#    r.should.eql 'I-am-{Caro}.'
#    r2.should.eql '-*--*{----}.'
#
#  it 'insertBlankBefUpper', ->
#    r = caro.insertBlankBefUpper('IAmCaro');
#    r.should.eql 'I Am Caro'
#
#  it 'upperStr', ->
#    r = caro.upperStr('I am Caro');
#    r2 = caro.upperStr('i am caro', {
#      start: 0,
#      end: null,
#      force: true
#    });
#    r3 = caro.upperStr('i am caro', {
#      start: 5,
#      end: null
#    });
#    r4 = caro.upperStr('i am caro', {
#      start: 5,
#      end: 6
#    });
#    r.should.eq 'I AM CARO'
#    r2.should.eq 'I AM CARO'
#    r3.should.eq 'i am CARO'
#    r4.should.eq 'i am Caro'
#
#  it 'upperFirst', ->
#    r = caro.upperFirst('i am caro');
#    r2 = caro.upperFirst({}, false);
#    r.should.eq 'I am caro'
#    r2.should.eql {}
#
#  it 'lowerStr', ->
#    r = caro.lowerStr('I AM CARO');
#    r2 = caro.lowerStr('I AM CARO', {
#      start: 0,
#      end: null,
#      force: true
#    });
#    r3 = caro.lowerStr('I AM CARO', {
#      start: 5,
#      end: null
#    });
#    r4 = caro.lowerStr('I AM CARO', {
#      start: 5,
#      end: 6
#    });
#    r.should.eq 'i am caro'
#    r2.should.eq 'i am caro'
#    r3.should.eq 'I AM caro'
#    r4.should.eq 'I AM cARO'
#
#  it 'trimStr', ->
#    r = caro.trimStr(' i am caro ');
#    r2 = caro.trimStr({}, false);
#    r.should.eq 'i am caro'
#    r2.should.eql {}
#
#  it 'splitStr', ->
#    r = caro.splitStr('i am caro', ' ');
#    r2 = caro.splitStr('I ~love Snoopy !~!', ['~', ' ']);
#    r3 = caro.splitStr(null, ',', false);
#    r.should.eql ['i', 'am', 'caro']
#    r2.should.eql ['I', '', 'love', 'Snoopy', '!', '!']
#    should.equal(r3, null);
#
#  it 'serializeUrl', ->
#    arg = 'http://localhost';
#    obj = {a: 1, b: 2, c: null}
#    r = caro.serializeUrl(arg, obj);
#    r2 = caro.serializeUrl(arg, obj, true);
#    r.should.eq 'http://localhost?a=1&b=2'
#    r2.should.eq 'http://localhost?a=1&b=2&c='