do ->
describe 'Array', ->
  it 'sumOfArr', ->
    arr = [1, 2, '5']
    r = caro.sumOfArr arr
    r2 = caro.sumOfArr arr, true
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
    arr = [1, '', null, 'caro'];
    r = caro.pullEmptyVal(arr);
    arr.should.be.eql [1, 'caro']
    r.should.be.eql ['', null]

  it 'pullUnBasicVal', ->
    arr = [1, {a: 1}, 'caro'];
    r = caro.pullUnBasicVal(arr);
    arr.should.be.eql [1, 'caro']
    r.should.be.eql [{a: 1}]