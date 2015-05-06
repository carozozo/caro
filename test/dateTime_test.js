(function () {
    'use strict';
    var caro = require('../caro.js');
    var should = require('should');
    console.log('should=', should);
    describe('DateTime', function () {
        describe('formatDateTime()', function () {
            it('setDefaultLocale', function () {
                caro.setDefaultLocale('zh-tw');
            });
            it('setDefaultLocale', function () {
                caro.setDefaultLocale('zh-tw');
            });
            it('addDateTimeShortFormat', function () {
                caro.addDateTimeShortFormat('date', 'YYYY-MM-DD');
                caro.addDateTimeShortFormat('date', 'LLL');
            });
            it('addDateTimeShortFormat', function () {
                var now = new Date();
                var a = caro.formatDateTime(now, 'date');
                console.log('a=',a);
                a.should.be.type('string');
            });
        });
    });
})();