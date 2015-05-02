# Caro.js
通用函式 by caro

## 安裝及使用

```bash
$ npm install caro
```

```javascript
var validator = require('caro');
caro.isArr(['caro']); // true
```
## 索引

***

**[Array](#array)** | **[Helper](#helper)** | **[Object](#object)** | **[String](#string)**  
**[Console](#console)** | **[DateTime](#dateTime)** | **[FileSystem](#fileSystem)** | **[Log](#log)** | **[Path](#path)**

## For js & Node.js

***

### Array
- **cloneArr(arr) - 複製陣列**
```javascript
    var arr = [1, 2, 3];
    var ret = caro.cloneArr(arr);
    var ret2 = caro.cloneArr('123');
    arr[0] = 4;
    console.log(arr); // [ 4, 2, 3 ]
    console.log(ret); // [ 1, 2, 3 ] 不會跟著 arr 改變
    console.log(ret2); // []
```
- **extendArr(arr... [duplicate]) - 合併陣列**
```javascript
    var arr = [1, 2, 3];
    var arr2 = [2, 3, 4];
    var arr3 = [3, 4, 5];
    var ret = caro.extendArr(arr, arr2);
    var ret2 = caro.extendArr(arr, arr2, arr3, false);
    console.log(ret); // [ 1, 2, 3, 2, 3, 4 ]
    console.log(ret2); // [ 1, 2, 3, 4, 5 ]
```
- **sortByObjKey(arr, key [sort]) - 如果陣列中的值是物件，則可指定物件的 key 值排序**
```javascript
    var obj = {index: 0, name: 'caro'};
    var obj2 = {index: 1, name: 'huang'};
    var obj3 = {index: 2, name: 'zozo'};
    var arr = [obj, obj3, obj2];
    var ret = caro.sortByObjKey(arr, 'index');
    var ret2 = caro.sortByObjKey(arr, 'index', false);
    // [ { index: 0, name: 'caro' }, { index: 1, name: 'huang' }, { index: 2, name: 'zozo' } ]
    console.log(ret);
    // [ { index: 2, name: 'zozo' }, { index: 1, name: 'huang' },  { index: 0, name: 'caro' } ]
    console.log(ret2);
```
- **sumOfArr(arr [force]) - 加總陣列中的數字**
```javascript
    var arr = [1, 2, '5', null, {}];
    var ret = caro.sumOfArr(arr);
    var ret2 = caro.sumOfArr(arr, true);
    console.log(ret); // 3
    console.log(ret2); // 11
```
- **removeByIndex(arr, index...) - 依 index 移除陣列中的元素**
```javascript
    var arr = [1, 2, 3, 4];
    var arr2 = [1, 2 , 3, 4, 5];
    var ret = caro.removeByIndex(arr, 0, 2);
    var ret2 = caro.removeByIndex(arr2, true, 0);
    console.log(ret); // [ 2, 4 ]
    console.log(ret2); // [ 2, 3, 4, 5 ]
```
- **removeByArrVal(arr, val...) - 依 value 移除陣列中的元素**
```javascript
     var arr = [1, undefined, 3, undefined, null, 4];
     var ret = caro.removeByArrVal(arr, undefined, null);
     console.log(ret); // [ 1, 3, 4 ]
```
- **removeDup(arr) - 移除陣列中重覆的值**
 ```javascript
    var arr = [1, 5, {}, 5, undefined, null, {}, null];
     var ret = caro.removeDup(arr);
     console.log(ret); // [ 1, 5, {}, undefined, null, {} ]
 ```
- **pushNoDup(arr, val...) - 不重覆 push 值至陣列**
 ```javascript
    var arr = [1, 2, 3];
    var ret = caro.pushNoDup(arr, 1, 3, {}, {}, 3);
    console.log(ret); // [ 1, 2, 3, {}, {} ]
 ```
- **pushNoEmpty(arr, val...) - 如果值不為空值，才會 push 至陣列**
 ```javascript
    var arr = [1, 2, 3];
    var ret = caro.pushNoEmpty(arr, 1, 'caro', {}, undefined, null, 0, '', []);
    console.log(ret); // [ 1, 2, 3, 1, 'caro', 0 ]
 ```
- **hasEmptyInArr(arr...) - 判斷陣列中是否有空值**
 ```javascript
    var arr = [1, 2, 3];
    var arr2 = [1, 2, ''];
    var ret = caro.hasEmptyInArr(arr);
    var ret2 = caro.hasEmptyInArr(arr2);
    var ret3 = caro.hasEmptyInArr(arr, 'caro');
    console.log(ret); // false
    console.log(ret2); // true
    console.log(ret3); // true
 ```

### Helper
- **isBool(arg) - 判斷是否為 boolean**
- **isStr(arg) - 判斷是否為 string**
- **isNum(arg) - 判斷是否為 number**
- **isFn(arg) - 判斷是否為 function**
- **isObj(arg) - 判斷是否為 object**
- **isArr(arg) - 判斷是否為 array**
- **isBasicVal(arg) - 判斷是否為 boolean 或 string 或 number**
- **isTrue(arg) - 判斷是否為 true 或 'true' 或 1**
- **isFalse(arg) - 判斷是否為 false 或 'false' 或 0**
- **isEmptyVal(arg) - 判斷是否為空值**
- **executeIfFn(fn [, arg...]) - 如果是 function 的話則執行**
- **getFnName(fn) - 取得 function 名稱**
- **coverToArr(arg) - 將變數轉為 array**
- **coverToStr(arg [, force]) - 將變數轉為 string**
- **coverToInt(arg [, opt]) - 將變數轉為 integer**
- **coverToNum(arg [, opt]) - 將變數轉為 number**
- **coverToObj(arg [, opt]) - 將變數轉為 object**
- **coverToJson(arg [, opt]) - 將變數轉為 JSON**

### Object
- **eachObj(obj, cb) - 遍歷 arr/obj 中的 key 和 val， 並回傳至 cb 中(用法同 jQuery.each)**
- **getObjLength(obj) - 取得 obj 長度(element 數量)**
- **extendObj(obj1, obj2 [, deep]) - 將 obj2 合併至 obj1
- **cloneObj(obj [, deep]) - 複製 obj**
- **copyByObjKey(obj1, keys [, opt]) - 指定 key 複製 obj 中的 element**
- **replaceObjKey(obj, replaceFn [, opt]) - 轉換 obj 中的 key**
- **replaceObjVal(obj, replaceFn [, opt]) - 轉換 obj 中的 val**
- **upperCaseByObjKey(obj, aKey [, opt]) - 指定 key 將對應的 val 轉為大寫**
- **lowerCaseByObjKey(obj, aKey [, opt]) - 指定 key 將對應的 val 轉為小寫**
- **upperFirstByObjKey(obj, aKey [, opt]) - 指定 key 將對應的 val 的第一個字母轉為大寫**
- **trimObjVal(obj [, opt]) - obj 中 val 為 str 的值，去除頭尾空白**
- **keysInObj(obj [, keys]) - 確認 obj 中的 key 是否存在**
- **getKeysInObj(obj [, levelLimit]) - 取得 obj 中的 key**
- **coverFnToStrInObj(obj [, opt]) - 如果 obj 中的 val 是 fn，則轉為字串(for 文字輸出用)**

### String
- **random(len [, opt]) - 產生隨機字串**
- **toBool(str) - 如果字串為 'true' 或不是空字串，回傳 true；如果是 'false' 或空字串，回傳 false**
- **addHead(str, addStr) - 在字串的開頭加上新字串(不重覆)**
- **addTail(str, addStr) - 在字串的尾巴加上新字串(不重覆)**
- **wrapToBr(str, addStr) - 將字串中的換行符號轉為 '\<br /\>'**
- **brToWrap(str, addStr) - 將字串中的 '\<br /\>' 轉為換行符號**
- **splitByWrap(str) - 將字串以換行符號切割為陣列**
- **escapeRegExp(str) - 將字串中的特定符號轉為跳脫字元**
- **replaceAll(str, find, replace) - 取代符合的字串**
- **formatMoney(str [, type] [, opt]) - 轉換為錢幣格式**
- **insertBlankBefUpper(str) - 在大寫的字母前面加上空白**
- **upperStr(str [, opt]) - 將字串轉為大寫**
- **upperFirst(str) - 將第一個字母轉為大寫**
- **lowerStr(str [, opt]) - 將字串轉為小寫**
- **trimStr(str [, force]) - 移除字串前後空白**
- **splitStr(str [, splitter] [, force]) - 移除字串前後空白**
- **serializeUrl(str [, oArgs] [, coverEmpty=false]) - 將變數物件代入 URL**

## For Node.js only

***

### Console
- 由[color](https://www.npmjs.com/package/colors)延伸
- **log(msg, variable) - 輸出有顏色的 console 訊息**
- **log2(msg, variable) - 輸出有顏色的 console 訊息**
- **log3(msg, variable) - 輸出有顏色的 console 訊息**

### DateTime
- 由[moment](https://www.npmjs.com/package/moment)延伸
- **setDefaultLocale(locale) - 預設國家語系(en)**
- **addDateTimeFormatType(shorthandFormat, formatType [, locale]) - 自定時間格式**
- **formatDateTime(dateTime, shorthandFormat | formatType [, locale]) - 時間格式化**
- **formatNow(formatType [, locale]) - 取得現在的時間並格式化**
- **addDateTime(dateTime, amount, unit [, formatType]) - 增加時間**
- **subtractDateTime(dateTime, amount, unit [, formatType]) - 減少時間**
- **startOfDateTime(dateTime, unit [, formatType]) - 取得指定時間單位的開始**
- **endOfDateTime(dateTime, unit [, formatType]) - 取得指定時間單位的結束**
- **getUtc(dateTime [, formatType]) - 取得指定時間單位的 UTC 時間**
- **isBeforeDateTime(dateTime, targetDateTime [ , unit]) - 比對「指定的時間」是否在「目標時間」之前**
- **isAfterDateTime(dateTime, targetDateTime [ , unit]) - 比對「指定的時間」是否在「目標時間」之後**
- **isSameDateTime(dateTime, targetDateTime [ , unit]) - 比對「指定的時間」和「目標時間」是否相同**
- **isBetweenDateTime(dateTime, dateTime1, dateTime2 [ , unit]) - 比對「指定的時間」是否在「目標時間1」和「目標時間2」之間**
- **isValidDateTime(dateTime) - 檢查日期格式是否正確**
- **getDateTimeDiff(dateTime1, dateTime2 [, unit] [, withFloat]) - 取得日期間的差**

### FileSystem
- **readFileCaro(path [, encoding] [, flag]) - 讀取檔案內容**
- **writeFileCaro(path, data [, encoding] [, flag]) - 寫入檔案內容**
- **deleteFile(path,  [, path2, path3...]) - 刪除檔案**
- **isEmptyDir(path,  [, path2, path3...]) - 判斷是否為空資料夾**
- **readDirCb(path,  [, opt] [, cb]) - 取得資料夾內容**
- **createDir(path) - 新增資料夾**
- **deleteDir(path [,force]) - 刪除資料夾**
- **fsExists(path [, path2, path3...]) - 判斷檔案是否存在**
- **isFsDir(path [, path2, path3...]) - 判斷是否為資料夾**
- **isFsFile(path [, path2, path3...]) - 判斷是否為檔案**
- **isFsSymlink(path [, path2, path3...]) - 判斷是否為 symbolic link**
- **getFileType(path) - 取得檔案類型**
- **deleteFs(path [, path2, path3...] [, force]) - 刪除檔案及資料夾**
- **renameFs(path , newPath  [, force]) - 檔案移動更名**
- **getFsStat(path , newPath  [, type]) - 取得檔案資訊**
- **getFsSize(path[, fixed] [, unit]) - 取得檔案大小(bytes)，或指定以「特定單位」回傳(KB/MB...)**
- **humanFeSize(bytes [, fixed] [, si]) - 將檔案大小轉為易讀格式**

### Log
- **readLog(logPath) - 讀取 .log 檔**
- **writeLog(logPath, data) - 寫入 .log 檔，如檔案已存在則覆寫**
- **updateLog(logPath, data [,opt]) - 加入資料至 .log 檔**
- **updateLogWithDayFileName(logPath, data [,opt]) - 產生/更新有今天日期名稱的 .log 檔**
- **traceLog( data [,opt]) - 產生/更新 trace.log 檔**

### Path
- **setAbsolutePath(path) - 定義絕對路徑根目錄**
- **getAbsolutePath(path) - 取得絕對路徑根目錄**
- **isFullPath(path) - 確認是否為絕對路徑**
- **getDirPath(path) - 取得所在的資料夾路徑**
- **getFileName(path [, getFull]) - 取得檔案名稱**
- **getExtendName(path [, withDot]) - 取得附檔名**
- **normalizePath(path [, path2, path3...]) - 正規化路徑**
- **coverToFullPath(path [, path2, path3...]) - 轉為絕對路徑**