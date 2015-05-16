do ->
describe 'Array', ->
  it 'sortArr', ->
    arg = [1, 3, 2, null];
    arg2 = [1, 3, 2, null];
    r = caro.sortArr(arg, false);
    r2 = caro.sortArr(arg2, true, true);

    arg.should.be.eql [3, 2, 1, null]
    arg2.should.be.eql [1, 3, 2, null]
    r.should.be.eql [3, 2, 1, null]
    r2.should.be.eql [null, 1, 2, 3]

  it 'sortByObjKey', ->
    obj = {index: 0, name: 'caro'}
    obj2 = {index: 1, name: 'huang'}
    obj3 = {index: 2, name: 'zozo'}
    arr = [obj, obj3, obj2]
    r = caro.sortByObjKey(arr, 'index', true, true)
    r2 = caro.sortByObjKey(arr, 'index', false)
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

  it 'removeByIndex', ->
    arr = [1, 2, 3, 4];
    arr2 = [1, 2, 3, 4, 5];
    r = caro.removeByIndex arr, 0, 2
    r2 = caro.removeByIndex arr2, true, 0
    r.should.eql [2, 4]
    r2.should.eql [2, 3, 4, 5]

  it 'removeByArrVal', ->
    arr = [1, undefined, 3, undefined, null, 4]
    r = caro.removeByArrVal(arr, undefined, null)
    r.should.eql [1, 3, 4]

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