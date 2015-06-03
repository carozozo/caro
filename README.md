# Caro.js
[![Build Status](https://travis-ci.org/carozozo/caro.svg?branch=master)](https://travis-ci.org/carozozo/caro)  

General libraries for JavaScript / Node.js base on [lodash](https://www.npmjs.com/package/lodash)     
It also support [lodash-libraries](https://lodash.com/docs)
## Install and Usage

### In Html
```html
<!-- https://lodash.com/ -->
<script src="/js/lodash.js"></script> 
<script src="/js/caro.js"></script>
```

```javascript
caro.isArray(['caro']); // true
```

### In Node.js
```bash
$ npm install caro
```

```javascript
var caro = require('caro');
caro.isArray(['caro']); // true
```
## Index

**[Array](#array)** | **[Helper](#helper)** | **[Loop](#loop)** | **[Object](#object)** | **[String](#string)** | **[TypeCheck](#typecheck)** | **[TypeCover](#typecover)**

### Array
[Back to Index](#index)
- **sumOfArr(arr [force=false]) - get sum-value in array**
```javascript
var arr = [1, 2, '5'];
var r = caro.sumOfArr(arr); // 3
var r2 = caro.sumOfArr(arr, true); // 11
```
- **pushNoDuplicate(arr, val...) - push value to array exclude duplicate**
```javascript
var arr = [1, 2, 3];
var r = caro.pushNoDuplicate(arr, 1, 3, {}, {}, 3); // [ 1, 2, 3, {}, {} ]
```
- **pushNoEmptyVal(arr, val...) - push non-empty value to array**
```javascript
var arr = [1, 2, 3];
var r = caro.pushNoEmptyVal(arr, 1, 'caro', {}, undefined, null, 0, '', []); // [ 1, 2, 3, 1, 'caro', 0 ]
```
- **pullEmptyVal(arr) - pull empty-value from array**
```javascript
var arr = [1, '', null, 'caro'];
var r = caro.pullEmptyVal(arr);
console.log(arr); // [1, 'caro']
console.log(r); // ['', null]
```
- **pullUnBasicVal(arr) - pull un-basic-value(exclude boolean/string/number) from array**
```javascript
var arr = [1, {a: 1}, 'caro'];
var r = caro.pullUnBasicVal(arr);
console.log(arr); // [1, 'caro']
console.log(r); // [{a: 1}]
```

### Helper
[Back to Index](#index)
- **checkIfPass((arr, checkFn [needAllPass=true]) - validate all values in array by check-function**
```javascript
var arg = [1, 2, 3];
// (1===1 && 2===1 && 3===1)
var r = caro.checkIfPass(arg, function (val) {
    return val === 1;
}); // false
// (1 > 2 || 2 > 2 || 3 > 2)
var r2 = caro.checkIfPass(arg, function (val) {
    return val > 2;
}, false); // true
```
- **executeIfFn(fn [arg...]) - execute it if argument is function**
```javascript
var arg = function (i) {
    return ++i;
};
var arg2 = null;
var r = caro.executeIfFn(arg, 12); // 13
var r2 = caro.executeIfFn(arg2); // undefined
```
- **getFnName(fn) - get function name**
```javascript
var arg = function (i) {
    return ++i;
};
var arg2 = function isFn(){};
var r = caro.getFnName(arg); // ''
var r2 = caro.getFnName(arg2); // 'isFn'
```
- **formatMoney(str [type | opt]) - format string/number to money type**
```javascript
var r = caro.formatMoney(null); // '0' 
var r2 = caro.formatMoney('12003000.923', 'int'); // '12,003,000'
var r3 = caro.formatMoney(12003000.923, 'sInt'); // '$12,003,000'
var r4 = caro.formatMoney(12003000.923, {
  float: 0, separated: ',',
  decimal: '.', prefix: '',
  forceFloat: false
}); // '12,003,000' - here is default options
var r5 = caro.formatMoney(12003000.923, {
  float: 5, forceFloat: true
}); // '12,003,000.92300'
```
- **serializeUrl(str [oArgs] [coverEmpty=false]) - format object to URL params**
```javascript
var arg = 'http://localhost';
var obj = {a: 1, b: 2, c: null};
var r = caro.serializeUrl(arg, obj); // 'http://localhost?a=1&b=2'
var r2 = caro.serializeUrl(arg, obj, true); // 'http://localhost?a=1&b=2&c='
```
### Loop
[Back to Index](#index)
- **loop(fn, start=0, end=0 [step=1]) - for-loop**
```javascript
caro.loop(function (i){
    // i = 10, 9,...0
}, 10, 0);
caro.loop(function (i){
    if(i > 5) return false;
    // i = 1, 3, 5
}, 1, 10, 2);
```

### Object
[Back to Index](#index)
- **toWord(obj [space=2]) - get string for easy-reading with object/array**
```javascript
r = caro.toWord(['caro', undefined], true);
r2 = caro.toWord({a: false, b: null, c: 0, d: 'caro', e: undefined, f: [], g: function(){}});
```
- **classify(obj) - group by argument type**
```javascript
var r = caro.classify({
  a: 1,
  b: 'd',
  c: {cc: 1},
  d: function(){},
  e: ['caro'],
  f: 'FF',
});
/*
{ 
  bool: [],
  str: [ 'd', 'FF' ],
  num: [ 1 ],
  arr: [ [ 'caro' ] ],
  obj: [ { cc: 1 } ],
  fn: [ [Function] ] 
}
*/
```
- **catching(obj, obj2...) - catch other object-values to target-object when it has key matched**
```javascript
var obj = {name: 'Caro', age: 18};
var obj2 = {country: 'Taiwan', city: 'Kaohsiung'};
var r = {name: ''};
var r2 = {name: '', city: ''};
caro.catching(r, obj); // { name: 'Caro' }
caro.catching(r2, obj, obj2); // { name: 'Caro', city: 'Kaohsiung' }
```
### String
[Back to Index](#index)
- **random(len [opt]) - create random string**
```javascript
var r = caro.random(15); // e.g. '6EJDRlBy6Z25s2O'
var r2 = caro.random(15, {
  lower: true,
  upper: true,
  num: true,
  exclude: ''
}); // here is default options
var r3 = caro.random(15, {
  lower: false,
  upper: true,
  num: false,
  exclude: 'A,B,C'
}); // - will create uppercase-only, and without A/B/C
```
- **strToBool(str) - return false if string like'false', otherwise return true**
```javascript
var r = caro.strToBool('false'); // false
var r2 = caro.strToBool('fAlse'); // false
var r3 = caro.strToBool('123'); // true
var r4 = caro.strToBool(''); // false
```
- **addHead(str, addStr) - add prefix-string if not exists**
```javascript
var r = caro.addHead('moon', 'mo'); // 'moon'
var r2 = caro.addHead('Moon', 'is'); // 'isMoon'
```
- **addTail(str, addStr) - add suffix-string if not exists**
```javascript
var r = caro.addTail('moon', 'on'); // 'moon'
var r2 = caro.addTail('moon', 'Day'); // 'moonDay'
```
- **wrapToBr(str, addStr) - cover wrap to '\<br /\>'**
```javascript
var r = caro.wrapToBr('''this is
    wrap content.
'''); // 'this is<br />wrap content.'
```
- **brToWrap(str, addStr) - cover '\<br /\>'to wrap**
```javascript
var r = caro.brToWrap('this is<br />wrap content.'); // 'this is\nwrap content.'
```
- **splitByWrap(str) - split string by wrap**
```javascript
var r = caro.splitByWrap('''
    I love
    my mother
    and
    my father
'''); // [ 'I love', 'my mother', 'and', 'my father' ]
```
- **replaceAll(str, find, replace) - replace string that matched**
```javascript
var r = caro.replaceAll('I*am*{Caro}.','*','-'); // 'I-am-{Caro}.'
var r2 = caro.replaceAll('I*am*{Caro}.',/\w/g,'-'); // '-*--*{----}.'
```
- **upperStr(str [opt]) - cover string to uppercase**
```javascript
var r = caro.upperStr('i am caro'); // 'I AM CARO'
var r2 = caro.upperStr('i am caro', 5); // 'i am CARO'
var r3 = caro.upperStr('i am caro', 5, 6); // 'i am Caro'
```
- **lowerStr(str [opt]) - cover string to lowercase**
```javascript
var r = caro.lowerStr('I AM CARO'); // 'i am caro'
var r2 = caro.lowerStr('I AM CARO', 5); // 'I AM caro'
var r3 = caro.lowerStr('I AM CARO', 5, 6); // 'I AM cARO'
```
- **splitStr(str [splitter]) - split string**
```javascript
var r = caro.splitStr('i am caro', ' '); // ['i', 'am', 'caro']
var r2 = caro.splitStr('I ~love Snoopy !~!', ['~', ' ']); // ['I', '', 'love', 'Snoopy', '!', '!']
```

### TypeCheck
[Back to Index](#index)
- **isBasicVal(arg...) - check if basic-value (boolean/string/number)**
```javascript
var r = caro.isBasicVal(1, '', false); // true
var r2 = caro.isBasicVal({}); // false
```
- **isEmptyVal(arg...) - check if empty-value ( {} | [] | null | '' | undefined | NaN )**
```javascript
var r = caro.isEmptyVal(0); // false
var r2 = caro.isEmptyVal({}); // true
```
- **isEasingTrue(arg...) - check if true or 'true' or 1**
```javascript
var r = caro.isEasingTrue('True'); // true
var r2 = caro.isEasingTrue(1); // true
```
- **isEasingFalse(arg...) - check if false or 'false' or 0**
```javascript
var r = caro.isEasingFalse('false'); // true
var r2 = caro.isEasingFalse(0); // true
```
- **isInteger(arg) - check if integer**
```javascript
var r = caro.isInteger(1); // true
var r2 = caro.isInteger(1.3); // false
```
- **isJson(arg...) - check if JSON**
```javascript
var r = caro.isJson(null); // true
var r2 = caro.isJson('caro'); // false
var r3 = caro.isJson('{"a":1}') // true
var r4 = caro.isJson('{"a":1, "b": function(){}}') // false
```
- **isObjJson(arg...) - check if JSON first, then check if object-type**
```javascript
var r = caro.isObjJson('{"a": 1}'); // true
var r2 = caro.isObjJson('{"a": function(){}}'); // false
var r3 = caro.isObjJson({b: 2}) // false
```
- **isUpper(str) - check string if all uppercase**
```javascript
var r = caro.isUpper('CARO'); // true
var r2 = caro.isUpper('caro'); // false
```
- **isLower(str) - check string if all lowercase**
```javascript
var r = caro.isLower('caro'); // true
var r2 = caro.isLower('Caro'); // false
```

### TypeCover
[Back to Index](#index)
- **toArray(arg) - cover to array**
```javascript
var r = caro.toArray([3, 2, 1]); // [3, 2, 1]
var r2 = caro.toArray(null); // [ null ]
```
- **toString(arg) - cover to string**
```javascript
var r = caro.toString(function () {}); // 'function () {}'
var r2 = caro.toString(null); // 'null'
var r3 = caro.toString(['caro', undefined]); // 'caro,'
```
- **toInteger(arg) - cover to integer**
```javascript
var r = caro.toInteger('123.6'); // 123
var r2 = caro.toInteger('a'); // NaN
var r3 = caro.toInteger(null); // NaN
```
- **toNumber(arg) - cover to number**
```javascript
var r = caro.toNumber('123.45'); // 123.45
var r2 = caro.toNumber({}); // NaN
var r3 = caro.toNumber(undefined); // NaN
```
- **toFixedNumber(arg [dec=2]) - cover to fixed-number**
```javascript
var r = caro.toFixedNumber('3.4355'); // 3.44
var r2 = caro.toFixedNumber(2.12345, 3); // 2.123
var r3 = caro.toFixedNumber('caro', 3) // NaN
```
- **toJson(arg [replacer=null] [space=0]) - cover to JSON**
```javascript
var arg = {a: 3, b: 5};
var replacer = function (key, val) {
    if (key === '') {
        return val; // the arg itself
    }
    return val + 1;
};
var r = caro.toJson(3.4); // '3.4'
var r2 = caro.toJson(arg, replacer); // '{"a":4,"b":6}'
```