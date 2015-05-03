# Caro.js
JavaScript / Node.js 通用函式 by caro

## 安裝及使用

### In Html
```html
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
var validator = require('caro');
caro.isArr(['caro']); // true
```
## 索引

##### (★ 只適用於 Node.js | ☆ 部份適用於 Node.js)

**[Array](#array)** | **★[Console](#console)** | **★[DateTime](#datetime)** | **[FileSystem](#filesystem)**
| **[Helper](#helper)** | **★[Log](#log)** | **[Object](#object)** | **[Path](#path)** | **[String](#string)**
| **☆[TypeCheck](#typecheck)**

### Array
- **cloneArr(arr) - 複製陣列**
```javascript
    var arr = [1, 2, 3];
    var r = caro.cloneArr(arr);
    var r2 = caro.cloneArr('123');
    arr[0] = 4;
    console.log(arr); // [ 4, 2, 3 ]
    console.log(r); // [ 1, 2, 3 ] 不會跟著 arr 改變
    console.log(r2); // []
```
- **extendArr(arr... [duplicate]) - 合併陣列**
```javascript
    var arr = [1, 2, 3];
    var arr2 = [2, 3, 4];
    var arr3 = [3, 4, 5];
    var r = caro.extendArr(arr, arr2);
    var r2 = caro.extendArr(arr, arr2, arr3, false);
    console.log(r); // [ 1, 2, 3, 2, 3, 4 ]
    console.log(r2); // [ 1, 2, 3, 4, 5 ]
```
- **sortByObjKey(arr, key [sort]) - 如果陣列中的值是物件，則可指定物件的 key 值排序**
```javascript
    var obj = {index: 0, name: 'caro'};
    var obj2 = {index: 1, name: 'huang'};
    var obj3 = {index: 2, name: 'zozo'};
    var arr = [obj, obj3, obj2];
    var r = caro.sortByObjKey(arr, 'index');
    var r2 = caro.sortByObjKey(arr, 'index', false);
    // [ { index: 0, name: 'caro' }, { index: 1, name: 'huang' }, { index: 2, name: 'zozo' } ]
    console.log(r);
    // [ { index: 2, name: 'zozo' }, { index: 1, name: 'huang' },  { index: 0, name: 'caro' } ]
    console.log(r2);
```
- **sumOfArr(arr [force]) - 加總陣列中的數字**
```javascript
    var arr = [1, 2, '5', null, {}];
    var r = caro.sumOfArr(arr);
    var r2 = caro.sumOfArr(arr, true);
    console.log(r); // 3
    console.log(r2); // 11
```
- **removeByIndex(arr, index...) - 依 index 移除陣列中的元素**
```javascript
    var arr = [1, 2, 3, 4];
    var arr2 = [1, 2 , 3, 4, 5];
    var r = caro.removeByIndex(arr, 0, 2);
    var r2 = caro.removeByIndex(arr2, true, 0);
    console.log(r); // [ 2, 4 ]
    console.log(r2); // [ 2, 3, 4, 5 ]
```
- **removeByArrVal(arr, val...) - 依 value 移除陣列中的元素**
```javascript
     var arr = [1, undefined, 3, undefined, null, 4];
     var r = caro.removeByArrVal(arr, undefined, null);
     console.log(r); // [ 1, 3, 4 ]
```
- **removeDup(arr) - 移除陣列中重覆的值**
 ```javascript
    var arr = [1, 5, {}, 5, undefined, null, {}, null];
     var r = caro.removeDup(arr);
     console.log(r); // [ 1, 5, {}, undefined, null, {} ]
 ```
- **pushNoDup(arr, val...) - 不重覆 push 值至陣列**
 ```javascript
    var arr = [1, 2, 3];
    var r = caro.pushNoDup(arr, 1, 3, {}, {}, 3);
    console.log(r); // [ 1, 2, 3, {}, {} ]
 ```
- **pushNoEmpty(arr, val...) - 如果值不為空值，才會 push 至陣列**
 ```javascript
    var arr = [1, 2, 3];
    var r = caro.pushNoEmpty(arr, 1, 'caro', {}, undefined, null, 0, '', []);
    console.log(r); // [ 1, 2, 3, 1, 'caro', 0 ]
 ```
- **hasEmptyInArr(arr...) - 判斷陣列中是否有空值**
 ```javascript
    var arr = [1, 2, 3];
    var arr2 = [1, 2, ''];
    var r = caro.hasEmptyInArr(arr);
    var r2 = caro.hasEmptyInArr(arr2);
    var r3 = caro.hasEmptyInArr(arr, 'caro');
    console.log(r); // false
    console.log(r2); // true
    console.log(r3); // true
 ```

### Helper
- **isBasicVal(arg...) - 判斷是否為 boolean 或 string 或 number**
```javascript
    var arg = 1, arg2 = '', arg3 = false;
    var arg4 = {};
    var r = caro.isBasicVal(arg, arg2, arg3);
    var r2 = caro.isBasicVal(arg4);
    console.log(r); // true
    console.log(r2); // false
```
- **isEmptyVal(arg...) - 判斷是否為空值 ( {} | [] | null | '' | undefined )**
```javascript
    var arg = 0, arg2 = false;
    var arg3 = {}, arg4 = [], arg5 = null, arg6 = '';
    var r = caro.isEmptyVal(arg, arg2);
    var r2 = caro.isEmptyVal(arg3, arg4, arg5, arg6, undefined);
    console.log(r); // false
    console.log(r2); // true
```
- **isTrue(arg...) - 判斷是否為 true 或 'true' 或 1**
```javascript
    var arg = true, arg2 = 'True', arg3 = 1;
    var arg4 = false;
    var r = caro.isTrue(arg, arg2, arg3);
    var r2 = caro.isTrue(arg3, arg4);
    console.log(r); // true
    console.log(r2); // false
```
- **isFalse(arg...) - 判斷是否為 false 或 'false' 或 0**
```javascript
    var arg = false, arg2 = 'false', arg3 = 0;
    var arg4 = true;
    var r = caro.isFalse(arg, arg2, arg3);
    var r2 = caro.isFalse(arg3, arg4);
    console.log(r); // true
    console.log(r2); // false
```
- **checkIfPassCb((arr, checkFn, needAllPass) - 回傳 checkFn 的執行結果**
```javascript
    var arg = [1, 2, 3];
    // 完全比對，相當於 (1===1 && 2===1 && 3===1)
    var r = caro.checkIfPassCb(arg, function (val) {
        return val === 1;
    });
    // 不完全比對，相當於 (1===1 || 2===1 || 3===1)
    var r2 = caro.checkIfPassCb(arg, function (val) {
        return val === 1;
    }, false);
    console.log(r); // false
    console.log(r2); // true
```
- **executeIfFn(fn [arg...]) - 如果是 function 的話則執行**
```javascript
    var arg = function (i) {
        return ++i;
    };
    var arg2 = null;
    var r = caro.executeIfFn(arg, 12);
    var r2 = caro.executeIfFn(arg2);
    console.log(r); // 13
    console.log(r2); // undefined
```
- **getFnName(fn) - 取得 function 名稱**
```javascript
    var arg = function (i) {
        return ++i;
    };
    var arg2 = function b(){};
    var r = caro.getFnName(arg);
    var r2 = caro.getFnName(arg2);
    console.log(r); // ""
    console.log(r2); // 'b'
```
- **coverToArr(arg) - 將變數轉為 array**
```javascript
    var arg = [3, 2, 1];
    var arg2 = null;
    var r = caro.coverToArr(arg);
    var r2 = caro.coverToArr(arg2);
    console.log(r); // [ 3, 2, 1 ]
    console.log(r2); // [ null ]
```
- **coverToStr(arg [force]) - 將變數轉為 string**
```javascript
    var arg = function () {};
    var arg2 = {a: 2}, arg3 = null;
    var r = caro.coverToStr(arg);
    var r2 = caro.coverToStr(arg2);
    var r3 = caro.coverToStr(arg3);
    console.log(r); // "function () {}"
    console.log(r2); // "{a: 2}"
    console.log(r3); // "null"
```
- **coverToInt(arg [force]) - 將變數轉為 integer**
```javascript
    var arg = '123.6', arg2 = 'a', arg3 = null;
    var r = caro.coverToInt(arg);
    var r2 = caro.coverToInt(arg2, false);
    var r3 = caro.coverToInt(arg3);
    console.log(r); // 123 (number)
    console.log(r2); // 'a'
    console.log(r3); // 0
```
- **coverToNum(arg [force]) - 將變數轉為 number**
```javascript
    var arg = '123.45', arg2 = {};
    var r = caro.coverToNum(arg);
    var r2 = caro.coverToNum(arg2, false);
    var r3 = caro.coverToNum(undefined);
    console.log(r); // 123.45 (number)
    console.log(r2); // {}
    console.log(r3); // 0
```
- **coverToObj(arg [force]) - 將變數轉為 object**
```javascript
    var arg = {}, arg2 = 123;
    var r = caro.coverToObj(arg);
    var r2 = caro.coverToObj(arg2, false);
    var r3 = caro.coverToObj(undefined);
    console.log(r); // {}
    console.log(r2); // 123
    console.log(r3); // {}
```
- **coverToJson(arg [, opt]) - 將變數轉為 JSON**
```javascript
    var arg = [0, 1, 2];
    var replacer = function (key, val) {
        if (key === '') {
            return val;
        }
        return val + 2;
    };
    var r = caro.coverToJson(arg, {
        force: false, // 是否強制轉為 JSON 格式
        replacer: replacer, // 請參考 JSON.stringify 的參數 replacer
        space: 2 // 請參考 JSON.stringify 的參數 space
    });
    console.log(r);
```

### Object
- **eachObj(obj, cb) - 遍歷 arr/obj 中的 key 和 val， 並回傳至 cb 中(用法同 jQuery.each)**
```javascript
```
- **getObjLength(obj) - 取得 obj 長度(element 數量)**
```javascript
```
- **extendObj(obj1, obj2 [, deep]) - 將 obj2 合併至 obj1**
```javascript
```
- **cloneObj(obj [, deep]) - 複製 obj**
```javascript
```
- **copyByObjKey(obj1, keys [, opt]) - 指定 key 複製 obj 中的 element**
```javascript
```
- **replaceObjKey(obj, replaceFn [, opt]) - 轉換 obj 中的 key**
```javascript
```
- **replaceObjVal(obj, replaceFn [, opt]) - 轉換 obj 中的 val**
```javascript
```
- **upperCaseByObjKey(obj, aKey [, opt]) - 指定 key 將對應的 val 轉為大寫**
```javascript
```
- **lowerCaseByObjKey(obj, aKey [, opt]) - 指定 key 將對應的 val 轉為小寫**
```javascript
```
- **upperFirstByObjKey(obj, aKey [, opt]) - 指定 key 將對應的 val 的第一個字母轉為大寫**
```javascript
```
- **trimObjVal(obj [, opt]) - obj 中 val 為 str 的值，去除頭尾空白**
```javascript
```
- **keysInObj(obj [, keys]) - 確認 obj 中的 key 是否存在**
```javascript
```
- **getKeysInObj(obj [, levelLimit]) - 取得 obj 中的 key**
```javascript
```
- **coverFnToStrInObj(obj [, opt]) - 如果 obj 中的 val 是 fn，則轉為字串(for 文字輸出用)**
```javascript
```

### String
- **random(len [, opt]) - 產生隨機字串**
```javascript
```
- **toBool(str) - 如果字串為 'true' 或不是空字串，回傳 true；如果是 'false' 或空字串，回傳 false**
```javascript
```
- **addHead(str, addStr) - 在字串的開頭加上新字串(不重覆)**
```javascript
```
- **addTail(str, addStr) - 在字串的尾巴加上新字串(不重覆)**
```javascript
```
- **wrapToBr(str, addStr) - 將字串中的換行符號轉為 '\<br /\>'**
```javascript
```
- **brToWrap(str, addStr) - 將字串中的 '\<br /\>' 轉為換行符號**
```javascript
```
- **splitByWrap(str) - 將字串以換行符號切割為陣列**
```javascript
```
- **escapeRegExp(str) - 將字串中的特定符號轉為跳脫字元**
```javascript
```
- **replaceAll(str, find, replace) - 取代符合的字串**
```javascript
```
- **formatMoney(str [, type] [, opt]) - 轉換為錢幣格式**
```javascript
```
- **insertBlankBefUpper(str) - 在大寫的字母前面加上空白**
```javascript
```
- **upperStr(str [, opt]) - 將字串轉為大寫**
```javascript
```
- **upperFirst(str) - 將第一個字母轉為大寫**
```javascript
```
- **lowerStr(str [, opt]) - 將字串轉為小寫**
```javascript
```
- **trimStr(str [, force]) - 移除字串前後空白**
```javascript
```
- **splitStr(str [, splitter] [, force]) - 移除字串前後空白**
```javascript
```
- **serializeUrl(str [, oArgs] [, coverEmpty=false]) - 將變數物件代入 URL**
```javascript
```

### ★Console

- 由[color](https://www.npmjs.com/package/colors)延伸
- **log(msg, variable) - 輸出有顏色的 console 訊息**
```javascript
```
- **log2(msg, variable) - 輸出有顏色的 console 訊息**
```javascript
```
- **log3(msg, variable) - 輸出有顏色的 console 訊息**
```javascript
```

### ★DateTime
- 由[moment](https://www.npmjs.com/package/moment)延伸
- **setDefaultLocale(locale) - 預設國家語系(en)**
```javascript
```
- **addDateTimeFormatType(shorthandFormat, formatType [, locale]) - 自定時間格式**
```javascript
```
- **formatDateTime(dateTime, shorthandFormat | formatType [, locale]) - 時間格式化**
```javascript
```
- **formatNow(formatType [, locale]) - 取得現在的時間並格式化**
```javascript
```
- **addDateTime(dateTime, amount, unit [, formatType]) - 增加時間**
```javascript
```
- **subtractDateTime(dateTime, amount, unit [, formatType]) - 減少時間**
```javascript
```
- **startOfDateTime(dateTime, unit [, formatType]) - 取得指定時間單位的開始**
```javascript
```
- **endOfDateTime(dateTime, unit [, formatType]) - 取得指定時間單位的結束**
```javascript
```
- **getUtc(dateTime [, formatType]) - 取得指定時間單位的 UTC 時間**
```javascript
```
- **isBeforeDateTime(dateTime, targetDateTime [ , unit]) - 比對「指定的時間」是否在「目標時間」之前**
```javascript
```
- **isAfterDateTime(dateTime, targetDateTime [ , unit]) - 比對「指定的時間」是否在「目標時間」之後**
```javascript
```
- **isSameDateTime(dateTime, targetDateTime [ , unit]) - 比對「指定的時間」和「目標時間」是否相同**
```javascript
```
- **isBetweenDateTime(dateTime, dateTime1, dateTime2 [ , unit]) - 比對「指定的時間」是否在「目標時間1」和「目標時間2」之間**
```javascript
```
- **isValidDateTime(dateTime) - 檢查日期格式是否正確**
```javascript
```
- **getDateTimeDiff(dateTime1, dateTime2 [, unit] [, withFloat]) - 取得日期間的差**
```javascript
```

### ★FileSystem
- **readFileCaro(path [, encoding] [, flag]) - 讀取檔案內容**
```javascript
```
- **writeFileCaro(path, data [, encoding] [, flag]) - 寫入檔案內容**
```javascript
```
- **deleteFile(path,  [, path2, path3...]) - 刪除檔案**
```javascript
```
- **isEmptyDir(path,  [, path2, path3...]) - 判斷是否為空資料夾**
```javascript
```
- **readDirCb(path,  [, opt] [, cb]) - 取得資料夾內容**
```javascript
```
- **createDir(path) - 新增資料夾**
```javascript
```
- **deleteDir(path [,force]) - 刪除資料夾**
```javascript
```
- **fsExists(path [, path2, path3...]) - 判斷檔案是否存在**
```javascript
```
- **isFsDir(path [, path2, path3...]) - 判斷是否為資料夾**
```javascript
```
- **isFsFile(path [, path2, path3...]) - 判斷是否為檔案**
```javascript
```
- **isFsSymlink(path [, path2, path3...]) - 判斷是否為 symbolic link**
```javascript
```
- **getFileType(path) - 取得檔案類型**
```javascript
```
- **deleteFs(path [, path2, path3...] [, force]) - 刪除檔案及資料夾**
```javascript
```
- **renameFs(path , newPath  [, force]) - 檔案移動更名**
```javascript
```
- **getFsStat(path , newPath  [, type]) - 取得檔案資訊**
```javascript
```
- **getFsSize(path[, fixed] [, unit]) - 取得檔案大小(bytes)，或指定以「特定單位」回傳(KB/MB...)**
```javascript
```
- **humanFeSize(bytes [, fixed] [, si]) - 將檔案大小轉為易讀格式**
```javascript
```

### ★Log
- **readLog(logPath) - 讀取 .log 檔**
```javascript
```
- **writeLog(logPath, data) - 寫入 .log 檔，如檔案已存在則覆寫**
```javascript
```
- **updateLog(logPath, data [,opt]) - 加入資料至 .log 檔**
```javascript
```
- **updateLogWithDayFileName(logPath, data [,opt]) - 產生/更新有今天日期名稱的 .log 檔**
```javascript
```
- **traceLog( data [,opt]) - 產生/更新 trace.log 檔**
```javascript
```

### ★Path (For Node.js only)
- **setAbsolutePath(path) - 定義絕對路徑根目錄**
```javascript
```
- **getAbsolutePath(path) - 取得絕對路徑根目錄**
```javascript
```
- **isFullPath(path) - 確認是否為絕對路徑**
```javascript
```
- **getDirPath(path) - 取得所在的資料夾路徑**
```javascript
```
- **getFileName(path [, getFull]) - 取得檔案名稱**
```javascript
```
- **getExtendName(path [, withDot]) - 取得附檔名**
```javascript
```
- **normalizePath(path [, path2, path3...]) - 正規化路徑**
```javascript
```
- **coverToFullPath(path [, path2, path3...]) - 轉為絕對路徑**
```javascript
```

### ☆TypeCheck
- **isBool(arg...) - 判斷是否為 boolean，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = false;
    var arg2 = 'false';
    var r = caro.isBool(arg);
    var r2 = caro.isBool(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **isStr(arg...) - 判斷是否為 string，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = 'false';
    var arg2 = true;
    var r = caro.isStr(arg);
    var r2 = caro.isStr(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **isFn(arg...) - 判斷是否為 function，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = function () {
    };
    var arg2 = 1.3;
    var r = caro.isFn(arg);
    var r2 = caro.isFn(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **isNum(arg...) - 判斷是否為 number，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = 1;
    var arg2 = '1';
    var r = caro.isNum(arg);
    var r2 = caro.isNum(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **isInt(arg...) - 判斷是否為 integer，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = 1;
    var arg2 = 1.3;
    var r = caro.isInt(arg);
    var r2 = caro.isInt(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **isArr(arg...) - 判斷是否為 array，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = [];
    var arg2 = {};
    var r = caro.isArr(arg);
    var r2 = caro.isArr(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **isNull(arg...) - 判斷是否為 null，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = null;
    var arg2 = {};
    var r = caro.isNull(arg);
    var r2 = caro.isNull(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **isObj(arg...) - 判斷是否為 object，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = {};
    var arg2 = null;
    var r = caro.isObj(arg);
    var r2 = caro.isObj(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **isRegExp(arg...) - 判斷是否為 RegExp，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = /^foo(bar)?$/i;
    var arg2 = '/[a-z]/g';
    var r = caro.isRegExp(arg);
    var r2 = caro.isRegExp(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```
- **☆isBuf(arg...) - 判斷是否為 Buffer，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = new Buffer(1);
    var arg2 = '';
    var r = caro.isObj(arg);
    var r2 = caro.isObj(arg, arg2);
    console.log(r); // true
    console.log(r2); // false
```