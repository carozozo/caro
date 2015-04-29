# Caro.js
通用函式 by caro

## 安裝及使用##

```bash
$ npm install caro
```

```javascript
var validator = require('caro');
caro.isArr(['caro']); // true
```

***

## HELPER 類別- ##
### array ###
- **extendArr(arr1 [, arr2, arr3...] [, opt])** - 合併2個陣列
- **cloneArr(arr)** - 複製陣列
- **sortByObjKey(arr, key [, sort])** - 如果陣列中的值是物件，則可指定物件的 key 值排序
- **sumOfArr(arr)** - 加總陣列中的數字
- **removeByIndex(arr, i)** - 依 index 移除陣列中的元素
- **removeByArrVal(arr, val)** - 依 value 移除陣列中的元素
- **removeDup(arr)** - 移除陣列中重覆的值
- **pushNoDup(arr, val)** - 不重覆 push 值至陣列
- **pushNoEmpty(arr, val)** - 如果值不為空值，才會 push 至陣列
- **hasEmptyInArr(arr)** - 判斷陣列中是否有空值

### helper ###
- **isBool(arg)** - 判斷是否為 boolean
- **isStr(arg)** - 判斷是否為 string
- **isNum(arg)** - 判斷是否為 number
- **isFn(arg)** - 判斷是否為 function
- **isObj(arg)** - 判斷是否為 object
- **isArr(arg)** - 判斷是否為 array
- **isBasicVal(arg)** - 判斷是否為 boolean 或 string 或 number
- **isTrue(arg)** - 判斷是否為 true 或 'true' 或 1
- **isFalse(arg)** - 判斷是否為 false 或 'false' 或 0
- **isEmptyVal(arg)** - 判斷是否為空值
- **executeIfFn(fn [, arg0, arg1...])** - 如果是 function 的話則執行
- **coverToArr(arg)** - 將變數轉為 array
- **coverToStr(arg [, opt])** - 將變數轉為 string
- **coverToInt(arg [, opt])** - 將變數轉為 integer
- **coverToNum(arg [, opt])** - 將變數轉為 number
- **coverToObj(arg [, opt])** - 將變數轉為 object
- **coverToJson(arg [, opt])** - 將變數轉為 JSON

### object ###
- **eachObj(obj, cb)** - 遍歷 arr/obj 中的 key 和 val， 並回傳至 cb 中(用法同 jQuery.each)
- **getObjLength(obj)** - 取得 obj 長度(element 數量)
- **extendObj(obj1, obj2 [, deep])** - 將 obj2 合併至 obj1
- **cloneObj(obj [, deep])** - 複製 obj
- **copyByObjKey(obj1, keys [, opt])** - 指定 key 複製 obj 中的 element
- **replaceObjKey(obj, replaceFn [, opt])** - 轉換 obj 中的 key
- **replaceObjVal(obj, replaceFn [, opt])** - 轉換 obj 中的 val
- **upperCaseByObjKey(obj, aKey [, opt])** - 指定 key 將對應的 val 轉為大寫
- **lowerCaseByObjKey(obj, aKey [, opt])** - 指定 key 將對應的 val 轉為小寫
- **upperFirstByObjKey(obj, aKey [, opt])** - 指定 key 將對應的 val 的第一個字母轉為大寫
- **trimObjVal(obj [, opt])** - obj 中 val 為 str 的值，去除頭尾空白
- **keysInObj(obj [, keys])** - 確認 obj 中的 key 是否存在
- **getKeysInObj(obj [, levelLimit])** - 取得 obj 中的 key
- **coverFnToStrInObj(obj [, opt])** - 如果 obj 中的 val 是 fn，則轉為字串(for 文字輸出用)

### string ###
- 由[validator](https://www.npmjs.com/package/validator)延伸 - 驗證字串
- **random(len [, opt])** - 產生隨機字串
- **toBool(str)** - 如果字串為 'true' 或不是空字串，回傳 true；如果是 'false' 或空字串，回傳 false
- **addHead(str, addStr)** - 在字串的開頭加上新字串(不重覆)
- **addTail(str, addStr)** - 在字串的尾巴加上新字串(不重覆)
- **wrapToBr(str, addStr)** - 將字串中的換行符號轉為 '\<br /\>'
- **brToWrap(str, addStr)** - 將字串中的 '\<br /\>' 轉為換行符號
- **splitByWrap(str)** - 將字串以換行符號切割為陣列
- **escapeRegExp(str)** - 將字串中的特定符號轉為跳脫字元
- **replaceAll(str, find, replace)** - 取代符合的字串
- **formatMoney(str [, type] [, opt])** - 轉換為錢幣格式
- **insertBlankBefUpper(str)** - 在大寫的字母前面加上空白
- **upperStr(str [, opt])** - 將字串轉為大寫
- **upperFirst(str)** - 將第一個字母轉為大寫
- **lowerStr(str [, opt])** - 將字串轉為小寫
- **trimStr(str [, force])** - 移除字串前後空白
- **splitStr(str [, splitter] [, force])** - 移除字串前後空白
- **serializeUrl(str [, oArgs] [, coverEmpty=false])** - 將變數物件代入 URL

***

## LIBRARY 類別- ##
### console ###
- 由[color](https://www.npmjs.com/package/colors)延伸
- **log(msg, variable)** - 輸出有顏色的 console 訊息
- **log2(msg, variable)** - 輸出有顏色的 console 訊息
- **log3(msg, variable)** - 輸出有顏色的 console 訊息

### log ###
- **readLog(logPath)** - 讀取 .log 檔
- **writeLog(logPath, data)** - 寫入 .log 檔，如檔案已存在則覆寫
- **updateLog(logPath, data [,opt])** - 加入資料至 .log 檔
- **updateLogWithDayFileName(logPath, data [,opt])** - 產生/更新有今天日期名稱的 .log 檔
- **traceLog( data [,opt])** - 產生/更新 trace.log 檔

### dateTime ###
- 由[moment](https://www.npmjs.com/package/moment)延伸
- **setDefaultLocale(locale)** - 預設國家語系(en)
- **addDateTimeFormatType(shorthandFormat, formatType [, locale])** - 自定時間格式
- **formatDateTime(dateTime, shorthandFormat | formatType [, locale])** - 時間格式化
- **formatNow(formatType [, locale])** - 取得現在的時間並格式化
- **addDateTime(dateTime, amount, unit [, formatType])** - 增加時間
- **subtractDateTime(dateTime, amount, unit [, formatType])** - 減少時間
- **startOfDateTime(dateTime, unit [, formatType])** - 取得指定時間單位的開始
- **endOfDateTime(dateTime, unit [, formatType])** - 取得指定時間單位的結束
- **getUtc(dateTime [, formatType])** - 取得指定時間單位的 UTC 時間
- **isBeforeDateTime(dateTime, targetDateTime [ , unit])** - 比對「指定的時間」是否在「目標時間」之前
- **isAfterDateTime(dateTime, targetDateTime [ , unit])** - 比對「指定的時間」是否在「目標時間」之後
- **isSameDateTime(dateTime, targetDateTime [ , unit])** - 比對「指定的時間」和「目標時間」是否相同
- **isBetweenDateTime(dateTime, dateTime1, dateTime2 [ , unit])** - 比對「指定的時間」是否在「目標時間1」和「目標時間2」之間
- **isValidDateTime(dateTime)** - 檢查日期格式是否正確
- **getDateTimeDiff(dateTime1, dateTime2 [, unit] [, withFloat])** - 取得日期間的差