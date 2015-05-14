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
var caro = require('caro');
caro.isArr(['caro']); // true
```
## Index

##### (★ 只適用於 Node.js | ☆ 部份適用於 Node.js)

**[Array](#array)** | **★[Console](#console)** | **[DateTime](#datetime)** | **★[FileSystem](#filesystem)**
| **[Helper](#helper)** | **★[Log](#log)** | **[Object](#object)** | **[Path](#path)** | **[String](#string)**
| **☆[TypeCheck](#typecheck)**

### Array
- **XcloneArr(arr) - 複製陣列(已棄用，合併至 cloneObj)**
```javascript
    var arr = [1, 2, 3];
    var r = caro.cloneArr(arr);
    var r2 = caro.cloneArr('123');
    arr[0] = 4;
    console.log(arr); // [ 4, 2, 3 ]
    console.log(r); // [ 1, 2, 3 ] 不會跟著 arr 改變
    console.log(r2); // [ 4, 2, 3 ]
```
- **XextendArr(duplicate [arr...]) - 合併陣列(已棄用，合併至 extendObj)**
```javascript
    var arr = [1, 2, 3];
    var arr2 = [2, 3, 4];
    var arr3 = [3, 4, 5];
    var r = caro.extendArr(true, arr, arr2); // [ 1, 2, 3, 2, 3, 4 ]
    var r2 = caro.extendArr(false, arr, arr2, arr3); // [ 1, 2, 3, 4, 5 ]
```
- **sortByObjKey(arr, key [sort]) - 如果陣列中的值是物件，則可指定物件的 key 值排序**
```javascript
    var obj = {index: 0, name: 'caro'};
    var obj2 = {index: 1, name: 'huang'};
    var obj3 = {index: 2, name: 'zozo'};
    var arr = [obj, obj3, obj2];
    var r = caro.sortByObjKey(arr, 'index'); // [ { index: 0, name: 'caro' }, { index: 1, name: 'huang' }, { index: 2, name: 'zozo' } ]
    var r2 = caro.sortByObjKey(arr, 'index', false); // [ { index: 2, name: 'zozo' }, { index: 1, name: 'huang' },  { index: 0, name: 'caro' } ]
```
- **sumOfArr(arr [force]) - 加總陣列中的數字**
```javascript
    var arr = [1, 2, '5', null, {}];
    var r = caro.sumOfArr(arr); // 3
    var r2 = caro.sumOfArr(arr, true); // 11
```
- **removeByIndex(arr, index...) - 依 index 移除陣列中的元素**
```javascript
    var arr = [1, 2, 3, 4];
    var arr2 = [1, 2, 3, 4, 5];
    var r = caro.removeByIndex(arr, 0, 2); // [ 2, 4 ]
    var r2 = caro.removeByIndex(arr2, 0); // [ 2, 3, 4, 5 ]
```
- **removeByArrVal(arr, val...) - 依 value 移除陣列中的元素**
```javascript
    var arr = [1, undefined, 3, undefined, null, 4];
    var r = caro.removeByArrVal(arr, undefined, null); // [ 1, 3, 4 ]
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
   var arr = [1, 2, 3];
   var arr2 = [1, 2, ''];
   var r = caro.hasEmptyInArr(arr); // false
   var r2 = caro.hasEmptyInArr(arr2); // true
```

### ★Console
(由 [color](https://www.npmjs.com/package/colors) 延伸)  
- **log(msg, variable) - 輸出有顏色的 console 訊息**
```javascript
    caro.log('1', undefined);
    caro.log();
    caro.log('2', {});
    caro.log(function(){
    });
```
- **log2(msg, variable) - 輸出有顏色的 console 訊息**
```javascript
    caro.log2(undefined);
    caro.log2('1', undefined);
    caro.log2('2', {});
```
- **log3(msg, variable) - 輸出有顏色的 console 訊息**
```javascript
    caro.log3(undefined, 'test');
    caro.log3('1', undefined);
    caro.log3('2', null);
```

### DateTime
(由 [moment](https://www.npmjs.com/package/moment) 延伸，可透過 caro.nMoment 使用 moment)
- **getDefaultLocale(locale) - 取得目前預設的語系(en)**
```javascript
    caro.getDefaultLocale(); // 'en'
