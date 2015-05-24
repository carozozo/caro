#do ->
#describe.only 'Unit', ->
#  it 'test', ->
#  defaults = caro.partialRight(caro.assign, (value, other) ->
#    console.log value
#    console.log other
#    caro.isUndefined(value) ? other : value
#  );
#
#  defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });