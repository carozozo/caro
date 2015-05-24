do ->
describe.only 'Unit', ->
  it 'test', ->
    r=caro.objToArr({a:'a',b:2,c:3})
    console.log r