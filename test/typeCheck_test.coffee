do ->
describe 'TypeCheck', ->
  it 'isJson', ->
    r = caro.isJson(null);
    r2 = caro.isJson('caro');
    r3 = caro.isJson(123, '{"a":1}')
    r.should.be.true
    r2.should.be.false
    r3.should.be.true