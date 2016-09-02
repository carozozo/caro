do ->
describe 'Array', ->
  it 'cleanArr', ->
    arr = [1, 2]
    r = caro.cleanArr(arr);
    r.should.eql([])
    arr.should.eql([])

  it 'pushNoDuplicate', ->
    arr = [1, 2, 3];
    r = caro.pushNoDuplicate(arr, 1, 3, {}, {}, 3);
    r.should.eql([1, 2, 3, {}, {}])

  it 'pushNoEmptyVal', ->
    arr = [1, 2, 3]
    r = caro.pushNoEmptyVal(arr, 1, 'caro', {}, undefined, null, 0, '', [])
    r.should.eql([1, 2, 3, 1, 'caro', 0])

  it 'pullEmptyVal', ->
    arr = [1, '', null, 'caro', undefined];
    r = caro.pullEmptyVal(arr);
    arr.should.be.eql([1, 'caro'])
    r.should.be.eql(['', null, undefined])

  it 'pullUnBasicVal', ->
    arr = [1, {a: 1}, 'caro'];
    r = caro.pullUnBasicVal(arr);
    arr.should.be.eql([1, 'caro'])
    r.should.be.eql([{a: 1}])

  it 'randomPick', ->
    arr = [1, 2, 3];
    arr2 = [1, 2, 3];
    arrLength = arr.length;
    arrLength2 = arr2.length;
    r = caro.randomPick(arr);
    r2 = caro.randomPick(arr2, true);
    arr.length.should.be.equal(arrLength)
    arr.indexOf(r).should.be.above(-1)
    arr.indexOf(r).should.be.below(arrLength)
    arr2.length.should.be.eq(arrLength2 - 1)
    for i,val of arr2
      val.should.be.not.eq(r2)

  it 'sumOfArr', ->
    arr = [1, 2, '5']
    r = caro.sumOfArr(arr);
    r2 = caro.sumOfArr(arr, true);
    r.should.eq(3)
    r2.should.eq(8)