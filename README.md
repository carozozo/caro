# Caro.js
[![Build Status](https://travis-ci.org/carozozo/caro.svg?branch=master)](https://travis-ci.org/carozozo/caro)  

General libraries for JavaScript / Node.js base on [lodash](https://www.npmjs.com/package/lodash)     
It also support [lodash-libraries4.6.1](https://lodash.com/docs)   

## Install

**In Html**
```html
<!-- https://lodash.com/ -->
<script src="/js/lodash.js"></script> 
<script src="/js/caro.js"></script>
```
**In Node.js**
```bash
$ npm install caro
```

## Usage
```javascript
var caro = require('caro');
caro.isArray(['caro']); // true
```

## Index
**[Array](#array)** | **[Helper](#helper)** | **[Loop](#loop)** | 
**[Object](#object)** | **[Path](#path)** | **[String](#string)** | 
**[TypeCheck](#typecheck)** | **[TypeCover](#typecover)**

### Array
[Back to Index](#index)
- **cleanArr(arr) - remove all items in array**
```javascript
var arr = [1, 2];
caro.cleanArr(arr); // []
```
- **pushNoDuplicate(arr, val...) - push value to array exclude duplicate**
```javascript
var arr = [1, 2, 3];
var r = caro.pushNoDuplicate(arr, 1, 3, {}, {}, 3); // [1, 2, 3, {}, {}]
```
- **pushNoEmptyVal(arr, val...) - push non-empty value to array**
```javascript
var arr = [1, 2, 3];
var r = caro.pushNoEmptyVal(arr, 1, 'caro', {}, undefined, null, 0, '', []); // [1, 2, 3, 1, 'caro', 0]
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
- **randomPick(arr [removeFromArr=false]) - select item from array by random**
```javascript
var arr = [1, 2, 3];
var arr2 = [1, 2, 3];
var r = caro.randomPick(arr); // r should be an item of arr, and arr is not changed
var r2 = caro.randomPick(arr2, true); // r2 should be an item of arr2, and arr2 should has not it
```
- **sumOfArr(arr [force=false]) - get sum-value in array**
```javascript
var arr = [1, 2, '5'];
var r = caro.sumOfArr(arr); // 3
var r2 = caro.sumOfArr(arr, true); // 8
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
- **getFnName(fn) - get function name**
```javascript
var arg = function (i) {
    return ++i;
};
var arg2 = function isFn(){};
var r = caro.getFnName(arg); // ''
var r2 = caro.getFnName(arg2); // 'isFn'
```
- **getFnBody(fn) - get function body**
```javascript
var arg = function (i) {
    return ++i;
};
var r = caro.getFnBody(arg); // '\n    return ++i;\n    '
```
- **getStackList([start=0] [length=0]) - get stack-information list**
```javascript
// in /caro/caro.js
var r = caro.getStackList();
/*
[{ 
    stack: 'Context.<anonymous> (/caro/caro.js:1:14)'
    method: 'Context.<anonymous>',
    path: '/caro/caro.js',
    line: '1',
    position: '14',
    file: 'caro.coffee' },
    ...
    ...
]
*/
```
- **setInterval(fn, ms [excludeTimes = 0]) - easy-use for setInterval**
```javascript
var countA = 0
var countB = 0
caro.setInterval(function() {
  ++countA
  console.log('A Run ' + countA + ' times');
}, 300, 3); // exclude function 3 times, each 300 milliseconds
caro.setInterval(function() {
  if(countB === 4){
    return false;
  }
  ++countB
  console.log('B Run ' + countB + ' times');
}, 300); // exclude function each 300 milliseconds, and stop when countB === 4
```
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
- **randomInt(max [min = 0]) - random an integer**
```javascript
var r = caro.randomInt(3); // integer from 0 to 3
var r2 = caro.randomInt(3, -3); // integer from -3 to 3
var r3 = caro.randomInt(); // 0
```
- **randomNum(max [min = 0]) - random a number**
```javascript
var r = caro.randomNum(3); // number from 0 to 3
var r2 = caro.randomNum(3, -3); // number from -3 to 3
var r3 = caro.randomNum(); // 0
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
- **assignByKeys(obj, obj2, keys [replace=true]) - assign elements to from obj2 to obj1 by keys**
```javascript
var obj = {a: 1, b: 2, c: 3, d: 4};
var obj2 = {d: 1, e: 2, f: 3};
caro.assignByKeys(obj, obj2, ['d', 'f']);
// obj = {a: 1, b: 2, c: 3, d: 1, f: 3}
obj = {a: 1, b: 2, c: 3, d: 4};
caro.assignByKeys(obj, obj2, ['d', 'f'], false);
// obj = {a: 1, b: 2, c: 3, d: 4, f: 3}
```
- **catching(obj, obj2...) - catch other object-values to target-object when it has key matched**
```javascript
var obj = {name: 'Caro', age: 18};
var obj2 = {country: 'Taiwan', city: 'Kaohsiung'};
var r = {name: ''};
var r2 = {name: '', city: ''};
caro.catching(r, obj); // {name: 'Caro'}
caro.catching(r2, obj, obj2); // {name: 'Caro', city: 'Kaohsiung'}
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
- **differentKeys(obj, obj2 [reverse=false]) - get keys that obj has but obj2 not**
```javascript
var obj = {name: 'Caro', age: 18};
var obj2 = {name: 'Snoopy', country: 'Taiwan', city: 'Kaohsiung'};
var r = caro.differentKeys(obj, obj2); // ['age']
var r2 = caro.differentKeys(obj, obj2, true); // ['country', 'city']
```
- **hasEqualKeys(obj, obj2) - check if all keys are equal between objects**
```javascript
var obj = {name: 'Caro', age: 18};
var obj2 = {name: 'Snoopy', age: 3};
var obj3 = {name: 'Kitty', country: 'Japan'};
var r = caro.hasEqualKeys(obj, obj2); // true
var r2 = caro.hasEqualKeys(obj, obj3); // false
```
- **sameKeys(obj, obj2) - get keys that is same between objects**
```javascript
var obj = {a: 1, b: 2, c: 3, e: 4};
var obj2 = {a: 3, c: 4, d: 5, e: 6};
var r = caro.sameKeys(obj, obj2); // ['a', 'c', 'e']
```

### Path
[Back to Index](#index)
- **getDirPath(path) - get dir-path**
```javascript
var r = caro.getDirPath('a/b/c/d.js'); // 'a/b/c/'
var r2 = caro.getDirPath('a/b/a'); // 'a/b/'
```
- **getFileName(path [getFull=true]) - get filename of path**
```javascript
var r = caro.getFileName('a/b/c/d.js'); // 'd.js'
var r2 = caro.getFileName('a/b/c/d.js', false); // 'd'
var r3 = caro.getFileName('a/b/a'); // 'a'
```
- **getExtendName(path [getFull=true]) - get extend-name of filename**
```javascript
var r = caro.getExtendName('a/b/c/d.js'); // '.js'
var r2 = caro.getExtendName('a/b/c/d.js', false); // 'js'
var r3 = caro.getExtendName('a/b/a'); // ''
```

### String
[Back to Index](#index)
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
- **brToWrap(str, addStr) - cover '\<br /\>'to wrap**
```javascript
var r = caro.brToWrap('this is<br />wrap content.'); // 'this is\nwrap content.'
```
- **insertStr(str1, str2, [position]) - insert string to another**
```javascript
var r = caro.insertStr('Lift is good', ' so', 7); // 'Lift is so good'
var r2 = caro.insertStr('I love my', ' dog'); // 'I love my dog' 
```
- **lowerStr(str [start = 0 or callback] [end]) - cover string to lowercase**
```javascript
var r = caro.lowerStr('I AM CARO'); // 'i am caro'
var r2 = caro.lowerStr('I AM CARO', 5); // 'I AM caro'
var r3 = caro.lowerStr('I AM CARO', 5, 6); // 'I AM cARO'
var r4 = caro.lowerStr('I AM CARO', function(letter){
  if(letter !== 'C'){
    return true;
  }
}); // 'i am Caro'
var r5 = caro.lowerStr('I AM CARO', function(letter, i){
  if(i > 1){
    return true;
  }
}); // 'I am caro'
```
- **replaceAll(str, find, replace) - replace string that matched**
```javascript
var r = caro.replaceAll('I*am*{Caro}.', '*', '-'); // 'I-am-{Caro}.'
var r2 = caro.replaceAll('I-am-Caro.', '-', '@'); // 'I@am@Caro.'
```
- **replaceLast(str, find, replace) - replace string that last-matched**
```javascript
var r = caro.replaceLast('I-am-Caro.', '-', ' '); // 'I-am Caro.'
var r2 = caro.replaceLast('I am Caro not Colo.', 'C', 'T'); // 'I am Caro not Tolo.'
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
- **splitStr(str [splitter]) - split string**
```javascript
var r = caro.splitStr('i am caro', ' '); // ['i', 'am', 'caro']
var r2 = caro.splitStr('I ~love Snoopy !~!', ['~', ' ']); // ['I', '', 'love', 'Snoopy', '!', '!']
```
- **strToBool(str) - return false if string like'false', otherwise return true**
```javascript
var r = caro.strToBool('false'); // false
var r2 = caro.strToBool('fAlse'); // false
var r3 = caro.strToBool('123'); // true
var r4 = caro.strToBool(''); // false
```
- **upperStr(str [start = 0 or callback] [end]) - cover string to uppercase**
```javascript
var r = caro.upperStr('i am caro'); // 'I AM CARO'
var r2 = caro.upperStr('i am caro', 5); // 'i am CARO'
var r3 = caro.upperStr('i am caro', 5, 6); // 'i am Caro'
var r4 = caro.upperStr('i am caro', function(letter){
  if(letter === 'i' or letter === 'c'){
    return true;
  }
}); // 'I am Caro'
var r5 = caro.upperStr('i am caro', function(letter, i){
  if(i < 1){
    return true;
  }
}); // 'I am caro'
```
- **wrapToBr(str, addStr) - cover wrap to '\<br /\>'**
```javascript
var r = caro.wrapToBr('''this is
    wrap content.
'''); // 'this is<br />wrap content.'
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
var r3 = caro.isObjJson({b: 2}); // false
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

## History
- Add [Helper -> randomNum] - v0.24.9
- Add [Helper -> setInterval] - v0.23.6
- Move [String -> random to Helper -> random] - v0.22.6
- Update [String -> upperStr] - v0.22.5
- Update [String -> lowerStr] - v0.22.4
- Remove [Object -> toWord] - v0.22.3
- Update CLI setting - v0.21.3
- Add [Array -> randomPick] - v0.21.2
- Add [Helper -> randomInt] - v0.20.2
- Update [Object -> toWord] - v0.19.2
- Update Package - v0.19.1
- Add [Array -> cleanArr] - v0.19.0
- Add [String -> insertStr] - v0.18.0
- Add [Object -> assignByKeys] - v0.17.0
- Fix version - v0.16.1
- Add [Object -> sameKeys] - v0.16.0
- Rename [Object -> equalKeys to hasEqualKeys] - v0.15.1