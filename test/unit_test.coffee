#do ->
#describe.only 'Unit', ->
#  it 'test', ->
#    fn = (i) ->
#      ++i
#    r = caro.executeIfFn(fn, 12)
#    r2 = caro.executeIfFn(null)
#    r.should.eq 13
#    should.equal r2, undefined