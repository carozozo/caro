do ->
describe 'Array', ->
  it 'sumOfArr', ->
    arr = [1, 2, '5']
    r = caro.sumOfArr arr
    r2 = caro.sumOfArr arr,true
    r.should.equal 3
    r2.should.equal 8

  it 'pushNoDuplicate', ->
    arr = [1, 2, 3];
    r = caro.pushNoDuplicate(arr, 1, 3, {}, {}, 3);
    r.should.eql [1, 2, 3, {}, {}]

  it 'pushNoEmptyVal', ->
    arr = [1, 2, 3]
    r = caro.pushNoEmptyVal(arr, 1, 'caro', {}, undefined, null, 0, '', [])
    r.should.eql [1, 2, 3, 1, 'caro', 0]

  it 'pullEmptyVal', ->
    r = caro.pullEmptyVal([1, '', null, 'caro']);
    r.should.be.eql [1, 'caro']

  it 'pullUnBasicVal', ->
    r = caro.pullUnBasicVal([1, {a: 1}, 'caro']);
    r.should.be.eql [1, 'caro']