```
- **setDefaultLocale(locale) - 設定預設的國家語系**
```javascript
    caro.setDefaultLocale('zh-tw');
```
- **addDateTimeFormatType(shorthandFormat, formatType [locale]) - 自定時間格式**
```javascript
    caro.addDateTimeShortFormat('date', 'YYYY MM DD');
    caro.addDateTimeShortFormat('date2', 'YYYY/MM/DD');
```
- **formatDateTime(dateTime, shorthandFormat | formatType [locale]) - 時間格式化**
```javascript
    caro.setDefaultLocale('zh-tw');
    caro.addDateTimeShortFormat('date', 'LLLL');
    caro.addDateTimeShortFormat('date2', 'L');
    var r = caro.formatDateTime('2015-06-30', 'date'); // 2015年6月30日星期二早上12點00
    var r2 = caro.formatDateTime('2015-06-30', 'date2'); // 2015年6月30日
```
- **formatNow(formatType [locale]) - 取得現在的時間並格式化**
```javascript
    var r = caro.formatNow('date');
```
- **addDateTime(dateTime, amount, unit [formatType]) - 增加時間**
```javascript
    var t = '2015-06-30 12:34:56';
    var r = caro.addDateTime(t, 3, 'h'); // '2015-06-30T15:34:56+08:00'
    var r2 = caro.addDateTime(t, 3, 'd', 'YYYY/MM/DD'); // '2015/07/03'
```
- **subtractDateTime(dateTime, amount, unit [formatType]) - 減少時間**
```javascript
    var t = '2015-06-30 12:34:56';
    var r = caro.addDateTime(t, 3, 'h'); // '2015-01-01 9:34'
    var r2 = caro.addDateTime(t, 3, 'd', 'YYYY/MM/DD'); // '2014/12/29'
```
- **startOfDateTime(dateTime, unit [formatType]) - 取得指定時間單位的開始**
```javascript
    var t = '2015-08-21 12:34:56';
    var r = caro.startOfDateTime(t, 'Y'); // '2015-01-01T00:00:00+08:00'
    var r2 = caro.startOfDateTime(t, 'd','dddd hh:mm:ss'); // 'Friday 12:00:00'
```
- **endOfDateTime(dateTime, unit [formatType]) - 取得指定時間單位的結束**
```javascript
    caro.setDefaultLocale('en');
    var t = '2015-08-21 12:34:56';
    var r = caro.endOfDateTime(t, 'Y'); // '2015-12-31T23:59:59+08:00'
    var r2 = caro.endOfDateTime(t, 'd','dddd hh:mm:ss'); // 'Friday 11:59:59'
```
- **getUtc(dateTime [formatType]) - 取得指定時間單位的 UTC 時間**
```javascript
    var t = '2015-02-21'
    var r = caro.getUtc(t); // '2015-02-20T16:00:00+00:00'
```
- **isBeforeDateTime(dateTime, targetDateTime [unit]) - 比對「指定的時間」是否在「目標時間」之前**
```javascript
    var t = '2015-01-01';
    var t2 = '2020-01-01';
    var t3 = '2010-01-01';
    var r = caro.isBeforeDateTime(t, t2); // true
    var r2 = caro.isBeforeDateTime(t, t3); // false
```
- **isAfterDateTime(dateTime, targetDateTime [unit]) - 比對「指定的時間」是否在「目標時間」之後**
```javascript
    var t = '2015-01-01 12:00:00';
    var t2 = '2015-01-01 13:00:00';
    var t3 = '2010-01-01';
    var r = caro.isAfterDateTime(t, t2); // false
    var r2 = caro.isAfterDateTime(t, t3); // true
```
- **isSameDateTime(dateTime, targetDateTime [unit]) - 比對「指定的時間」和「目標時間」是否相同**
```javascript
    var t = '2015-01-01';
    var t2 = '2015-01-21';
    var t3 = '2013-01-21';
    var r = caro.isSameDateTime(t, t2, 'year'); // true
    var r2 = caro.isSameDateTime(t2, t3, 'month'); // false (因為 year 不同)
