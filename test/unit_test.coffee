do ->
describe 'Unit', ->
  it.skip 'test', ->
    r = caro.uniq([1, 5, {}, 5, undefined, undefined, null, {}, null])
    console.log r