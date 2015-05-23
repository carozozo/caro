do ->
describe 'Array', ->
  it 'sortArr', ->
    r = caro.sortArr([1, 3, 2, null]);
    r2 = caro.sortArr([1, 3, 2, null], false);
    r.should.be.eql [null, 1, 2, 3]
    r2.should.be.eql [3, 2, 1, null]

  it 'sortByObjKey', ->
    obj = {index: 0, name: 'caro'}
    obj2 = {index: 1, name: 'huang'}
    obj3 = {index: 2, name: 'zozo'}
    arr = [obj, obj3, obj2]
    arr2 = [obj, obj3, obj2]
    r = caro.sortByObjKey(arr, 'index')
    r2 = caro.sortByObjKey(arr2, 'index', false)
    r.should.eql [
      {index: 0, name: 'caro'}
      {index: 1, name: 'huang'}
      {index: 2, name: 'zozo'}
    ]
    r2.should.eql [
      {index: 2, name: 'zozo'},
      {index: 1, name: 'huang'},
      {index: 0, name: 'caro'}
    ]

  it 'sumOfArr', ->
    arr = [1, 2, '5', null, {}]
    r = caro.sumOfArr arr
    r2 = caro.sumOfArr arr, true
    r.should.equal 3
    r2.should.equal 11

  it 'removeDup', ->
    arr = [1, 5, {}, 5, undefined, null, {}, null];
    r = caro.removeDup(arr);
    r.should.eql [1, 5, {}, undefined, null, {}]

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