```
- **isBetweenDateTime(dateTime, dateTime1, dateTime2 [unit]) - 比對「指定的時間」是否在「目標時間1」和「目標時間2」之間**
```javascript
    var t = '2015-01-01';
    var t2 = '2013-01-21';
    var t3 = '2015-01-21';
    var r = caro.isBetweenDateTime(t, t2, t3); // true
    var r2 = caro.isBetweenDateTime(t, t3, t2); // false (因為 t 沒有比 t3 大) 
```
- **isValidDateTime(dateTime) - 檢查日期格式是否正確**
```javascript
    var t = '2015-01-01';
    var t2 = '2013-01-32';
    var r = caro.isValidDateTime(t); // true
    var r2 = caro.isValidDateTime(t2); // false
```
- **getDateTimeDiff(dateTime1, dateTime2 [unit] [withFloat]) - 取得日期間的差**
```javascript
    var t = '2015-01-01';
    var t2 = '2013-01-31';
    var r = caro.getDateTimeDiff(t, t2); // 60480000000 
    var r2 = caro.getDateTimeDiff(t, t2, 'month'); // 23
```

### ★FileSystem
- **readFileCaro(path [encoding='utf8'] [flag=null]) - 讀取檔案內容**
```javascript
    // https://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options
    r = caro.readFileCaro('./test.html');
```
- **writeFileCaro(path, data [encoding='utf8'] [flag=null]) - 寫入檔案內容**
```javascript
    // https://nodejs.org/api/fs.html#fs_fs_writefilesync_filename_data_options
    var data = caro.readFileCaro('./test.html');
    var r = caro.writeFileCaro('./test.html', data); // 寫入成功回傳 true, 否則回傳 false
```
- **deleteFile(path...) - 刪除檔案**
```javascript
    // https://nodejs.org/api/fs.html#fs_fs_unlinksync_path
    var r = caro.deleteFile('1.js', '2.js'); // 只要其中一個刪除失敗，回傳 false 
```
- **isEmptyDir(path...) - 判斷是否為空資料夾**
```javascript
    var r = caro.isEmptyDir('/1', '/2'); / 只要其中一個不是資料夾或不是空的，回傳 false
```
- **readDirCb(path, cb [opt]) - 取得資料夾內容**
```javascript
    caro.readDirCb('../src', function(oFileInfo) {
        console.log(oFileInfo); // 檔案訊息(Object) 
        console.log(oFileInfo.filename);
        // filename 檔名
        // extendName 副檔名
        // basename 全檔名
        // filePath 檔案相對路徑
        // dirPath 資料夾相對路徑
        // fullPAth 檔案絕對路徑
        // fullDirPath 資料夾絕對路徑
        // fileType 檔案類型
        // level 檔案在資料夾底下的第 level 層
        // index 檔案在所屬的資料夾的第 index 個
     }, {
        maxLevel: 1, // 要讀取該資料夾底下的層級，設0則讀取全部
        getDir: true, // 是否讀取資料夾
        getFile: true, // 是否讀取檔案
        getByExtend: false // 指定要讀取的檔案類型， e.g. 'js,html' => 只讀取 .js/.html 檔
    });
```
- **createDir(path) - 新增資料夾**
```javascript
    // 假設 src 底下沒有 lib 資料夾
    var r = caro.createDir('./src/lib/coffee'); // 會產生 src/lib 和 src/lib/coffee 資料夾，失敗則回傳 false
```
- **deleteDir(path [force=false]) - 刪除資料夾**
```javascript
    var r = caro.createDir('./src'); // 如果 /src 底下有檔案，則不刪除
    var r2 = caro.createDir('./test',true); // 強制刪除 /test 和底下所有的檔案，失敗則回傳 false
```
- **fsExists(path...) - 判斷檔案/資料夾是否存在**
```javascript
    var r = caro.fsExists('./a','./caro.js'); // 其中一個不存在則回傳 false
```
- **isFsDir(path...) - 判斷是否為資料夾**
```javascript
    var r = caro.isFsDir('./a','./caro.js'); // 其中一個不是資料夾或不存在則回傳 false
```
- **isFsFile(path...) - 判斷是否為檔案**
```javascript
    var r = caro.isFsDir('./a','./caro.js'); // 其中一個不是檔案或不存在則回傳 false
