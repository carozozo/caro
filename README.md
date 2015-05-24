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

##### (★ only support Node.js)

**[Array](#array)** | **[Console](#console)** | **[Helper](#helper)** | **[Loop](#loop)** | **[Object](#object)** | **[Path](#path)** | **[String](#string)** | **[TypeCheck](#typecheck)**

### Array
[Back to Index](#index)
- **sumOfArr(arr [force=false]) - 加總陣列中的數字**
```javascript
var arr = [1, 2, '5', null, {}];
var r = caro.sumOfArr(arr); // 3
var r2 = caro.sumOfArr(arr, true); // 11
```
- **removeDup(arr) - 移除陣列中重覆的值**
```javascript
var arr = [1, 5, {}, 5, undefined, null, {}, null];
var r = caro.removeDup(arr); // [ 1, 5, {}, undefined, null, {} ]
```
- **pushNoDup(arr, val...) - 不重覆 push 值至陣列**
```javascript
var arr = [1, 2, 3];
var r = caro.pushNoDup(arr, 1, 3, {}, {}, 3); // [ 1, 2, 3, {}, {} ]
```
- **pushNoEmpty(arr, val...) - 如果值不為空值，才會 push 至陣列**
```javascript
var arr = [1, 2, 3];
var r = caro.pushNoEmpty(arr, 1, 'caro', {}, undefined, null, 0, '', []); // [ 1, 2, 3, 1, 'caro', 0 ]
```
- **hasEmptyInArr(arr...) - 判斷陣列中是否有空值**
```javascript
var r = caro.hasEmptyInArr([1, 2, 3]); // false
var r2 = caro.hasEmptyInArr([1, 2, ''], ['caro']); // true
```
- **removeEmptyInArr(arr) - 移除陣列中的空值**
```javascript
var r = caro.removeEmptyInArr([1, '', null, 'caro']); // [1, 'caro']
```
- **basicArr(arr) - 只保留陣列中的基本值 (boolean 或 string 或 number)**
```javascript
var r = caro.basicArr([1, {a: 1}, null, 'caro']); // [1, 'caro']
```

### Console
[Back to Index](#index)
- **log(msg, variable) - 輸出 console 訊息**
```javascript
caro.log('1', undefined); // '1undefined'
caro.log(); // ''
caro.log(2, {a: 1}); // '2{"a": 1}'
caro.log(function(a){return a;}); // 'function(a){return a;}'
```
- **log2(msg, variable) - 輸出 console 訊息**
```javascript
caro.log2(undefined); // 'undefined'
caro.log2('1', undefined); // '1undefined'
caro.log2('2', {}); // '2{}'
```
- **log3(msg, variable) - 輸出 console 訊息**
```javascript
caro.log3(2, {a: 1}); // '2{"a": 1}'
caro.log3('1', undefined); // '1undefined'
caro.log3('2', null); // '2null'
```

### Helper
[Back to Index](#index)
- **isBasicVal(arg...) - 判斷是否為基本值 (boolean 或 string 或 number)**
```javascript
var r = caro.isBasicVal(1, '', false); // true
var r2 = caro.isBasicVal({}); // false
```
- **isEmptyVal(arg...) - 判斷是否為空值 ( {} | [] | null | '' | undefined )**
```javascript
var r = caro.isEmptyVal(0, {a:1}); // false
var r2 = caro.isEmptyVal({}, [], null, '', undefined); // true
```
- **isTrue(arg...) - 判斷是否為 true 或 'true' 或 1**
```javascript
var arg = true, arg2 = 'True', arg3 = 1;
var arg4 = false;
var r = caro.isTrue(arg, arg2, arg3); // true
var r2 = caro.isTrue(arg3, arg4); // false
```
- **isFalse(arg...) - 判斷是否為 false 或 'false' 或 0**
```javascript
var arg = false, arg2 = 'false', arg3 = 0;
var arg4 = true;
var r = caro.isFalse(arg, arg2, arg3); // true
var r2 = caro.isFalse(arg3, arg4); // false
```
- **checkIfPassCb((arr, checkFn [needAllPass=true]) - 回傳 checkFn 的執行結果**
```javascript
var arg = [1, 2, 3];
// 完全比對，相當於 (1===1 && 2===1 && 3===1)
var r = caro.checkIfPassCb(arg, function (val) {
    return val === 1;
}); // false
// 不完全比對，相當於 (1===1 || 2===1 || 3===1)
var r2 = caro.checkIfPassCb(arg, function (val) {
    return val === 1;
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
- **coverToArr(arg) - 如果變數不是 array 的話，將轉為 array**
```javascript
var r = caro.coverToArr([3, 2, 1]); // [3, 2, 1]
var r2 = caro.coverToArr(null); // [ null ]
```
- **coverToStr(arg [force=true]) - 將變數轉為 string**
```javascript
var r = caro.coverToStr(function () {}); // 'function () {}'
var r2 = caro.coverToStr({a: 2}); // '{a: 2}'
var r3 = caro.coverToStr(null); // 'null'
var r4 = caro.coverToStr(['caro', 1]); // 'caro,1' ( 相當於 ['caro', 1].join(',') )
```
- **coverToInt(arg [force=true]) - 將變數轉為 integer**
```javascript
var r = caro.coverToInt('123.6'); // 123
var r2 = caro.coverToInt('a', false); // 'a'
var r3 = caro.coverToInt(null); // 0
```
- **coverToNum(arg [force=true]) - 將變數轉為 number**
```javascript
var r = caro.coverToNum('123.45'); // 123.45
var r2 = caro.coverToNum({}, false); // {}
var r3 = caro.coverToNum(undefined); // 0
```
- **coverToFixed(arg [force=true]) - 將變數轉為 fixed-number**
```javascript
var r = caro.coverToFixed('3.4355', 2); // 3.44
var r2 = caro.coverToFixed(undefined, 3); // 0
var r3 = caro.coverToFixed('caro', 3, false) // 'caro'
```
- **coverToObj(arg [force=true]) - 將變數轉為 object**
```javascript
var r = caro.coverToObj({}); // {}
var r2 = caro.coverToObj(123, false); // 123
var r3 = caro.coverToObj('{"a":1}'); // {a: 1}
var r4 = caro.coverToObj(undefined); // {}
```
- **coverToJson(arg [opt]) - 將變數轉為 JSON**
```javascript
var arg = [0, 1, 2];
var replacer = function (key, val) {
    if (key === '') {
        return val; // [0, 1, 2]
    }
    return val + 2; // 0 + 2 ,1 + 2, 2 + 2
};
var r = caro.coverToJson(arg, {
    force: false, // 是否強制轉為 JSON 格式
    replacer: replacer, // 請參考 JSON.stringify 的參數 replacer
    space: 2 // 請參考 JSON.stringify 的參數 space
});
var r = caro.coverToJson(3.4); // '3.4'
var r2 = caro.coverToJson(null); // 'null'
var r3 = caro.coverToJson('caro', false); // '"caro"'    
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
- **each(arg, cb) - 遍歷 arr/obj 中的 key 和 val， 並代入 callback-function**
```javascript
caro.each(['a', 'b', 'c'], function (key, val){
  console.log(val);
  if(val==='b') return false; // break
}); // console only print 'a', 'b' 
caro.each({a: 1, b: 2, c: 3}, function (key, val){
  // key will be 'a', 'b', 'c'
  // val will be 1, 2, 3
});
caro.each(null, function (key, val){
}); // do nothing
```
- **eachArgs(fn) - 遍歷 arr/obj 中的 key 和 val ，將 key 轉為 int 之後代入 callback-fn**
```javascript
var fn = function (a, b, c) {
    caro.eachArgs(arguments, function (key, val) {
        // key will be 0, 1...
        // val will be 'd', 'e', ...
    });
};
fn('d','e', {});
```

### Object
[Back to Index](#index)
- **getObjLength(obj) - 取得 obj 長度(element 數量)**
```javascript
var arg = ['a' ,'b', 'c'];
var r = caro.getObjLength(arg); // 3    
```
- **extendObj([deep=false], obj...) - 合併至第1個 obj**
```javascript
var arg = {a: {a1: 1}};
var arg2 = {a: {a1: 1}};
var arg3 = {a: {a1: 2}, b: 2, c: {c1: 1}};
caro.extend(arg, arg3); // {a: {a1: 1}, b: 2, c: {c1: 1}}
caro.extend(true, arg2, arg3); // { a: { a1: 2 }, b: 2, c: { c1: 1 } }
 var arg = [1, 2, 3];
var arg2 = [4, 5, 6];
caro.extend(arg, arg2) // [ 1, 2, 3, 4, 5, 6 ]
``` 
- **cloneObj(obj) - 複製 obj**
```javascript
var arg = {a: 1, b: 2, c: {c1: 1}};
var r = caro.cloneObj(arg);
var r2 = caro.cloneObj(arg, true);
arg.c.c1 = 3
console.log(r) // { a: 1, b: 2, c: { c1: 3 } }
console.log(r2) // { a: 1, b: 2, c: { c1: 1 } } - 所有的值都不受 arg 影響
```
- **replaceObjKey(obj, replaceFn) - 轉換 obj 中的 key**
```javascript
var arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}};
caro.replaceObjKey(arg, function (key){
  return 'dd' if key == 'cc'
});
console.log(arg); // { aa: 1, bb: 2, dd: { c1: 3 } }
```
- **replaceObjVal(obj, replaceFn [deep=false]) - 轉換 obj 中的 val**
```javascript
var arg = {'aa': 4, 'bb': 2, 'cc': {'c1': 4}}
caro.replaceObjVal(arg, function (val){
  return 1 if val == 4
}); // {aa: 1, bb: 2, cc: {c1: 4}}
 arg = {'aa': 4, 'bb': 2, 'cc': {'c1': 4}}
caro.replaceObjVal(arg, function (val){
  return 1 if val == 4
}, true); // {aa: 1, bb: 2, cc: {c1: 1}}
```
- **upperCaseByObjKey(obj, [keys]) - 指定 key 將對應的 val 轉為大寫**
```javascript
var arg = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon'};
var arg2 = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon'};
caro.upperCaseByObjKey(arg, 'aa,bb'); // {aa: 'CARO', bb: 'PIKA', cc: 'doraemon'}
caro.upperCaseByObjKey(arg2); // {aa: 'CARO', bb: 'PIKA', cc: 'DORAEMON'}
```
- **lowerCaseByObjKey(obj, [keys]) - 指定 key 將對應的 val 轉為小寫**
```javascript
var arg = {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon'};
var arg2 = {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon'};
caro.lowerCaseByObjKey(arg, ['aa','bb']); // {'aa': 'caro', 'bb': 'pika', 'cc': 'Doraemon'};
caro.lowerCaseByObjKey(arg2); // {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon'};
```
- **upperFirstByObjKey(obj, [keys]) - 指定 key 將對應的 val 的第一個字母轉為大寫**
```javascript
var arg = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon'};
var arg2 = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon'};
caro.upperFirstByObjKey(arg, 'aa,bb'); // {aa: 'Caro', bb: 'Pika', cc: 'doraemon'};
var r = caro.upperFirstByObjKey(arg2, null, true); // {aa: 'Caro', bb: 'Pika', cc: 'Doraemon'}
```
- **trimByObjKey(obj, [keys]) - obj 中 val 為 str 的值，去除頭尾空白**
```javascript
var arg = {'aa': ' caro ', 'bb': ' pika ', 'cc': ' doraemon ', dd: 1};
var arg2 = {'aa': ' caro ', 'bb': ' pika ', 'cc': ' doraemon ', dd: 1};
var caro.trimByObjKey(arg, ['aa','cc']); // {'aa': 'caro', 'bb': ' pika ', 'cc': 'doraemon', dd: 1};
var caro.trimByObjKey(arg2); // {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', dd: 1};
```
- **keysInObj(obj [keys]) - 確認 obj 中的 key 是否存在**
```javascript
var arg = {aa: ' caro ', bb: ' pika ', cc: ' doraemon '};
var r = caro.keysInObj(arg, 'aa,bb'); // true
var r2 = caro.keysInObj(arg, ['aa', 'ee']); // false
```
- **getKeysInObj(obj [levelLimit]) - 取得 obj 中的 key**
```javascript
var arg = {a: 1, b: 2, c: {d: 3, e: {f: 4}}};
var r = caro.getKeysInObj(arg); // [ 'a', 'b', 'c' ] - 取得第一層的 key
var r2 = caro.getKeysInObj(arg, 2); // [ 'a', 'b', 'c', 'd', 'e' ] - 取到第二層的 key
var r3 = caro.getKeysInObj(arg, 0); // [ 'a', 'b', 'c', 'd', 'e', 'f' ] - 取得所有層級的 key
```
- **coverFnToStrInObj(obj [opt]) - 如果 obj 中的 val 是 fn，則轉為字串**
```javascript
var arg = {
  a: 1, b: 2, c: function (a){
    return a
  }
};
var arg2 = {
  a: 1, b: 2, c: function (a){
    return a
  }
};
r = caro.coverFnToStrInObj(arg); // { a: 1, b: 2, c: 'function (a) {return a;}' }
r2 = caro.coverFnToStrInObj(arg2, false); // { a: 1, b: 2, c: 'function (a) {\n return a;\n }' }
```
- **getArgumentsAsArr(fn) - 將物件轉為陣列**
```javascript
var fn = function (a, b) {
    var args = caro.objToArr(arguments); // [1, 2]
};
fn(1, 2);
```
### ★Path
[Back to Index](#index)
- **setAbsolutePath(path) - 定義絕對路徑根目錄**
```javascript
var r = caro.setAbsolutePath('/path/from/root'); // '/path/from/root'
var r2 = caro.setAbsolutePath('/path2//from\root'); // '/path2/from\root'
```
- **getAbsolutePath(path) - 取得絕對路徑根目錄**
```javascript
caro.setAbsolutePath('/path/from/root');
var r = caro.getAbsolutePath(); // '/path/from/root'
```
- **normalizePath(path...) - 正規化路徑**
```javascript
var r = caro.normalizePath('path//seems/not/exists'); // 'path/seems/not/exists'
var r2 = caro.normalizePath('path', '\exists'); // 'path/exists'
```
- **isFullPath(path...) - 確認是否為絕對路徑**
```javascript
caro.setAbsolutePath('/path/root');
var r = caro.isFullPath('/path/root/caro.js'); // true
var r2 = caro.isFullPath('/path/root/caro.js', '/path2'); // false
```
- **getDirPath(path) - 取得所在的資料夾路徑**
```javascript
var r = caro.getDirPath('/path/from/root'); // '/path/from'
var r2 = caro.getDirPath('/path/from/root/caro.js'); // '/path/from/root'
```
- **getFileName(path [getFull=true]) - 取得檔案名稱**
```javascript
var r = caro.getFileName('/path/from/root'); // 'root'
var r2 = caro.getFileName('/path/from/root/caro.js'); // 'caro.js'
var r3 = caro.getFileName('/path/from/root/caro.js', false); // 'caro'
```
- **getExtendName(path [withDot=true]) - 取得附檔名**
```javascript
var r = caro.getExtendName('caro.js'); // '.js'
var r2 = caro.getExtendName('caro.js.bk', false); // 'bk'
```
- **coverToFullPath(path) - 轉為絕對路徑**
```javascript
caro.setAbsolutePath('/path/from/root');
var r = caro.coverToFullPath('caro.js');  // '/path/from/root/caro.js'
var r2 = caro.coverToFullPath('other', 'caro.js'); // '/path/from/root/other/caro.js'
var r3 = caro.coverToFullPath('/path/from/root/caro.js'); // '/path/from/root/caro.js'
```

### String
[Back to Index](#index)
- **isUpper(str...) - 判斷是否為大寫字串**
```javascript
var r = caro.isUpper('CARO', 'SNOOPY'); // true
var r2 = caro.isUpper('caro', 'SNOOPY'); // false
```
- **isLower(str...) - 判斷是否為小寫字串**
```javascript
var r = caro.isLower('Caro'); // false
var r2 = caro.isLower('caro', 'snoopy'); // true
```
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
- **hasHead(str, str2) - 確認字串的開頭是否符合特定字串**
```javascript
var r = caro.hasHead('false', 'fa'); // true
var r2 = caro.hasHead('false', 'se'); // false
```
- **addHead(str, addStr) - 在字串的開頭加上新字串(不重覆)**
```javascript
var r = caro.addHead('moon', 'mo'); // 'moon'
var r2 = caro.addHead('Moon', 'is'); // 'isMoon'
```
- **hasTail(str, str2) - 確認字串的結尾是否符合特定字串**
```javascript
var r = caro.hasTail('false', 'fa'); // false
var r2 = caro.hasTail('false', 'se'); // true
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
- **escapeRegExp(str) - 將字串中的特定符號轉為跳脫字元**
```javascript
var r = caro.escapeRegExp('I*am*{Caro}.'); // 'I\\*am\\*\\{Caro\\}\\.'
```
- **replaceAll(str, find, replace) - 取代符合的字串**
```javascript
var r = caro.replaceAll('I*am*{Caro}.','*','-'); // 'I-am-{Caro}.'
var r2 = caro.replaceAll('I*am*{Caro}.',/\w/g,'-'); // '-*--*{----}.'
```
- **insertBlankBefUpper(str) - 在大寫的字母前面加上空白**
```javascript
var r = caro.insertBlankBefUpper('IAmCaro'); // 'I Am Caro'
```
- **upperStr(str [opt]) - 將字串轉為大寫**
```javascript
var r = caro.upperStr('i am caro'); // 'I AM CARO'
var r2 = caro.upperStr('i am caro', {
  start: 0,
  end: null,
  force: true
}); // 'I AM CARO' - here is default options
var r3 = caro.upperStr('i am caro', {
  start: 5,
  end: null
}); // 'i am CARO'
var r4 = caro.upperStr('i am caro', {
  start: 5,
  end: 6
}); // 'i am Caro'
```
- **upperFirst(str [force=true]) - 將第一個字母轉為大寫**
```javascript
var r = caro.upperFirst('I am Caro'); // 'I am caro'
var r2 = caro.upperFirst({}); // ''
var r3 = caro.upperFirst({}, false); // {}
```
- **lowerStr(str [opt]) - 將字串轉為小寫**
```javascript
var r = caro.lowerStr('I AM CARO'); // 'i am caro'
var r2 = caro.lowerStr('I AM CARO', {
  start: 0,
  end: null,
  force: true
}); // 'i am caro' - here is default options
var r3 = caro.lowerStr('I AM CARO', {
  start: 5,
  end: null
}); // 'I AM caro'
var r4 = caro.lowerStr('I AM CARO', {
  start: 5,
  end: 6
}); 'I AM cARO'
```
- **trimStr(str [char=' '] [side]) - 移除字串前後空白或特定的字串**
```javascript
var r = caro.trimStr(' i am caro '); // 'i am caro'
var r2 = caro.trimStr('Ai am caroA', 'A', true); // 'i am caroA'
var r3 = caro.trimStr('Ai am caroA', 'A', false); // 'Ai am caro'
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