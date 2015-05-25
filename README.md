# Caro.js
General libraries for JavaScript / Node.js depend on lodash

## Install and Usage

### In Html
```html
<!-- https://lodash.com/ -->
<script src="/js/lodash.js"></script> 
<script src="/js/caro.js"></script>
```

```javascript
caro.isArr(['caro']); // true
```

### In Node.js
```bash
$ npm install caro
```

```javascript
var caro = require('caro');
caro.isArr(['caro']); // true
```
## Index

**[Array](#array)** | **[Helper](#helper)** | **[Loop](#loop)** | **[Object](#object)** | **[String](#string)** | **[TypeCheck](#typecheck)** | **[TypeCover](#typecover)**

### Array
[Back to Index](#index)
- **sumOfArr(arr [force=false]) - 加總陣列中的數字**
```javascript
var arr = [1, 2, '5'];
var r = caro.sumOfArr(arr); // 3
var r2 = caro.sumOfArr(arr, true); // 11
```
- **pushNoDuplicate(arr, val...) - 不重覆 push 值至陣列**
```javascript
var arr = [1, 2, 3];
var r = caro.pushNoDuplicate(arr, 1, 3, {}, {}, 3); // [ 1, 2, 3, {}, {} ]
```
- **pushNoEmptyVal(arr, val...) - 如果不為空值，才會 push 至陣列**
```javascript
var arr = [1, 2, 3];
var r = caro.pushNoEmptyVal(arr, 1, 'caro', {}, undefined, null, 0, '', []); // [ 1, 2, 3, 1, 'caro', 0 ]
```
- **pullEmptyVal(arr) - 移除陣列中的空值**
```javascript
var r = caro.pullEmptyVal([1, '', null, 'caro']); // [1, 'caro']
```
- **pullUnBasicVal(arr) - 只保留陣列中的基本值 (boolean 或 string 或 number)**
```javascript
var r = caro.pullUnBasicVal([1, {a: 1}, null, 'caro']); // [1, 'caro']
```

### Helper
[Back to Index](#index)
- **checkIfPassCb((arr, checkFn [needAllPass=true]) - 回傳 checkFn 的執行結果**
```javascript
var arg = [1, 2, 3];
// 完全比對，相當於 (1===1 && 2===1 && 3===1)
var r = caro.checkIfPassCb(arg, function (val) {
    return val === 1;
}); // false
// 不完全比對，相當於 (1 > 2 || 2 > 2 || 3 > 2)
var r2 = caro.checkIfPassCb(arg, function (val) {
    return val > 2;
}, false); // true
```
- **executeIfFn(fn [arg...]) - 如果是 function 的話則執行**
```javascript
var arg = function (i) {
    return ++i;
};
var arg2 = null;
var r = caro.executeIfFn(arg, 12); // 13
var r2 = caro.executeIfFn(arg2); // undefined
```
- **getFnName(fn) - 取得 function 名稱**
```javascript
var arg = function (i) {
    return ++i;
};
var arg2 = function isFn(){};
var r = caro.getFnName(arg); // ''
var r2 = caro.getFnName(arg2); // 'isFn'
```
- **formatMoney(str [type | opt]) - 轉換為錢幣格式**
```javascript
var arg = null;
var arg2 = '12003000.923';
var arg3 = 12003000.923;
var r = caro.formatMoney(arg); // '0' 
var r2 = caro.formatMoney(arg2, 'int'); // '$12,003,000'
var r3 = caro.formatMoney(arg3, 'sInt');
var r4 = caro.formatMoney(arg3, {
  float: 0, separated: ',',
  decimal: '.', prefix: '',
  forceFloat: false
}); // '12,003,000' - here is default options
var r5 = caro.formatMoney(arg3, {
  float: 5, forceFloat: true
}); // '12,003,000.92300'
```

### ★Loop
[Back to Index](#index)
- **loop(fn, start=0, end=0, step=1) - 執行迴圈**
```javascript
caro.loop(function (i){
    // i = 10,9,...0
}, 10, 0);
caro.loop(function (i){
    if(i > 5) return false
    // i = 1,3,5
}, 1, 10, 2);
```

### Object
[Back to Index](#index)
- **toWord(obj [wrap=false]) - 將物件轉為可讀的字串**
```javascript
r = caro.toWord(['caro', undefined], true);
r2 = caro.toWord({a: false, b: null, c: 0, d: 'caro', e: undefined, f: [], g: ()->});
```
### String
[Back to Index](#index)
- **random(len [opt]) - 產生隨機字串**
```javascript
var r = caro.random(15); // e.g. '6EJDRlBy6Z25s2O'
var r2 = caro.random(15, {
  lower: true
  upper: true
  num: true
  exclude: ''
}); // here is default options
var r3 = caro.random(15, {
  lower: false
  upper: true
  num: false
  exclude: 'A,B,C'
}); // - will create uppercase-only, and without A/B/C
```
- **strToBool(str) - 如果是 'false' 或空字串，回傳 false，否則回傳 true**
```javascript
var r = caro.strToBool('false'); // false
var r2 = caro.strToBool('fAlse'); // false
var r3 = caro.strToBool('123'); // true
var r4 = caro.strToBool(''); // false
```
- **addHead(str, addStr) - 在字串的開頭加上新字串(不重覆)**
```javascript
var r = caro.addHead('moon', 'mo'); // 'moon'
var r2 = caro.addHead('Moon', 'is'); // 'isMoon'
```
- **addTail(str, addStr) - 在字串的尾巴加上新字串(不重覆)**
```javascript
var r = caro.addTail('moon', 'on'); // 'moon'
var r2 = caro.addTail('moon', 'Day'); // 'moonDay'
```
- **wrapToBr(str, addStr) - 將字串中的換行符號轉為 '\<br /\>'**
```javascript
var r = caro.wrapToBr('''this is
    wrap content.
'''); // 'this is<br />wrap content.'
```
- **brToWrap(str, addStr) - 將字串中的 '\<br /\>' 轉為換行符號**
```javascript
var r = caro.brToWrap('this is<br />wrap content.'); // 'this is\nwrap content.'
```
- **splitByWrap(str) - 將字串以換行符號切割為陣列**
```javascript
var r = caro.splitByWrap('''
    I love
    my mother
    and
    my father
'''); // [ 'I love', 'my mother', 'and', 'my father' ]
```
- **replaceAll(str, find, replace) - 取代符合的字串**
```javascript
var r = caro.replaceAll('I*am*{Caro}.','*','-'); // 'I-am-{Caro}.'
var r2 = caro.replaceAll('I*am*{Caro}.',/\w/g,'-'); // '-*--*{----}.'
```
- **upperStr(str [opt]) - 將字串轉為大寫**
```javascript
var r = caro.upperStr('i am caro'); // 'I AM CARO'
var r2 = caro.upperStr('i am caro', 5); // 'i am CARO'
var r3 = caro.upperStr('i am caro', 5, 6); // 'i am Caro'
```
- **lowerStr(str [opt]) - 將字串轉為小寫**
```javascript
var r = caro.lowerStr('I AM CARO'); // 'i am caro'
var r2 = caro.lowerStr('I AM CARO', 5); // 'I AM caro'
var r3 = caro.lowerStr('I AM CARO', 5, 6); // 'I AM cARO'
```
- **splitStr(str [splitter]) - 將字串用指定的 splitter 分割為陣列**
```javascript
var r = caro.splitStr('i am caro', ' '); // ['i', 'am', 'caro']
var r2 = caro.splitStr('I ~love Snoopy !~!', ['~', ' ']); // ['I', '', 'love', 'Snoopy', '!', '!']
```
- **serializeUrl(str [oArgs] [coverEmpty=false]) - 將變數物件代入 URL**
```javascript
var arg = 'http://localhost';
var obj = {a: 1, b: 2, c: null};
var r = caro.serializeUrl(arg, obj); // 'http://localhost?a=1&b=2'
var r2 = caro.serializeUrl(arg, obj, true); // 'http://localhost?a=1&b=2&c='
```

### TypeCheck
[Back to Index](#index)
- **isBasicVal(arg...) - 判斷是否為基本值 (boolean 或 string 或 number)**
```javascript
var r = caro.isBasicVal(1, '', false); // true
var r2 = caro.isBasicVal({}); // false
```
- **isEmptyVal(arg...) - 判斷是否為空值 ( {} | [] | null | '' | undefined | NaN )**
```javascript
var r = caro.isEmptyVal(0); // false
var r2 = caro.isEmptyVal({}); // true
```
- **isEasingTrue(arg...) - 判斷是否為 true 或 'true' 或 1**
```javascript
var r = caro.isEasingTrue('True'); // true
var r2 = caro.isEasingTrue(1); // true
```
- **isEasingFalse(arg...) - 判斷是否為 false 或 'false' 或 0**
```javascript
var r = caro.isEasingFalse('false'); // true
var r2 = caro.isEasingFalse(0); // true
```
- **isInteger(arg) - 判斷是否為整數**
```javascript
var r = caro.isInteger(1); // true
var r2 = caro.isInteger(1.3); // false
```
- **isJson(arg...) - 判斷是否為 JSON**
```javascript
var r = caro.isJson(null); // true
var r2 = caro.isJson('caro'); // false
var r3 = caro.isJson('{"a":1}') // true
var r4 = caro.isJson('{"a":1, "b": function(){}}') // false
```
- **isObjJson(arg...) - 先判斷是否為 JSON，再判斷是否為 object 格式**
```javascript
var r = caro.isObjJson('{"a": 1}'); // true
var r2 = caro.isObjJson('{"a": function(){}}'); // false
var r3 = caro.isObjJson('{{b: 2}) // false
```
- **isUpper(str) - 判斷是否為大寫字串**
```javascript
var r = caro.isUpper('CARO'); // true
var r2 = caro.isUpper('caro'); // false
```
- **isLower(str) - 判斷是否為小寫字串**
```javascript
var r = caro.isLower('caro'); // true
var r2 = caro.isLower('Caro'); // false
```

### TypeCover
[Back to Index](#index)
- **toArray(arg) - 將變數轉為 array**
```javascript
var r = caro.toArray([3, 2, 1]); // [3, 2, 1]
var r2 = caro.toArray(null); // [ null ]
```
- **toString(arg) - 將變數轉為 string**
```javascript
var r = caro.toString(function () {}); // 'function () {}'
var r2 = caro.toString(null); // 'null'
var r3 = caro.toString(['caro', undefined]); // 'caro,'
```
- **toInteger(arg) - 將變數轉為 integer**
```javascript
var r = caro.toInteger('123.6'); // 123
var r2 = caro.toInteger('a'); // NaN
var r3 = caro.toInteger(null); // NaN
```
- **toNumber(arg) - 將變數轉為 number**
```javascript
var r = caro.toNumber('123.45'); // 123.45
var r2 = caro.toNumber({}); // NaN
var r3 = caro.toNumber(undefined); // NaN
```
- **toFixedNumber(arg [dec=2]) - 將變數轉為 fixed-number**
```javascript
var r = caro.toFixedNumber('3.4355'); // 3.44
var r2 = caro.toFixedNumber(2.12345, 3); // 2.123
var r3 = caro.toFixedNumber('caro', 3) // NaN
```
- **toJson(arg [replacer=null] [space=0]) - 將變數轉為 JSON**
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