```
- **isFsSymlink(path...) - 判斷是否為 symbolic link**
```javascript
    var r = caro.isFsSymlink('./a','./caro.js'); // 其中一個不是symbolic link 或不存在則回傳 false
```
- **getFileType(path) - 取得檔案類型**
```javascript
    var r = caro.getFileType('./caro.js'); // dir/file/link，不知道類型則為 ''
```
- **deleteFs(path... [force=false]) - 刪除檔案及資料夾**
```javascript
    var r = caro.getFileType('./1.js','./2.lnk');
    var r = caro.getFileType('./test','./1.js','./2.lnk', true); // 強制刪除 /test 和底下所有的檔案，失敗則回傳 false
```
- **renameFs(path , newPath  [force=false]) - 檔案移動更名**
```javascript
    r = caro.renameFs('./a', './b/c', true); // a 移到 /b 底下並更名為 c
    r2 = caro.renameFs(['1.js', '2.js'], ['3.js', '4.js']); // 1.js 更名為 2.js，3.js 更名為 4.js
```
- **getFsStat(path , newPath  [type='l']) - 取得檔案資訊**
```javascript
    // https://nodejs.org/api/fs.html#fs_class_fs_stats
    var r = caro.getFsStat('./caro.js');
```
- **getFsSize(path[fixed] [unit]) - 取得檔案大小(bytes)，或指定以「特定單位」回傳(KB/MB.../KiB/Mib....)**
```javascript
    var r = caro.getFsSize('./caro.js'); // e.g. 439078
    var r2 = caro.getFsSize('./caro.js', 'mb'); // e.g. 439 
    var r3 = caro.getFsSize(123000, 'mb'); // 100
```
- **humanFeSize(bytes [fixed=1] [si=false]) - 將檔案大小轉為易讀格式**
```javascript
    // http://en.wikipedia.org/wiki/File_size
    r = caro.humanFeSize('./caro.js'); // '439.1 KB' (預設計算到小數第1位)
    r2 = caro.humanFeSize('./caro.js', 3); // '439.078 KB'
    r3 = caro.humanFeSize(10000000.456, 2, false); // '9.54 MiB'
```

### Helper
- **isBasicVal(arg...) - 判斷是否為 boolean 或 string 或 number**
```javascript
    var arg = 1, arg2 = '', arg3 = false;
    var arg4 = {};
    var r = caro.isBasicVal(arg, arg2, arg3); // true
    var r2 = caro.isBasicVal(arg4); // false
