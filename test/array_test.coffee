do ->
describe 'Array', ->
  it 'sumOfArr', ->
    arr = [1, 2, '5', null, {}]
    r = caro.sumOfArr arr
    r2 = caro.sumOfArr arr, true
    r.should.equal 3
    r2.should.equal 11

  it 'pushNoDup', ->
    arr = [1, 2, 3];
    r = caro.pushNoDup(arr, 1, 3, {}, {}, 3);
    r.should.eql [1, 2, 3, {}, {}]

  it 'pushNoEmpty', ->
    arr = [1, 2, 3]
    r = caro.pushNoEmpty(arr, 1, 'caro', {}, undefined, null, 0, '', [])
    r.should.eql [1, 2, 3, 1, 'caro', 0]

  it 'hasEmptyInArr', ->
    arr = [1, 2, 3];
    arr2 = [1, 2, ''];
    r = caro.hasEmptyInArr(arr);
    r2 = caro.hasEmptyInArr(arr, arr2);
    r.should.be.false
    r2.should.be.true

  it 'removeEmptyInArr', ->
    r = caro.removeEmptyInArr([1, '', null, 'caro']);
    r.should.be.eql [1, 'caro']

  it 'basicArr', ->
    r = caro.basicArr([1, {a: 1}, 'caro']);
    r.should.be.eql [1, 'caro']