```
- **isEmptyVal(arg...) - 判斷是否為空值 ( {} | [] | null | '' | undefined )**
```javascript
    var arg = 0, arg2 = false;
    var arg3 = {}, arg4 = [], arg5 = null, arg6 = '';
    var r = caro.isEmptyVal(arg, arg2); // false
    var r2 = caro.isEmptyVal(arg3, arg4, arg5, arg6, undefined); // true
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
- **checkIfPassCb((arr, checkFn, needAllPass) - 回傳 checkFn 的執行結果**
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
- **eachArgs(fn) - 將 function 中的 arguments 的 key 轉為 integer 並代入 callback-fn**
```javascript
    var fn = function (a, b, c) {
        caro.eachArgs(arguments, function (key, val) {
            // key 是 0, 1...
            // val 為代入的值 'd', 'e', ...
        });
    };
    fn('d','e', {});
```
- **getArgumentsAsArr(fn) - 將 arguments 轉為陣列**
```javascript
    var fn = function (a, b) {
        var args = caro.getArgumentsAsArr(arguments); // args = [1, 2]
    };
    fn(1, 2);
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
    var arg = [3, 2, 1];
    var arg2 = null;
    var r = caro.coverToArr(arg); // [ 3, 2, 1 ]
    var r2 = caro.coverToArr(arg2); // [ null ]
```
- **coverToStr(arg [force=true]) - 將變數轉為 string**
```javascript
    var arg = function () {};
    var arg2 = {a: 2}, arg3 = null, arg4 = ['caro',1];
    var r = caro.coverToStr(arg); // 'function () {}'
    var r2 = caro.coverToStr(arg2); // '{a: 2}'
    var r3 = caro.coverToStr(arg3); // 'null'
    var r4 = caro.coverToStr(arg3); // 'caro,1' ( 相當於 ['caro', 1].join(',') )
```
- **coverToInt(arg [force=true]) - 將變數轉為 integer**
```javascript
    var arg = '123.6', arg2 = 'a', arg3 = null;
    var r = caro.coverToInt(arg); // 123
    var r2 = caro.coverToInt(arg2, false); // 'a'
    var r3 = caro.coverToInt(arg3); // 0
```
- **coverToFloat(arg [force=true]) - 將變數轉為 float**
```javascript
    var arg = '123.6', arg2 = 'a', arg3 = null;
    var r = caro.coverToInt(arg); // 123.6
    var r2 = caro.coverToInt(arg2, false); // 'a'
    var r3 = caro.coverToInt(arg3); // 0
```
- **coverToNum(arg [force=true]) - 將變數轉為 number**
```javascript
    var arg = '123.45', arg2 = {};
    var r = caro.coverToNum(arg); // 123.45
    var r2 = caro.coverToNum(arg2, false); // {}
    var r3 = caro.coverToNum(undefined); // 0
```
- **coverToObj(arg [force=true]) - 將變數轉為 object**
```javascript
    var arg = {}, arg2 = 123, arg3 = '{"a":1}';
    var r = caro.coverToObj(arg); // {}
    var r2 = caro.coverToObj(arg2, false); // 123
    var r3 = caro.coverToObj(arg3); // {a:1}
    var r4 = caro.coverToObj(undefined); // {}
```
- **coverToJson(arg [opt]) - 將變數轉為 JSON**
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
    
    var r = caro.coverToJson(3.4); // '3.4'
    var r2 = caro.coverToJson(null); // 'null'
    var r3 = caro.coverToJson('caro', false); // '"caro"'    
```

### ★Log
- **setLogRoot(path) - 設置 log 檔所要放的路徑**
```javascript
    var r = caro.setLogRoot('log'); // 路徑產生成功則回傳 true
```
- **getLogRoot() - 取得 log 檔所在的路徑**
```javascript
    var r = caro.getLogRoot(); // 資料夾路徑
```
- **setLogExtendName() - 設定 log 的副檔名(預設為 .log)**
```javascript
    var r = caro.setLogExtendName('logger'); // true
    var r2 = caro.setLogExtendName(''); // false
```
- **getLogExtendName() - 取得 log 的副檔名(預設為 .log)**
```javascript
    var r = caro.getLogExtendName(); // '.log'
```
- **readLog(logPath) - 讀取 .log 檔**
```javascript
    var r = caro.setLogRoot('log'); // 路徑產生成功則回傳 true
```
- **writeLog(logPath, data) - 寫入 .log 檔，如檔案已存在則覆寫**
```javascript
    var r = caro.writeLog('test', {
      name: 'Caro'
      like: 'Snoopy'
    }); // 檔案產生成功則回傳 true
```
- **updateLog(logPath, data [opt]) - 加入資料至 .log 檔，如檔案不存在則先產生檔案**
```javascript
    var r = caro.writeLog('test', 'This is first log'); // true
    var r2 = caro.writeLog('test', 'This is second log', {
        ifWrap: true // 是否換行
        prepend: false // 是否加到舊資料之前
    }); // 檔案產生成功則回傳 true    
```
- **updateLogWithDayFileName(logPath, data [opt]) - 產生/更新有今天日期名稱的 .log 檔**
```javascript
    var r = caro.updateLogWithDayFileName('test', 'This is log with day', {
        dateFirst: true // log 檔名中的日期是否顯示在前面
        ifWrap: true // 是否換行
        prepend: false // 是否加到舊資料之前
    }); // 檔案產生成功則回傳 true， e.g. 檔名為 20151221_test.log
    var r2 = caro.updateLogWithDayFileName('test', 'This is log with day', {
        dateFirst: false
    }); // 檔案產生成功則回傳 true， e.g. 檔名為 test_20151221.log
```
- **traceLog( data [opt]) - 產生/更新 trace.log 檔**
```javascript
    var r = caro.traceLog('This is log trace data', {
        ifWrap: true // 是否換行
        prepend: false // 是否加到舊資料之前
    }); // 檔案產生成功則回傳 true
```

### Object
- **eachObj(obj, cb) - 遍歷 arr/obj 中的 key 和 val， 並回傳至 cb 中(用法同 jQuery.each)**
```javascript
    var arg = ['a', 'b', c'];
    r = caro.eachObj(arg, (i, val)->
      console.log 'i,', i
      console.log 'val=', val
    );
```
- **getObjLength(obj) - 取得 obj 長度(element 數量)**
```javascript
    var arg = ['a' ,'b', ''c];
    var r = caro.getObjLength(arg); // 3    
```
- **cloneObj(obj) - 複製 obj**
```javascript
    arg = ['a', 'b', 'c'];
    arg2 = {'a': 1, 'b': 2};
    r = arg;
    r2 = arg2;
    r3 = caro.cloneObj(arg);
    r4 = caro.cloneObj(arg2);
    arg[0] = 'g';
    arg2.a = 3;
    console.log(r); // [ 'g', 'b', 'c' ]
    console.log(r2); // { a: 3, b: 2 }
    console.log(r3); // [ 'a', 'b', 'c' ] - r3 裡面的值不會跟著 arg 而改變
    console.log(r4); // { a: 1, b: 2 } - r4 裡面的值不會跟著 arg2 而改變
```
- **extendObj(obj1, obj2 [deep=false]) - 將 obj2 合併至 obj1**
```javascript
    var arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}};
    var arg2 = ['a', 'b', 'c'];
    var r = caro.extendObj(arg, arg2);
    var r2 = caro.extendObj(arg, arg2, true);
    var r3 = caro.extendObj(arg2, arg);
    arg.cc.c1 = 5;
    console.log(r); // { '0': 'a', '1': 'b', '2': 'c', aa: 1, bb: 2, cc: { c1: 5 } }
    console.log(r2); // { '0': 'a', '1': 'b', '2': 'c', aa: 1, bb: 2, cc: { c1: 3 } }
    console.log(r3); // [ 'a', 'b', 'c', 1, 2, { c1: 5 } ]
```    
- **replaceObjKey(obj, replaceFn [clone=false]) - 轉換 obj 中的 key**
```javascript
    var arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}};
    caro.replaceObjKey(arg, function (key){
      return 'dd' if key == 'cc'
    });
    var r = caro.replaceObjKey(arg, function (key){
      return 'ee' if key == 'bb'
    , true);
    console.log(arg); // { aa: 1, bb: 2, dd: { c1: 3 } }
    console.log(r); // { aa: 1, dd: { c1: 3 }, ee: 2 }
```
- **replaceObjVal(obj, replaceFn [opt]) - 轉換 obj 中的 val**
```javascript
    var arg = {'aa': 1, 'bb': 2, 'cc': {'c1': 3}};
    caro.replaceObjVal(arg, function (val) {
      return 4 if val == 1
    });
    var r = caro.replaceObjVal(arg, function (val){
      return '5' if val == 2
    }, {
      deep: true
      clone: true
    });
    console.log(arg); // { aa: 4, bb: 2, cc: { c1: 3 } }
    console.log(r); // { aa: 4, bb: '5', cc: { c1: 3 } }
```
- **upperCaseByObjKey(obj, aKey [clone=false]) - 指定 key 將對應的 val 轉為大寫**
```javascript
    var arg = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': 1};
    var arg2 = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': 1};
    caro.upperCaseByObjKey(arg, 'aa,bb'); // 轉換 arg.aa 和 arg.bb
    var r = caro.upperCaseByObjKey(arg2, null, true); // 指定所有的 key 轉為大寫
    console.log(arg); // { aa: 'CARO', bb: 'PIKA', cc: 'doraemon', dd: 1 }
    console.log(arg2); // { aa: 'caro', bb: 'pika', cc: 'doraemon', dd: 1 }
    console.log(r); // { aa: 'CARO', bb: 'PIKA', cc: 'DORAEMON', dd: 1 }
```
- **lowerCaseByObjKey(obj, aKey [clone=false]) - 指定 key 將對應的 val 轉為小寫**
```javascript
    var arg = {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon', 'dd': 1};
    var arg2 = {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon', 'dd': 1};
    caro.lowerCaseByObjKey(arg, ['aa','bb']); // 轉換 arg.aa 和 arg.bb
    var r = caro.lowerCaseByObjKey(arg2, null, true); // 指定所有的 key 轉為小寫
    console.log(arg); // {'aa': 'caro', 'bb': 'pika', 'cc': 'Doraemon', 'dd': 1};
    console.log(arg2); // {'aa': 'Caro', 'bb': 'Pika', 'cc': 'Doraemon', 'dd': 1};
    console.log(r); // {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': 1};
```
- **upperFirstByObjKey(obj, aKey [clone=false]) - 指定 key 將對應的 val 的第一個字母轉為大寫**
```javascript
    var arg = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': ['dd_1']};
    var arg2 = {'aa': 'caro', 'bb': 'pika', 'cc': 'doraemon', 'dd': ['dd_1']};
    caro.upperFirstByObjKey(arg, 'aa,bb'); // 轉換 arg.aa 和 arg.bb
    var r = caro.upperFirstByObjKey(arg2, null, true); // 指定所有的 key 轉為第一個字母大寫
    console.log(arg); // { aa: 'Caro', bb: 'Pika', cc: 'doraemon', dd: ['dd_1']};
    console.log(arg2); // { aa: 'caro', bb: 'pika', cc: 'doraemon', dd: ['dd_1']};
    console.log(r); // { aa: 'Caro', bb: 'Pika', cc: 'Doraemon', dd: ['dd_1']};
```
- **trimObjVal(obj [opt]) - obj 中 val 為 str 的值，去除頭尾空白**
```javascript
    var arg = {'aa': ' caro ', 'bb': ' pika ', 'cc': ' doraemon ', 'dd': [' dd_1 ']};
    var arg2 = {'aa': ' caro ', 'bb': ' pika ', 'cc': ' doraemon ', 'dd': [' dd_1 ']};
    caro.trimObjVal(arg);
    var r = caro.trimObjVal(arg2, {
      deep: false
      clone: true
    });
    console.log(arg); // { aa: 'caro', bb: 'pika', cc: 'doraemon', dd: [ 'dd_1' ] }
    console.log(arg2); // { aa: ' caro ', bb: ' pika ', cc: ' doraemon ', dd: [ ' dd_1 ' ] }
    console.log(r); // { aa: 'caro', bb: 'pika', cc: 'doraemon', dd: [ ' dd_1 ' ] }
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
    var r2 = caro.getKeysInObj(arg, 2); // [ 'a', 'b', 'c', 'd', 'e' ] // 取到第二層的 key
    var r3 = caro.getKeysInObj(arg, 0); // [ 'a', 'b', 'c', 'd', 'e', 'f' ] - 取得所有層級的 key
```
- **coverFnToStrInObj(obj [opt]) - 如果 obj 中的 val 是 fn，則轉為字串(for 文字輸出用)**
```javascript
    var arg = {
      a: 1, b: 2, c: (a) ->
        return a
    };
    var arg2 = {
      a: 1, b: 2, c: (a) ->
        return a
    };
    r = caro.coverFnToStrInObj(arg); // { a: 1, b: 2, c: 'function (a) {return a;}' }
    r2 = caro.coverFnToStrInObj(arg2, false); // { a: 1, b: 2, c: 'function (a) {\n return a;\n }' }
```

### String
- **random(len [opt]) - 產生隨機字串**
```javascript
    var r = caro.random(15); // e.g. '6EJDRlBy6Z25s2O'
    var r2 = caro.random(15, {
      lower: true
      upper: false
      num: false
      exclude: 'a,b,c,d,e,f,g,1,2,3,4'
    }); // e.g. 'vhjryhtqwlivmso'
```
- **strToBool(str) - 如果字串為 'true' 或不是空字串，回傳 true；如果是 'false' 或空字串，回傳 false**
```javascript
    var r = caro.strToBool('false'); // false
    var r2 = caro.strToBool('True'); // true
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
- **hasHead(str, str2) - 確認字串的結尾是否符合特定字串**
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
    }); // 'i am caro' - here is defaut options
    var r3 = caro.lowerStr('I AM CARO', {
      start: 5,
      end: null
    }); // 'I AM caro'
    var r4 = caro.lowerStr('I AM CARO', {
      start: 5,
      end: 6
    }); 'I AM cARO'
```
- **trimStr(str [force=true]) - 移除字串前後空白**
```javascript
    var r = caro.trimStr(' i am caro '); // 'i am caro'
    var r2 = caro.trimStr({}, false); // {}
```
- **splitStr(str [splitter] [force]) - 移除字串前後空白**
```javascript
    var r = caro.splitStr('i am caro', ' '); // ['i', 'am', 'caro']
    var r2 = caro.splitStr('I ~love Snoopy !~!', ['~', ' ']); // ['I', '', 'love', 'Snoopy', '!', '!']
    var r3 = caro.splitStr(null, ',',  false); // null
```
- **serializeUrl(str [oArgs] [coverEmpty=false]) - 將變數物件代入 URL**
```javascript
    var arg = 'http://localhost';
    var obj = {a: 1, b: 2, c: null};
    var r = caro.serializeUrl(arg, obj); // 'http://localhost?a=1&b=2'
    var r2 = caro.serializeUrl(arg, obj, true); // 'http://localhost?a=1&b=2&c='
```

### ★Path
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
- **getFileName(path [getFull]) - 取得檔案名稱**
```javascript
```
- **getExtendName(path [withDot]) - 取得附檔名**
```javascript
```
- **normalizePath(path [path2, path3...]) - 正規化路徑**
```javascript
```
- **coverToFullPath(path [path2, path3...]) - 轉為絕對路徑**
```javascript
```

### ☆TypeCheck
- **isBool(arg...) - 判斷是否為 boolean，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = false;
    var arg2 = 'false';
    var r = caro.isBool(arg); // true
    var r2 = caro.isBool(arg, arg2); // false
```
- **isStr(arg...) - 判斷是否為 string，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = 'false';
    var arg2 = true;
    var r = caro.isStr(arg); // true
    var r2 = caro.isStr(arg, arg2); // false
```
- **isFn(arg...) - 判斷是否為 function，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = function () {};
    var arg2 = 1.3;
    var r = caro.isFn(arg); // true
    var r2 = caro.isFn(arg, arg2); // false
```
- **isNum(arg...) - 判斷是否為 number，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = 1;
    var arg2 = '1';
    var r = caro.isNum(arg); // true
    var r2 = caro.isNum(arg, arg2); // false
```
- **isInt(arg...) - 判斷是否為 integer，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = 1;
    var arg2 = 1.3;
    var r = caro.isInt(arg); // true
    var r2 = caro.isInt(arg, arg2); // false
```
- **isArr(arg...) - 判斷是否為 array，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = [];
    var arg2 = {};
    var r = caro.isArr(arg); // true
    var r2 = caro.isArr(arg, arg2); // false
```
- **isNull(arg...) - 判斷是否為 null，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = null;
    var arg2 = {};
    var r = caro.isNull(arg); // true
    var r2 = caro.isNull(arg, arg2); // false
```
- **isObj(arg...) - 判斷是否為 object，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = {};
    var arg2 = null;
    var r = caro.isObj(arg); // true
    var r2 = caro.isObj(arg, arg2); // false
```
- **isObjOrArr(arg...) - 判斷是否為 object 或 array，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = {}, arg2 = [] ,arg3 = null;
    var r = caro.isObjOrArr(arg); // true
    var r2 = caro.isObjOrArr(arg, arg2); // false
```
- **isRegExp(arg...) - 判斷是否為 RegExp，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = /^foo(bar)?$/i;
    var arg2 = '/[a-z]/g';
    var r = caro.isRegExp(arg); // true
    var r2 = caro.isRegExp(arg, arg2); // false
```
- **☆isBuf(arg...) - 判斷是否為 Buffer，當其中一個參數不符合時，回傳 false**
```javascript
    var arg = new Buffer(1);
    var arg2 = '';
    var r = caro.isObj(arg); // true
    var r2 = caro.isObj(arg, arg2); // false
```